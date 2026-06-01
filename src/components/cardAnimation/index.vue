<template>
  <div class="book-page" ref="pageRef">
    <div class="fixed-center">
      <div class="cards-container" ref="containerRef">
        <div
          class="book-card"
          v-for="(item, index) in items"
          :key="index"
          :ref="(el) => setCardRef(el, index)"
        >
          <div
            class="card-inner"
            :ref="(el) => setInnerRef(el, index)"
          >
            <div class="card-front">
              <slot name="front" :item="item" :index="index">
                <div class="card-cover">
                  <img :src="item.cover" :alt="item.title" />
                </div>
                <div class="card-info">
                  <h3 class="card-title">{{ item.title }}</h3>
                  <p class="card-author">{{ item.author }}</p>
                </div>
              </slot>
            </div>
            <div class="card-back">
              <slot name="back" :item="item" :index="index">
                <h3 class="card-title">{{ item.title }}</h3>
                <p class="card-author">{{ item.author }}</p>
                <p class="card-desc">{{ item.desc }}</p>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cover-box" ref="coverRef"></div>
    <div class="scroll-spacer" ref="scrollSpacerRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CardItem {
  title: string
  cover?: string
  author?: string
  desc?: string
  [key: string]: any
}

const props = withDefaults(defineProps<{
  items: CardItem[]
  cardWidth?: number
  cardGap?: number
  scrollHeight?: string
  coverHeight?: number
  coverColor?: string
}>(), {
  cardWidth: 200,
  cardGap: 40,
  scrollHeight: '500vh',
  coverHeight: 550,
  coverColor: '#615b48',
})

const pageRef = ref<HTMLElement | null>(null)
const coverRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const scrollSpacerRef = ref<HTMLElement | null>(null)
const cardRefs = ref<(HTMLElement | null)[]>([])
const innerRefs = ref<(HTMLElement | null)[]>([])

const setCardRef = (el: unknown, index: number) => {
  cardRefs.value[index] = el as HTMLElement | null
}

const setInnerRef = (el: unknown, index: number) => {
  innerRefs.value[index] = el as HTMLElement | null
}

// 动态生成等间距偏移，支持任意数量卡片
const offsets = computed(() => {
  const n = props.items.length
  return Array.from({ length: n }, (_, i) => i - (n - 1) / 2)
})

const cardStep = 200

const stackState = computed(() =>
  offsets.value.map((offset, i) => ({
    x: -offset * cardStep + (i - (props.items.length - 1) / 2) * 50,
    y: (i - (props.items.length - 1) / 2) * -40,
    rotate: -10 + i * (20 / Math.max(props.items.length - 1, 1)),
  }))
)

// 动画阶段阈值
const P1 = 0.35
const P2 = 0.55
const HIDE_AT = 0.38

let P3 = 0.72
let P3A = 0.75
let P4 = 0.93

const smoothstep = (t: number) => t * t * (3 - 2 * t)
const convergeEndDropY = smoothstep(P1 / P2) * 400
const hideEndDropY = smoothstep(HIDE_AT / P2) * 400
const D = 10

let ctx: gsap.Context | null = null

// 跳动动画管理
function createBounceTweens(cards: HTMLElement[]): gsap.core.Tween[] {
  return cards.map((card, i) =>
    gsap.to(card, {
      y: `+=${3 + i}`,
      duration: 0.5 + i * 0.1,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })
  )
}

function killBounceTweens(tweens: gsap.core.Tween[], cards: HTMLElement[]) {
  tweens.forEach(t => t.kill())
  tweens.length = 0
  cards.forEach(c => gsap.set(c, { y: 0 }))
}

const initAnimations = () => {
  const page = pageRef.value
  const trigger = scrollSpacerRef.value
  const cover = coverRef.value
  const container = containerRef.value
  if (!page || !trigger || !container) return

  const cards = cardRefs.value.filter(Boolean) as HTMLElement[]
  const inners = innerRefs.value.filter(Boolean) as HTMLElement[]
  if (cards.length === 0) return

  const stacks = stackState.value

  // 动态计算出现时机
  const compH = page.clientHeight
  const targetCoverTop = compH * 2 / 3 - props.coverHeight
  const phase2StartTop = compH * 0.5
  const phase2EndTop = -compH * 1.1
  if (targetCoverTop < phase2StartTop && targetCoverTop > phase2EndTop) {
    const fraction = (phase2StartTop - targetCoverTop) / (phase2StartTop - phase2EndTop)
    P3 = P1 + fraction * (1 - P1)
  }
  const scale = (1 - P3) / (1 - 0.72)
  P3A = P3 + 0.03 * scale
  P4 = P3 + (0.93 - 0.72) * scale

  const coverMidY = compH * 2 / 3 - props.coverHeight / 2 - compH / 2

  ctx = gsap.context(() => {
    cards.forEach((card, i) => {
      gsap.set(card, { zIndex: cards.length - i })
    })

    const bounceTweens = createBounceTweens(cards)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        scroller: page,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          if (!cover || cards.length === 0) return

          if (p <= 0) {
            if (bounceTweens.length === 0) {
              cards.forEach(c => gsap.set(c, { y: 0 }))
              bounceTweens.push(...createBounceTweens(cards))
            }
          } else if (bounceTweens.length > 0) {
            killBounceTweens(bounceTweens, cards)
          }

          if (p < P3) {
            const coverTop = cover.getBoundingClientRect().top
            const rightmostTop = cards[cards.length - 1].getBoundingClientRect().top
            const hidden = coverTop <= rightmostTop
            cards.forEach(c => { c.style.opacity = hidden ? '0' : '1' })
          } else if (p < P3A) {
            const t = (p - P3) / (P3A - P3)
            cards.forEach(c => { c.style.opacity = String(Math.min(t * 4, 1)) })
          } else {
            cards.forEach(c => { c.style.opacity = '1' })
          }
        },
      },
    })

    // 阶段 1：收拢 + 下移（0 → P1）
    cards.forEach((card, i) => {
      tl.to(card, {
        x: stacks[i].x,
        y: stacks[i].y + convergeEndDropY,
        rotation: stacks[i].rotate,
        duration: P1 * D,
        ease: 'power2.inOut',
      }, 0)
    })

    if (cover) {
      tl.to(cover, {
        top: '50vh',
        duration: P1 * D,
        ease: 'power2.inOut',
      }, 0)
    }

    // 阶段 2：继续下移（P1 → HIDE_AT）
    cards.forEach((card, i) => {
      tl.to(card, {
        y: stacks[i].y + hideEndDropY,
        duration: (HIDE_AT - P1) * D,
        ease: 'power2.inOut',
      }, P1 * D)
    })

    if (cover) {
      tl.to(cover, {
        top: '-110vh',
        duration: (1 - P1) * D,
        ease: 'none',
      }, P1 * D)
    }

    // 阶段 3：出现（P3 → P3A）
    tl.set(container, { scale: 0.3, immediateRender: false }, P3 * D)

    cards.forEach((card, i) => {
      tl.set(card, {
        x: stacks[i].x,
        y: coverMidY + stacks[i].y,
        rotateX: 40,
        immediateRender: false,
      }, P3 * D)
    })

    // 阶段 4：下落 → 弹跳（P3A → P4）
    const bounceDur = (P4 - P3A) * D
    const dropDur = bounceDur * 0.3
    const bounceUpDur = bounceDur * 0.7
    const bounceStart = P3A * D

    tl.to(container, {
      scale: 1,
      duration: dropDur,
      ease: 'power1.in',
    }, bounceStart)

    cards.forEach((card, i) => {
      const startY = coverMidY + stacks[i].y
      const bottomY = startY + 300

      tl.to(card, {
        x: stacks[i].x,
        y: bottomY,
        rotateX: 0,
        duration: dropDur,
        ease: 'power1.in',
      }, bounceStart)

      tl.to(card, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: bounceUpDur,
        ease: 'power3.out',
      }, bounceStart + dropDur)
    })

    // 阶段 5：翻转 + 并排（P4 → 1.0）
    const off = offsets.value
    cards.forEach((card, i) => {
      tl.set(card, { boxShadow: 'none', border: 'none' }, P4 * D)
      tl.to(card, {
        x: off[i] * 100,
        y: 0,
        rotation: 0,
        scale: 1.5,
        duration: (1 - P4) * D,
        ease: 'power2.inOut',
      }, P4 * D)

      if (inners[i]) {
        tl.to(inners[i], {
          rotateY: 180,
          duration: (1 - P4) * D,
          ease: 'power2.inOut',
        }, P4 * D)
      }
    })
  }, page)
}

onMounted(() => {
  requestAnimationFrame(initAnimations)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<style scoped>
.book-page {
  height: 100vh;
  overflow-y: auto;
  position: relative;
  isolation: isolate;
}

.fixed-center {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
}

.cards-container {
  display: flex;
  gap: v-bind(cardGap + 'px');
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  perspective: 1000px;
}

.book-card {
  width: v-bind(cardWidth + 'px');
  background: transparent;
  /* border: var(--color-card-border); */
  border-radius: var(--border-radius-card);
  box-shadow: var(--color-card-shadow);
  cursor: pointer;
  will-change: transform, opacity;
  position: relative;
}

.book-card:hover {
  box-shadow: 4px 8px 20px rgba(0, 0, 0, 0.2);
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
}

.card-front {
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-card);
  backface-visibility: hidden;
  background: rgb(224, 224, 224);
}

.card-cover {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.book-card:hover .card-cover img {
  transform: scale(1.05);
}

.card-info {
  padding: var(--padding-card);
}

.card-title {
  margin: 0 0 6px;
  font-size: 16px;
  color: var(--color-white);
  font-weight: 600;
}

.card-author {
  margin: 0;
  font-size: 13px;
  color: var(--color-ar-text);
}

.card-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1a1a2e;
  border-radius: var(--border-radius-card);
  backface-visibility: hidden;
  transform: rotateY(180deg);
  padding: var(--padding-card);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
}

.card-back .card-title {
  font-size: 18px;
  margin-bottom: 8px;
}

.card-back .card-author {
  font-size: 14px;
  color: #aaa;
  margin-bottom: 16px;
}

.card-desc {
  font-size: 13px;
  color: #ccc;
  line-height: 1.6;
}

.cover-box {
  position: fixed;
  top: 300vh;
  left: 0;
  width: calc(100% - 6px);
  height: v-bind(coverHeight + 'px');
  background: v-bind(coverColor);
  z-index: 10;
  pointer-events: none;
  will-change: top;
}

.scroll-spacer {
  height: v-bind(scrollHeight);
}
</style>
