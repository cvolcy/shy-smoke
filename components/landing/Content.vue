<script setup lang="ts">
const { tm, rt } = useI18n()

// @ts-ignore
const testimonials: Array<{ name: string, title: string, description: string }> = tm('landing.content.testimonials.list').map(x => {
    let obj: any = {};
    Object.keys(x).map(k => obj[k] = rt(x[k]))
    return obj
})
.sort(() => Math.random() - 0.5)
.slice(0, 8)
</script>
<template>
    <div class="px-10 pb-20">
        <h2 class="text-center text-4xl text-white font-extrabold mb-10">
            {{ $t('landing.content.testimonials.title') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">
            <Card
                v-for="testimonial in testimonials"
                :key="testimonial.description"
                class="bg-[#192339] border-none text-white"
            >
                <CardHeader>
                    <CardTitle class="flex items-center gap-x-2">
                        <div>
                            <p class="text-lg">{{ testimonial.name }}</p>
                            <p class="text-zinc-400 text-sm">{{ testimonial.title }}</p>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {{ testimonial.description }}
                </CardContent>
            </Card>
        </div>
    </div>
</template>