<template>
    <div class="mainjing">
        <button class="capsule-btn" @click="lookContent('/mianjingListh5')">VUE</button>
    </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const lookContent=(path)=>{
  router.push(path)
}

</script>
<style scoped>
.mainjing {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
}

.capsule-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 40px;
    border: none;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(12px) saturate(150%);
    -webkit-backdrop-filter: blur(12px) saturate(150%);
    color: #333;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 2px;
    box-shadow:var(--color-card-shadow-one);
    cursor: pointer;
    transition: all 0.3s ease;
}

.capsule-btn:active {
    transform: scale(0.95);
}
</style>