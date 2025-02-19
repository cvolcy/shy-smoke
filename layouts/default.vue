<template>
  <div class="">
    <SidebarProvider>
      <Sidebar class="bg-neutral-900" collapsible="icon">
        <SidebarHeader>
          Header
        </SidebarHeader>
        <SidebarContent>
          Content
          <SidebarGroup>
            Group 1
          </SidebarGroup>
          <SidebarGroup>
            Group 2
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          Footer
        </SidebarFooter>
      </Sidebar>
      <main class="flex grow flex-col">
        <header class="w-full">
          <SidebarTrigger />
        </header>
        <slot />
      </main>
    </SidebarProvider>
  </div>
</template>