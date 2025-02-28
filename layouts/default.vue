<script setup lang="ts">
  const config = useRuntimeConfig();
</script>
<template>
  <div class="">
    <SidebarProvider>
      <LayoutSidebar />
      <main class="flex grow flex-col">
        <LayoutNavbar />
        <slot />
        <footer class="flex flex-row flex-grow">
          <div class="container self-end">
            <div class="text-sm text-center text-muted-foreground">
              <p>
                © 2017-{{ new Date().getFullYear() }} shy-smoke
                v3.2.{{ new Date().toLocaleDateString('en', {year: '2-digit'}) }}-{{ config.public.BUILD_NUMBER }}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </SidebarProvider>
  </div>
</template>