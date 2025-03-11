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
    <NuxtLoadingIndicator
      color="repeating-linear-gradient(to right, rgb(99, 102, 241), rgb(168, 85, 247), rgb(236, 72, 153))"
      height="4"
    />
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
