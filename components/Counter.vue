<script setup lang="ts">
import { MAX_FREE_COUNTS } from '~/lib/contants';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/vue';

const props = withDefaults(defineProps<{
    counter?: number,
    mini?: boolean
}>(), {
    counter: 0
})

const clampedCounter = computed(() => Math.min(Math.max(props.counter, 0), MAX_FREE_COUNTS))
</script>
<template>
    <div>
        <Card class="bg-white/10 border-0">
            <CardContent :class="cn(mini ? 'p-1 pt-2' : 'py-6')">
                <div class="text-center text-sm mb-4 space-y-2">
                    <p>
                        {{ clampedCounter }}
                        <span
                            v-if="!mini"
                            class="capitalize"
                        >
                        / {{ MAX_FREE_COUNTS }}
                        {{ $t('layout.counter.freegeneration') }}
                    </span>
                    </p>
                    <Progress
                        v-if="!mini"
                        class="h-3"
                        :model-value="clampedCounter / MAX_FREE_COUNTS * 100"
                    />
                </div>
                <Button
                    class="w-full"
                    size="icon"
                    variant="premium"
                >
                    <span
                        v-if="!mini"
                        class="capitalize"
                    >
                        {{ $t('layout.counter.upgrade')}}
                    </span>
                    <Icon
                        :class="cn('w-4 h-4 fill-white', mini ? '' : 'ml-2')"
                        icon="lucide:zap"
                    />
                </Button>
            </CardContent>
        </Card>
    </div>
</template>