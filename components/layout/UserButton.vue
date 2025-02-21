<script setup lang="ts">
import { Icon } from '@iconify/vue';
import  { SidebarMenuButton } from '@/components/ui/sidebar';

const { $pb } = useNuxtApp();

defineProps<{
    side?: "left" | "right" | "top" | "bottom" | undefined,
    inSidebar?: Boolean,
}>()

const currentUser = $pb.authStore.record!;
const avatarUrl = $pb.files.getUrl(currentUser, currentUser.avatar, { 'thumb': '40x40' });
const initials = currentUser.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();

function onLogOutClick() {
    $pb.authStore.clear();
    useRouter().push({ name: 'login' })
}
</script>
<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <component :is="inSidebar ? SidebarMenuButton : 'div'" size="lg"
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <slot>
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
                </slot>
            </component>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" :side="side"
            align="end" :side-offset="4">
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
</template>