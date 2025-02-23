<script setup lang="ts">
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/vue';
import type { Product } from '~/server/api/products/index.get';

const router = useRouter();

const _ = ['text-violet-500', 'bg-violet-500/10', 'text-emerald-500', 'bg-emerald-500/10', 'text-pink-700', 'bg-pink-700/10', 'text-orange-500', 'bg-orange-500/10', 'text-green-500', 'bg-green-500/10',];
const products = ref<Array<Product>>([]);
const { data } = await useFetch('/api/products');
products.value = data.value!.filter( x => x.id != 'dashboard' )
</script>
<template>
    <div class="container">
        <div class="mb-8 space-y-4">
            <h2 class="text-2xl md:text-4xl font-bold text-center">
                Explore the power of AI
            </h2>
            <p class="text-muted-foreground font-light text-sm md:text-lg text-center">
                Chat with the smartest AI - Experience the power of AI
            </p>
            <div class="px-4 md:px-20 lg:px-32 space-y-4">
                <Card
                    v-for="product in products"
                    :key="product.to"
                    class="p-4 border-black/5 hover:shadow-md transition cursor-pointer"
                    @click="router.push(product.to)"
                >
                    <CardContent class="p-0">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-x-4">
                                <div :class="cn('p-2 w-fit rounded-md', product.bgColor)">
                                    <Icon :icon="product.icon" :class="cn('w-8 h-8', product.iconColor)" />
                                </div>
                                <div class="font-semibold">
                                    {{ product.label }}
                                </div>
                            </div>
                            <Icon icon="lucide:arrow-right" class="w-5 h-5" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>