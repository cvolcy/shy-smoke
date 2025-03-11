<script setup lang="ts">
definePageMeta({
    layout: 'auth',
    allowAnonymous: true
})
</script>
<template>
    <div class="container h-full">
        <LandingNavbar />
        <LandingHero />
        <LandingContent />
    </div>
</template>