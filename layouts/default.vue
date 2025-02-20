<template>
  <div class="">
    <SidebarProvider>
      <LayoutSidebar />
      <main class="flex grow flex-col">
        <LayoutNavbar />
        <slot />
      </main>
    </SidebarProvider>
  </div>
</template>