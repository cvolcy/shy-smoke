<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import type { Product } from '~/server/api/products/index.get';
import type { RecordModel } from 'pocketbase';

const route = useRoute();

const activateSidebarHeader = ref(false);

const _ = ['text-sky-500', 'text-violet-500', 'text-emerald-500', 'text-pink-700', 'text-orange-500', 'text-green-500'];
const { data: products } = await useFetch('/api/products', { key: '/api/products?sidebar' });
const { data: counter } = await useFetch<RecordModel>('/api/counter', { key: '/api/counter' });
const { data: subscription } = await useFetch('/api/subscription', { key: '/api/subscription' });
</script>
<template>
    <Sidebar class="bg-neutral-900" collapsible="icon">
        <ProSubModal />
        <SidebarHeader v-if="!activateSidebarHeader" class="flex-row items-center">
            <NuxtLink
                href="/dashboard"
                class="contents logo-title"
            >
                <Logo class="fill-slate-300 size-8" />
                <SidebarGroup class="group-data-[collapsible=icon]:hidden">
                    <span class="text-2xl text-nowrap">
                        SHY SMOKE | AI
                    </span>
                </SidebarGroup>
            </NuxtLink>
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
                    <SidebarMenuItem v-for="product in products">
                        <SidebarMenuButton as-child :is-active="route.path === product.to ? true : undefined">
                            <NuxtLink :to="product.to">
                                <Icon :icon="product.icon" :class="product.iconColor" width="24" height="24" />
                                <span>{{ $t(`products.${product.id}.label`) }}</span>
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
                        <NuxtLink to="/settings">
                            <Icon icon="lucide:settings" width="24" height="24" />
                            <span class="capitalize">{{ $t('layout.settings')}}</span>
                        </NuxtLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem
                    v-if="subscription?.isValid !== true"
                    class="group-data-[collapsible=icon]:hidden"
                >
                    <Counter :counter="counter?.count" />
                </SidebarMenuItem>
                <SidebarMenuItem
                    v-if="subscription?.isValid !== true"
                    class="hidden group-data-[collapsible=icon]:block"
                >
                    <Counter :counter="counter?.count" :mini="true" />
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <UserButton
                        side="bottom"
                        :in-sidebar="true"
                    />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
</template>
<style scope>
.logo-title {    
    font-family: "Montserrat", sans-serif;
}
</style>