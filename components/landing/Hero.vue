<script setup lang="ts">
// @ts-ignore TS7016
import { VueWriter } from 'vue-writer'
const { $pb } = useNuxtApp();
const isLoggedIn = $pb.authStore.isValid;
const { tm, rt } = useI18n()
// @ts-ignore
const products = tm('landing.hero.products').map(rt)
</script>
<template>
    <div class="text-white font-bold py-36 text-center space-y-5">
        <div class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            <h1>
                {{ $t('landing.hero.title') }}
            </h1>
            <div class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-4">
                <VueWriter :array="products" />
            </div>
        </div>
        <div class="text-sm md:text-xl font-light text-zinc-500">
            {{ $t('landing.hero.description') }}
        </div>

        <div class="flex justify-center gap-x-2">
            <NuxtLink :href="(isLoggedIn ? '/dashboard' : '/login')">
                <Button
                    variant="premium"
                    class="md:text-lg p-4 md:p-6 rounded-full font-semibold"
                >
                    {{ $t('landing.hero.button') }}
                </Button>
            </NuxtLink>
        </div>
        <div class="text-zinc-400 text-xs md:text-sm font-normal">
            {{ $t('landing.hero.nocredit') }}
        </div>
    </div>
</template>
<style scoped>
</style>