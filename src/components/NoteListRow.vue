<template>
    <div class="bg-body d-flex flex-column shadow-sm gap-2 p-3 rounded-4" @click="$emit('clickEvent',notes.uuid)" style="cursor: pointer;">
        <h4 class="m-0">{{ notes.title }}</h4>
        <small class="m-0 text-secondary">{{ notes.date }}</small>
    </div>
</template>

<script setup>
    defineProps({notes:Object})
</script>