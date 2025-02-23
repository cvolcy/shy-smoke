<script setup lang="ts">
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/vue';

const router = useRouter();

const tools = [{
    label: 'Conversation',
    icon: 'lucide:message-square-text',
    iconColor: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    href: '/conversation'
},{
    label: 'Music Generation',
    icon: 'lucide:music',
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/music'
},{
    label: 'Image Generation',
    icon: 'lucide:image',
    iconColor: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/image'
},{
    label: 'Video Generation',
    icon: 'lucide:video',
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    href: '/video'
},{
    label: 'Code Generation',
    icon: 'lucide:code',
    iconColor: 'text-green-500',
    bgColor: 'bg-green-500/10',
    href: '/code'
}];
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
                    v-for="tool in tools"
                    :key="tool.href"
                    class="p-4 border-black/5 hover:shadow-md transition cursor-pointer"
                    @click="router.push(tool.href)"
                >
                    <CardContent class="p-0">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-x-4">
                                <div :class="cn('p-2 w-fit rounded-md', tool.bgColor)">
                                    <Icon :icon="tool.icon" :class="cn('w-8 h-8', tool.iconColor)" />
                                </div>
                                <div class="font-semibold">
                                    {{ tool.label }}
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