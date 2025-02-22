<script setup>
useHead({
  title: 'Shy Smoke | AI',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [{ name: 'description', content: 'My amazing site' }],
  link: [{ rel: 'icon', type: 'image/svg', href: '/logo-reverse.svg' }],
})
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
