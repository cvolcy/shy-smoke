<script setup lang="ts">
defineProps<{
    debug?: boolean
}>()

let eventSource: EventSource;

const lastEvent = ref(null)

onMounted(() => {
    closeConnection()
    eventSource = new EventSource('/api/updates')

    eventSource.onmessage = (event) => {
        lastEvent.value = event.data
    }
})

onUnmounted(closeConnection)

function closeConnection() {
    if (eventSource) {
        eventSource.close()
    }
}
</script>
<template>
    <p
        v-if="debug"
        class="container"
    >
        {{ lastEvent }}
    </p>
</template>