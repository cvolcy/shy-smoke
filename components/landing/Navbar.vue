<script setup lang="ts">
const { $pb } = useNuxtApp();
const isLoggedIn = $pb.authStore.isValid;
</script>
<template>
    <nav class="p-4 bg-transparent flex items-center justify-between">
        <NuxtLink
            href="/"
            class="flex items-center"
        >
            <div class="relative h-8 w-8 mr-4">
                <img src="/logo.svg" alt="logo">
            </div>
            <h1 class="title text-2xl font-bold text-center">
                Shy Smoke
            </h1>
        </NuxtLink>
        <div class="flex items-center gap-x-2">
            <NuxtLink :href="(isLoggedIn ? '/dashboard' : '/login')">
                <Button
                    variant="outline"
                    class="rounded-full"
                >
                    {{ $t('landing.nav.button') }}
                </Button>
            </NuxtLink>
        </div>
    </nav>
</template>
<style scoped>
.title {
    font-family: "Montserrat", sans-serif;
}
</style>