<script setup lang="ts">
import { MAX_FREE_COUNTS } from '~/lib/contants';
import { Icon } from '@iconify/vue';

const props = withDefaults(defineProps<{
    counter?: number
}>(), {
    counter: 0
})

const clampedCounter = computed(() => Math.min(Math.max(props.counter, 0), MAX_FREE_COUNTS))
</script>
<template>
    <div>
        <Card class="bg-white/10 border-0">
            <CardContent class="py-6">
                <div class="text-center text-sm mb-4 space-y-2">
                    <p>
                        {{ clampedCounter }} / {{ MAX_FREE_COUNTS }} Free Generations
                    </p>
                    <Progress
                        class="h-3"
                        :model-value="clampedCounter / MAX_FREE_COUNTS * 100"
                    />
                </div>
                <Button
                    class="w-full"
                    variant="premium"
                >
                    Upgrade
                    <Icon
                        class="w-4 h-4 ml-2 fill-white"
                        icon="lucide:zap"
                    />
                </Button>
            </CardContent>
        </Card>
    </div>
</template>