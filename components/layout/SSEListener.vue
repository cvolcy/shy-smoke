<script setup lang="ts">
import { useEventSource } from '@vueuse/core';
import type { SSEMessage } from '~/server/api/(utils)/updates.get';

defineProps<{
    debug?: boolean
}>()

const { status, data } = useEventSource('/api/updates')
const message = computed(() => JSON.parse(data.value ?? '{}') as SSEMessage<any>)
</script>
<template>
    <div
        v-if="debug"
        class="container"
    >
        <div class="px-4 pb-2">
            <b>{{ status }}</b> - <em>{{ message }}</em>
        </div>
    </div>
</template>