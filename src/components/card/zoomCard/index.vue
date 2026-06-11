<template>
    <div class="card-list">
        <div
            v-for="item in list"
            :key="item.name"
            class="zoom-card"
            @click="openModal(item, $event)"
        >
            <div class="card-top">
                <img v-if="item.icon" :src="item.icon" class="card-icon" />
                <div class="card-right">
                    <div class="card-name">{{ item.name }}</div>
                    <div v-if="showDownload && item.versions?.length" class="card-versions">
                        <button class="card-download" @click.stop="onDownload(item)">下载</button>
                        <select class="version-select" :value="selectedVersions[item.name] ?? item.versions?.[0]?.label" @change="onVersionChange($event, item.versions)" @click.stop>
                            <option v-for="v in item.versions" :key="v.label" :value="v.label">{{ v.label }}</option>
                        </select>
                    </div>
                    <div v-if="showLink && item.url" class="card-link-wrapper">
                        <button class="card-link-btn" @click.stop="openUrl(item.url)">打开官网</button>
                    </div>
                </div>
            </div>
            <div class="card-intro">{{ item.desc }}</div>
        </div>
    </div>

    <!-- 遮罩 + 居中放大卡片 -->
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="modalItem" class="zoom-card-modal-overlay" @click="closeModal">
                <div class="zoom-card-modal" :style="modalStyle" @click.stop>
                    <div class="modal-header">
                        <img v-if="modalItem.icon" :src="modalItem.icon" class="modal-icon" />
                        <div class="modal-info">
                            <div class="modal-name">{{ modalItem.name }}</div>
                            <div class="modal-desc">{{ modalItem.desc }}</div>
                        </div>
                        <div class="modal-close" @click="closeModal">&times;</div>
                    </div>
                    <div class="modal-body">
                        <div v-if="modalItem.content" class="modal-content" v-html="modalItem.content"></div>
                        <span v-if="modalItem.copyText" class="modal-copy-btn" :class="{ copied }" @click="copyToClipboard(modalItem.copyText)">{{ copied ? '✓ 已复制' : '复制' }}</span>
                        <div v-if="modalItem.versions?.length" class="modal-section">
                            <div class="modal-section-title">历史版本</div>
                            <div class="modal-versions">
                                <div
                                    v-for="v in modalItem.versions"
                                    :key="v.label"
                                    class="modal-version-item"
                                    @click="openUrl(v.url)"
                                >
                                    {{ v.label }}
                                </div>
                            </div>
                        </div>
                        <div v-if="modalItem.url" class="modal-section">
                            <a class="modal-link" :href="modalItem.url" target="_blank">访问官网</a>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'

interface Version {
    label: string
    url: string
}

interface CardItem {
    name: string
    desc: string
    content?: string
    copyText?: string
    icon?: string
    url?: string
    versions?: Version[]
}

const props = defineProps<{
    list: CardItem[]
    showDownload?: boolean
    showLink?: boolean
}>()

const selectedVersions = ref<Record<string, string>>({})
const modalItem = ref<CardItem | null>(null)
const copied = ref(false)

// 初始化默认选中的版本
watch(() => props.list, (newList) => {
    newList.forEach(item => {
        if (item.versions?.length && !selectedVersions.value[item.name]) {
            selectedVersions.value[item.name] = item.versions[0].label
        }
    })
}, { immediate: true, deep: true })

function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
        copied.value = true
        setTimeout(() => { copied.value = false }, 2000)
    })
}

function openUrl(url?: string) {
    if (url) window.open(url)
}

const originRect = ref<{ x: number; y: number; w: number; h: number } | null>(null)

const modalStyle = computed(() => {
    if (!originRect.value) return {}
    const cx = window.innerWidth / 2 - 300
    const cy = window.innerHeight / 2 - 150
    const dx = originRect.value.x - cx
    const dy = originRect.value.y - cy
    const sx = originRect.value.w / 600
    const sy = originRect.value.h / 300
    return {
        '--dx': `${dx}px`,
        '--dy': `${dy}px`,
        '--sx': sx,
        '--sy': sy,
    } as any
})

function openModal(item: CardItem, e: MouseEvent) {
    const el = (e.currentTarget as HTMLElement).getBoundingClientRect()
    originRect.value = { x: el.left, y: el.top, w: el.width, h: el.height }
    modalItem.value = item
}

function closeModal() {
    modalItem.value = null
}

function onVersionChange(e: Event, _versions?: Version[]) {
    const select = e.target as HTMLSelectElement
    const label = select.value
    const card = select.closest('.zoom-card') as HTMLElement
    const name = card?.querySelector('.card-name')?.textContent ?? ''
    selectedVersions.value[name] = label
}

function onDownload(item: CardItem) {
    const selected = selectedVersions.value[item.name]
    const version = item.versions?.find(v => v.label === selected)
    console.log('下载', item.name, selected,version)
    if (version) {
        console.log('下载', version.label, version.url)
        const link = document.createElement('a')
        link.href = version.url
        link.download = '' // 触发浏览器下载行为
        // link.target = '_blank' // 如果 download 属性因跨域失效，则在新标签页打开
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
}
</script>

<style>
/* 遮罩 - 不使用 scoped，因为 Teleport 到 body */
.zoom-card-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    perspective: 1200px;
}

.zoom-card-modal {
    width: 600px;
    max-height: 80vh;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transform-style: preserve-3d;
    display: flex;
    flex-direction: column;
    --dx: 0px;
    --dy: 0px;
    --sx: 1;
    --sy: 1;
}

.zoom-card-modal .modal-header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
}

.zoom-card-modal .modal-icon {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    object-fit: cover;
    flex-shrink: 0;
}

.zoom-card-modal .modal-info {
    flex: 1;
    min-width: 0;
}

.zoom-card-modal .modal-name {
    font-size: 20px;
    font-weight: 700;
    color: #333;
}

.zoom-card-modal .modal-desc {
    font-size: 13px;
    color: #999;
    margin-top: 4px;
    line-height: 1.5;
}

.zoom-card-modal .modal-close {
    position: absolute;
    top: 12px;
    right: 16px;
    font-size: 24px;
    color: #999;
    cursor: pointer;
    line-height: 1;
    transition: color 0.2s;
}

.zoom-card-modal .modal-close:hover {
    color: #333;
}

.zoom-card-modal .modal-content {
    font-size: 13px;
    color: #555;
    line-height: 1.8;
}

.zoom-card-modal .modal-content strong {
    color: #333;
}

.zoom-card-modal .modal-content ul {
    padding-left: 18px;
    margin: 8px 0 0;
}

.zoom-card-modal .modal-content li {
    margin-bottom: 4px;
}

.zoom-card-modal .modal-body {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
    flex: 1;
    min-height: 0;
}

.zoom-card-modal .modal-section-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
}

.zoom-card-modal .modal-versions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.zoom-card-modal .modal-version-item {
    padding: 6px 16px;
    font-size: 13px;
    color: #e74c3c;
    border: 1px solid #e74c3c;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
}

.zoom-card-modal .modal-version-item:hover {
    background: #e74c3c;
    color: #fff;
}

.zoom-card-modal .modal-link {
    display: inline-block;
    padding: 8px 24px;
    font-size: 14px;
    color: #fff;
    background: #e74c3c;
    border-radius: 6px;
    text-decoration: none;
    transition: opacity 0.2s;
}

.zoom-card-modal .modal-link:hover {
    opacity: 0.85;
}

.zoom-card-modal .modal-copy-btn {
    align-self: flex-end;
    margin-top: -33px;
    margin-right: 20px;
    font-size: 12px;
    color: #ffffff;
    cursor: pointer;
    transition: color 0.2s;
    user-select: none;
    background-color: rgb(172, 255, 5);
    padding: 5px 10px;
    border-radius: 6px;
}

.zoom-card-modal .modal-copy-btn:hover {
    color: #000000;
}

.zoom-card-modal .modal-copy-btn.copied {
    color: #27ae60;
}

.modal-enter-active {
    transition: opacity 0.3s ease;
}
.modal-enter-active .zoom-card-modal {
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.modal-enter-from {
    opacity: 0;
}
.modal-enter-from .zoom-card-modal {
    transform: translate(var(--dx), var(--dy)) scale(var(--sx), var(--sy)) rotateY(90deg);
}
.modal-leave-active {
    transition: opacity 0.5s ease 0.1s;
}
.modal-leave-active .zoom-card-modal {
    transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.modal-leave-to {
    opacity: 0;
}
.modal-leave-to .zoom-card-modal {
    transform: translate(var(--dx), var(--dy)) scale(var(--sx), var(--sy)) rotateY(-90deg);
}
</style>

<style scoped>
.card-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px;
}

.zoom-card {
    width: calc(50% - 8px);
    padding: 16px;
    border-radius: 12px;
    background: #fff;
    box-shadow:var(--color-card-shadow-one);
    /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); */
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.zoom-card:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-top {
    display: flex;
    gap: 16px;
}

.card-icon {
    width: 200px;
    height: 130px;
    border-radius: 12px;
    object-fit: cover;
    flex-shrink: 0;
}

.card-right {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
}

.card-name {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    white-space: nowrap;
    /* overflow: hidden; */
    text-overflow: ellipsis;
}

.card-versions {
    display: flex;
    gap: 8px;
    flex-direction: column;
}

.version-select {
    padding: 4px 8px;
    font-size: 12px;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    width: 90px;
    outline: none;
}

.version-select:focus {
    border-color: #e74c3c;
}

.card-download {
    display: inline-block;
    align-self: flex-start;
    padding: 4px 16px;
    font-size: 12px;
    color: #e74c3c;
    border: 1px solid #e74c3c;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
}

.card-download:hover {
    background: #e74c3c;
    color: #fff;
}

.card-link-btn {
    display: inline-block;
    padding: 4px 16px;
    font-size: 12px;
    color: #4b7424;
    border: 1px solid #4b7424;
    border-radius: 4px;
    cursor: pointer;
    background: #fff;
    transition: background 0.2s, color 0.2s;
}

.card-link-btn:hover {
    background: #4b7424;
    color: #fff;
}

.card-intro {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
    font-size: 12px;
    color: #666;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
