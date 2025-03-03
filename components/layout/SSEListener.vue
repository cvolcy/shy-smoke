<script setup lang="ts">
import { useEventSource } from '@vueuse/core';

defineProps<{
    debug?: boolean
}>()

const { status, data } = useEventSource('/api/updates')
</script>
<template>
    <p
        v-if="debug"
        class="container"
    >
        <b>{{ status }}</b> - <em>{{ data }}</em>
    </p>
</template>