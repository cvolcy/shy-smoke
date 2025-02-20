<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const { $pb } = useNuxtApp();

const currentUser = $pb.authStore.record;
const avatarUrl = $pb.files.getUrl(currentUser, currentUser.avatar, { 'thumb': '40x40' });
const initials = currentUser.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
const activateSidebarHeader = ref(false);

function onLogOutClick() {
    $pb.authStore.clear();
    useRouter().push({ name: 'login' })
}
</script>
<template>
    <Sidebar class="bg-neutral-900" collapsible="icon">
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
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <SidebarMenuButton size="lg"
                                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                <Avatar class="h-8 w-8 rounded-lg">
                                    <AvatarImage :src="avatarUrl" :alt="currentUser.username" />
                                    <AvatarFallback class="rounded-lg">
                                        {{ initials }}
                                    </AvatarFallback>
                                </Avatar>
                                <div class="grid flex-1 text-left text-sm leading-tight">
                                    <span class="truncate font-semibold">{{ currentUser.name }}</span>
                                    <span class="truncate text-xs">{{ currentUser.username }}</span>
                                </div>
                                <Icon icon="lucide:chevrons-up-down" class="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side="bottom" align="end" :side-offset="4">
                            <DropdownMenuLabel class="p-0 font-normal">
                                <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar class="h-8 w-8 rounded-lg">
                                        <AvatarImage :src="avatarUrl" :alt="currentUser.username" />
                                        <AvatarFallback class="rounded-lg">
                                            {{ initials }}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div class="grid flex-1 text-left text-sm leading-tight">
                                        <span class="truncate font-semibold">{{ currentUser.name }}</span>
                                        <span class="truncate text-xs">{{ currentUser.username }}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Icon icon="lucide:sparkles" />
                                    Upgrade to Pro
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Icon icon="lucide:badge-check" />
                                    Account
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Icon icon="lucide:credit-card" />
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Icon icon="lucide:bell" />
                                    Notifications
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem @click="onLogOutClick">
                                <Icon icon="lucide:log-out" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
</template>