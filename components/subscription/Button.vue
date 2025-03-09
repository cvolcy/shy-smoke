<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '../ui/button';

const props = defineProps<{
    isPro: Boolean
}>()

const isLoading = ref(false)

async function onClick() {
    try {
        isLoading.value = true
        const response = await $fetch('/api/payments')

        if (props.isPro) {
            window.open(response, '_blank')
        }
        else {
            window.location.href = response
        }
    } catch (error: any) {
        console.log("billing error", error)
    } finally {
        isLoading.value = false
    }
}
</script>
<template>
    <Button
        class="inline-block first-letter:uppercase"
        :variant="(isPro ? 'default' : 'premium')"
        @click="onClick"
        :disabled="isLoading"
    >
        <template v-if="isPro">
            {{ $t('subscription.pro.manage') }}
            <Icon icon="tabler:external-link" class="inline-block align-top w-4 h-4 ml-2" />
        </template>
        <template v-else>
            {{ $t('subscription.free.upgrade') }}
            <Icon icon="lucide:zap" class="inline-block align-top w-4 h-4 ml-2 fill-white" />
        </template>
    </Button>
</template>