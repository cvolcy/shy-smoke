<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { $pb } = useNuxtApp();

const currentUser = $pb.authStore.record!;
const avatarUrl = $pb.files.getURL(currentUser, currentUser?.avatar, { 'thumb': '40x40' });
const initials = currentUser?.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
</script>
<template>
    <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
        <ClientOnly>
            <div class="flex items-center gap-2 px-4">
                <SidebarTrigger class="h-12 w-12 [&_svg]:size-5" />
            </div>
        </ClientOnly>
        <div class="flex w-full justify-end px-2">
            <LayoutLocaleSwitcher
                class="mr-4"
            />
            <UserButton>
                <Button variant="ghost" size="icon">
                    <Avatar class="h-8 w-8 rounded-lg">
                        <AvatarImage :src="avatarUrl" :alt="currentUser?.username" />
                        <AvatarFallback class="rounded-lg">
                            {{ initials }}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </UserButton>
        </div>
    </header>
</template>