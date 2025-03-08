<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/vue'

const { isOpen } = useProSub()
const _ = ['text-violet-500', 'bg-violet-500/10', 'text-emerald-500', 'bg-emerald-500/10', 'text-pink-700', 'bg-pink-700/10', 'text-orange-500', 'bg-orange-500/10', 'text-green-500', 'bg-green-500/10',];
const { data: products } = await useFetch('/api/products', {
    key: '/api/products',
    transform(input) {
        return input.filter( x => x.id != 'dashboard' )
    }
})

const isLoading = ref(false)

async function onSubscribe() {
    try {
        isLoading.value = true
        const response = await $fetch('/api/payments', {
            key: '/api/payments',
            method: 'GET'
        })

        window.location.href = response
    } catch (error: any) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}
</script>
<template>
    <div>
        <Dialog :open="isOpen" @update:open="isOpen = $event">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle class="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div class="flex items-center gap-x-3 font-bold py-1">
                            Upgrade to Shy-Smoke
                            <Badge
                                class="uppercase text-sm"
                                variant="premium"
                            >
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription class="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        <Card
                            v-for="product in products"
                            :key="product.id"
                            class="p-3 border-black/5 flex items-center justify-between"
                        >
                            <CardContent class="flex items-center gap-x-4">
                                <div :class="cn('p-2 w-fit rounded-md', product.bgColor)">
                                    <Icon :icon="product.icon" :class="cn('w-6 h-6', product.iconColor)" />
                                </div>
                                <div class="font-semibold text-sm">
                                    {{ $t(`products.${product.id}.label`) }}
                                </div>
                            </CardContent>
                            <Icon icon="lucide:check" class="text-primary w-5 h-5" />
                        </Card>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        class="w-full"
                        size="lg"
                        variant="premium"
                        @click="onSubscribe"
                        :disabled="isLoading"
                    >  
                        <span class="capitalize">
                            {{ $t('layout.counter.upgrade')}}
                        </span>
                        <Icon class="w-4 h-4 fill-white" icon="lucide:zap" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>