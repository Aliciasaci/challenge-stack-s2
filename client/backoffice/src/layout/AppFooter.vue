<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig, contextPath } = useLayout();

const logoUrl = computed(() => {
    return `${contextPath}layout/images/flutter-ease-logo.png`;
});
</script>

<template>
    <div class="layout-footer">
        <img :src="logoUrl" alt="Logo" class="mb-1 w-2rem flex-shrink-0" />
        
        <span class="font-medium ml-2">FlutterEase</span>
    </div>
</template>
<style lang="scss" scoped></style>
