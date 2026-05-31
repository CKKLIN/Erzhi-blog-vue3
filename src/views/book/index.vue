<template>
  <div class="book-page" ref="pageRef">
    <!-- 固定在视口中央的卡片区域 -->
    <div class="fixed-center">
      <div class="cards-container">
        <div
          class="book-card"
          v-for="(book, index) in books"
          :key="index"
          :ref="(el) => setCardRef(el, index)"
        >
          <div
            class="card-inner"
            :ref="(el) => setInnerRef(el, index)"
          >
            <!-- 正面：封面 -->
            <div class="card-front">
              <div class="card-cover">
                <img :src="book.cover" :alt="book.title" />
              </div>
              <div class="card-info">
                <h3 class="card-title">{{ book.title }}</h3>
                <p class="card-author">{{ book.author }}</p>
              </div>
            </div>
            <!-- 背面：书籍详情 -->
            <div class="card-back">
              <h3 class="card-title">{{ book.title }}</h3>
              <p class="card-author">{{ book.author }}</p>
              <p class="card-desc">{{ book.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 遮盖盒子：从下方随滚动上移盖住卡片 -->
    <div class="cover-box" ref="coverRef"></div>
    <!-- 滚动空间 -->
    <div class="scroll-spacer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const books = [
  {
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    cover: 'https://picsum.photos/seed/book1/300/400',
    desc: '魔幻现实主义文学的代表作，描述了布恩迪亚家族七代人的传奇故事。',
  },
  {
    title: '活着',
    author: '余华',
    cover: 'https://picsum.photos/seed/book2/300/400',
    desc: '讲述了一个人历尽世间沧桑和磨难的一生，表达了对生命的热爱与敬畏。',
  },
  {
    title: '三体',
    author: '刘慈欣',
    cover: 'https://picsum.photos/seed/book3/300/400',
    desc: '中国科幻文学的里程碑之作，展现了宇宙文明的壮阔与残酷。',
  },
]

const pageRef = ref<HTMLElement | null>(null)
const coverRef = ref<HTMLElement | null>(null)
const cardRefs = ref<(HTMLElement | null)[]>([])
const innerRefs = ref<(HTMLElement | null)[]>([])

const setCardRef = (el: unknown, index: number) => {
  cardRefs.value[index] = el as HTMLElement | null
}

const setInnerRef = (el: unknown, index: number) => {
  innerRefs.value[index] = el as HTMLElement | null
}

const offsets = [-1, 0, 1]
const cardStep = 200

// ===== 阶段控制 =====
// 第一阶段：收拢 → 隐藏
const P1 = 0.35       // 收拢完成
const P2 = 0.55       // 下移完成
const HIDE_AT = 0.38  // 卡片隐藏
const COVER_START = 300

// 第二阶段：堆叠出现 → 扇形展开 → 3D翻转 → 并排展示
const P3 = 0.72       // 卡片以堆叠状态出现（纵深由远及近）
const P3A = 0.75      // 堆叠完成，开始下落反弹
const P4 = 0.93       // 反弹完成，开始3D翻转
// P4 → 1.0            3D翻转并排展示

const smoothstep = (t: number) => t * t * (3 - 2 * t)

const onScroll = () => {
  const page = pageRef.value
  if (!page) return

  const maxScroll = page.scrollHeight - page.clientHeight
  const rawProgress = maxScroll > 0 ? Math.min(page.scrollTop / maxScroll, 1) : 0

  // === 第一阶段：收拢因子 ===
  let converge = 0
  if (rawProgress <= P1) {
    converge = smoothstep(rawProgress / P1)
  } else if (rawProgress <= HIDE_AT) {
    converge = 1
  }

  // 下移因子
  let dropY = 0
  if (rawProgress <= P2) {
    dropY = smoothstep(rawProgress / P2)
  } else if (rawProgress <= HIDE_AT) {
    dropY = 1
  }

  // === 遮盖盒子 ===
  const cover = coverRef.value
  if (cover) {
    const COVER_AT = P1
    let coverTop: number
    if (rawProgress <= COVER_AT) {
      const t = rawProgress / COVER_AT
      coverTop = COVER_START - t * (COVER_START - 50)
    } else {
      const t = (rawProgress - COVER_AT) / (1 - COVER_AT)
      coverTop = 50 - t * 160
    }
    cover.style.top = `${coverTop}vh`
  }

  // === 卡片动画 ===
  cardRefs.value.forEach((card, i) => {
    if (!card) return

    let translateX = 0
    let translateY = 0
    let rotate = 0
    let rotateY = 0
    let scale = 1
    let opacity = 1

    if (rawProgress <= HIDE_AT) {
      // ====== 第一阶段：收拢 ======
      translateX = -offsets[i] * cardStep * converge
      translateX += converge * (i - 1) * 50
      translateY = converge * (i - 1) * -40 + dropY * 400
      rotate = converge * (-10 + i * 5)
      opacity = rawProgress > HIDE_AT ? 0 : 1

    } else if (rawProgress <= P3) {
      // ====== 隐藏中 ======
      opacity = 0

    } else if (rawProgress <= P3A) {
      // ====== 第二阶段-1：以和消失时相同的堆叠状态出现 ======
      const t = smoothstep((rawProgress - P3) / (P3A - P3))
      opacity = Math.min(t * 4, 1)
      scale = 0.2 + t * 0.8
      // 堆叠位置 = 消失时的位置（converge=1, dropY=1）
      const finalStackX = -offsets[i] * cardStep + (i - 1) * 50
      const finalStackY = (i - 1) * -40
      const finalRotate = -10 + i * 5
      // 从上方落下，错开距离从大逐渐缩小到堆叠位置
      const startSpread = offsets[i] * 80
      translateX = finalStackX + startSpread * (1 - t)
      translateY = finalStackY - (1 - t) * 600
      rotate = finalRotate

    } else if (rawProgress <= P4) {
      // ====== 第二阶段-2：下落 → 弹地反弹散开到各自位置 ======
      const t = smoothstep((rawProgress - P3A) / (P4 - P3A))
      scale = 1
      // 堆叠位置 = 消失时的位置
      const stackX = -offsets[i] * cardStep + (i - 1) * 50
      const stackY = (i - 1) * -40
      const finalX = 0
      const finalY = 0

      if (t <= 0.3) {
        // 前半段：整体下移到底部，保持倾斜
        const downT = t / 0.3
        translateY = stackY + downT * 300
        translateX = stackX
        rotate = -10 + i * 5
      } else {
        // 后半段：反弹散开到居中位置，同时旋转逐渐归零
        const upT = (t - 0.3) / 0.7
        const bottomX = stackX
        const bottomY = stackY + 300
        const bounce = upT < 1
          ? 1 - Math.pow(1 - upT, 3) * Math.cos(upT * Math.PI * 2.5)
          : 1
        const b = Math.min(bounce, 1.0)
        translateX = bottomX + (finalX - bottomX) * b
        translateY = bottomY + (finalY - bottomY) * b
        rotate = (-10 + i * 5) * (1 - b)
      }
      rotateY = 0

    } else {
      // ====== 第二阶段-3：翻转，背景阴影跟着转 ======
      const t = smoothstep((rawProgress - P4) / (1 - P4))
      translateX = offsets[i] * t * 100
      translateY = 0
      rotate = 0
      rotateY = t * 180
      opacity = 1
      scale = 1
    }

    card.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`
    card.style.opacity = `${opacity}`

    // 翻转独立应用到 .card-inner，避免 opacity 干扰 preserve-3d
    const inner = innerRefs.value[i]
    if (inner) {
      inner.style.transform = `rotateY(${rotateY}deg)`
    }

    // 翻转过程中隐藏阴影，翻转完成后恢复
    card.style.boxShadow = rotateY > 0 ? 'none' : ''
  })
}

onMounted(() => {
  pageRef.value?.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  pageRef.value?.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.book-page {
  height: 100vh;
  overflow-y: auto;
  position: relative;
}

/* 固定在视口中央 */
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
  gap: 40px;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.book-card {
  width: 160px;
  background: transparent;
  border: var(--color-card-border);
  border-radius: var(--border-radius-card);
  box-shadow: var(--color-card-shadow);
  cursor: pointer;
  will-change: transform, opacity;
  position: relative;
}

.book-card:hover {
  box-shadow: 4px 8px 20px rgba(0, 0, 0, 0.2);
}

/* 翻转容器：只负责 3D 翻转，不接触 opacity */
.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
}

/* 正面 */
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

/* 背面 */
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

/* 遮盖盒子：固定定位，从下方上移 */
.cover-box {
  position: fixed;
  top: 300vh;
  left: 0;
  width: 100%;
  height: 400px;
  background: #1a1a2e81;
  z-index: 10;
  pointer-events: none;
  will-change: top;
}

/* 滚动空间 */
.scroll-spacer {
  height: 500vh;
}
</style>
