<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const activateSidebarHeader = ref(false);

const menuItems = [{
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    to: '/',
    iconColor: 'text-sky-500'
},{
    label: 'Conversation',
    icon: 'lucide:message-square-text',
    to: '/',
    iconColor: 'text-violet-500'
},{
    label: 'Image Generation',
    icon: 'lucide:image',
    to: '/',
    iconColor: 'text-pink-700'
},{
    label: 'Video Generation',
    icon: 'lucide:video',
    to: '/',
    iconColor: 'text-orange-700'
},{
    label: 'Music Generation',
    icon: 'lucide:music',
    to: '/',
    iconColor: 'text-emerald-700'
},{
    label: 'Code Generation',
    icon: 'lucide:code',
    to: '/',
    iconColor: 'text-green-700'
}];
</script>
<template>
    <Sidebar class="bg-neutral-900" collapsible="icon">
        <SidebarHeader v-if="!activateSidebarHeader" class="flex-row items-center">
                <Logo class="fill-slate-300 size-8" />
            <SidebarGroup class="group-data-[collapsible=icon]:hidden">
                <span class="text-2xl font-mono text-nowrap">
                    SHY-SMOKE|ai
                </span>
            </SidebarGroup>
        </SidebarHeader>
        <SidebarHeader v-if="activateSidebarHeader">
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <SidebarMenuButton size="lg"
                                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                <div
                                    class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Icon icon="lucide:bird" class="size-4" />
                                </div>
                                <div class="grid flex-1 text-left text-sm leading-tight">
                                    <span class="truncate font-semibold">{{ 'activeTeam.name' }}</span>
                                    <span class="truncate text-xs">{{ 'activeTeam.plan' }}</span>
                                </div>
                                <Icon icon="lucide:chevrons-up-down" class="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            align="start" side="bottom" :side-offset="4">
                            <DropdownMenuLabel class="text-xs text-muted-foreground">
                                Teams
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                                v-for="(team, index) in [{ name: 'eagles' }, { name: 'falcons' }, { name: 'pigeons' }]"
                                :key="team.name" class="gap-2 p-2">
                                <div class="flex size-6 items-center justify-center rounded-sm border">
                                    <Icon icon="lucide:bird" class="size-4 shrink-0" />
                                </div>
                                {{ team.name }}
                                <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem class="gap-2 p-2">
                                <div class="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <Icon icon="lucide:plus" />
                                </div>
                                <div class="font-medium text-muted-foreground">
                                    Add team
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Plaform</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem v-for="menuItem in menuItems">
                        <SidebarMenuButton as-child>
                            <NuxtLink :to="menuItem.to">
                                <Icon :icon="menuItem.icon" :class="menuItem.iconColor" width="24" height="24" />
                                <span>{{ menuItem.label }}</span>
                            </NuxtLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton as-child>
                        <NuxtLink to="/">
                            <Icon icon="lucide:settings" width="24" height="24" />
                            <span>Settings</span>
                        </NuxtLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
                <SidebarMenuItem>
                    <LayoutUserButton
                        side="bottom"
                        :in-sidebar="true"
                    />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
</template>