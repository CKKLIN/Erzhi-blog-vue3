<template>
    <div class="container1">
        <div
            class="card"
            v-for="(item, index) in headers"
            :key="item.id || index"
        >
            <div
                class="header-item"
                :class="{ active: hoverIndex === index || activeIndex === index }"
                :style="{
                    backgroundColor: item.color,
                    zIndex: headers.length - index,
                    width: `${50 * (index + 1)}px`
                }"
                @mouseenter="onHover(index)"
                @mouseleave="onLeave"
                @click="onClick(index)"
            >
                {{ item.name }}
            </div>
            <div
                class="card-body"
                :class="{ active: hoverIndex === index || activeIndex === index }"
                :style="{
                    backgroundColor: item.color,
                    zIndex: activeIndex === index ? headers.length + 1 : headers.length - index
                }"
            >
                <slot :name="`body-${index}`" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    headers: {
        type: Array,
        required: true,
        validator: (val) => val.every(h => h.name && h.color)
    },
    defaultActive: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['change'])

const activeIndex = ref(props.defaultActive)
const hoverIndex = ref(-1)

watch(() => props.defaultActive, (val) => {
    activeIndex.value = val
})

function onHover(index) {
    hoverIndex.value = index
}

function onLeave() {
    hoverIndex.value = activeIndex.value
}

function onClick(index) {
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
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: fit-content;
    padding: 8px 8px 8px 0;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    box-shadow: 1px -1px 3px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: transform 0.25s ease;
}

.card-body {
    width: 100%;
    height: 400px;
    position: absolute;
    top: 40px;
    transition: transform 0.25s ease;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    /* border-top-left-radius: 8px; */
}

.header-item.active,
.card-body.active {
    transform: translateY(-8px);
}
</style>
