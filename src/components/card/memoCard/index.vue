<template>
    <div class="container1">
        <div
            class="card"
            v-for="(item, index) in headers"
            :key="item.id || index"
        >
            <div
                :ref="(el: any) => { if (el) headerRefs[index] = el }"
                class="header-item"
                :class="{ active: hoverIndex === index || activeIndex === index }"
                :style="{
                    backgroundColor: item.color,
                    zIndex: headers.length - index,
                    paddingLeft: `${paddingLefts[index] ?? 12}px`
                }"
                @click="onClick(index)"
                @mouseenter="onHover(index)"
                @mouseleave="onLeave"
            >
                {{ item.name }}
            </div>
            <Transition name="body-fade">
                <div
                    v-if="slots[`body-${index}`] && (showBodyIndex >= 0 ? showBodyIndex === index : activeIndex === index)"
                    class="card-body"
                    :class="{ active: hoverIndex === index || activeIndex === index }"
                    :style="{
                        backgroundColor: item.color,
                        zIndex: (hoverIndex === index || activeIndex === index) ? headers.length + 1 : headers.length - index
                    }"
                >
                    <slot :name="`body-${index}`" />
                </div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, useSlots, onMounted, nextTick } from 'vue'

interface HeaderItem {
    name: string
    color: string
    id?: string | number
}

const slots = useSlots()

const props = defineProps({
    headers: {
        type: Array as () => HeaderItem[],
        required: true,
        validator: (val: HeaderItem[]) => val.every(h => h.name && h.color)
    },
    defaultActive: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['change'])

const headerRefs = ref<(HTMLElement | null)[]>([])
const paddingLefts = ref<number[]>([])

function calcOffsets() {
    const basePaddingLeft = 14
    const paddingRight = 16
    const textWidths = headerRefs.value.map(el =>
        (el?.offsetWidth ?? 0) - basePaddingLeft - paddingRight
    )
    const gap = 8
    const result: number[] = [basePaddingLeft]
    let prevTabWidth = textWidths[0] + basePaddingLeft + paddingRight
    for (let i = 1; i < textWidths.length; i++) {
        result.push(prevTabWidth + gap)
        prevTabWidth = textWidths[i] + result[i] + paddingRight
    }
    paddingLefts.value = result
}

onMounted(() => nextTick(calcOffsets))
watch(() => props.headers, () => nextTick(calcOffsets), { deep: true })

const activeIndex = ref(props.defaultActive)
const hoverIndex = ref(-1)
const showBodyIndex = ref(-1) // 控制实际显示的索引
let hoverTimer: ReturnType<typeof setTimeout> | null = null

watch(() => props.defaultActive, (val) => {
    activeIndex.value = val
})

function onHover(index: number) {
    hoverIndex.value = index
    // 清除之前的定时器
    if (hoverTimer) {
        clearTimeout(hoverTimer)
    }
    // 设置1秒延迟后显示body
    hoverTimer = setTimeout(() => {
        showBodyIndex.value = index
    }, 500)
}

function onLeave() {
    hoverIndex.value = -1
    // 清除定时器并隐藏body
    if (hoverTimer) {
        clearTimeout(hoverTimer)
        hoverTimer = null
    }
    showBodyIndex.value = -1
}

function onClick(index: number) {
    activeIndex.value = activeIndex.value === index ? -1 : index
    emit('change', activeIndex.value)
}
</script>

<style scoped>
.container1 {
    width: 100%;
    position: relative;
    height: fit-content;
    /* border-radius: 8px; */
    /* overflow: hidden; */
}

.card {
    position: relative;
}

.header-item {
    /* background-color: yellowgreen; */
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: fit-content;
    padding: 8px 16px 8px 0;
    white-space: nowrap;

    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    box-shadow: 1px -1px 3px #00000026;
    cursor: pointer;
    transition: transform 0.25s ease;
}

.card-body {
    width: 100%;
    /* height: 400px; */
    position: absolute;
    top: 34.4px;
    transition: transform 0.25s ease;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    /* border-top-left-radius: 8px; */
    /* background-color: violet; */
}

.header-item.active,
.card-body.active {
    transform: translateY(-8px);
}

.body-fade-enter-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.body-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.body-fade-enter-from {
    opacity: 0;
    transform: translateY(-6px);
}

.body-fade-leave-to {
    opacity: 0;
    transform: translateY(6px);
}
</style>
