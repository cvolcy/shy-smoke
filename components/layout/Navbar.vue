<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { $pb } = useNuxtApp();

const currentUser = $pb.authStore.record!;
const avatarUrl = $pb.files.getURL(currentUser, currentUser.avatar, { 'thumb': '40x40' });
const initials = currentUser.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
</script>
<template>
    <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
        <div class="flex items-center gap-2 px-4">
            <Button :variant="null">
                <SidebarTrigger />
            </Button>
        </div>
        <div class="flex w-full justify-end px-2">
            <UserButton>
                <Button variant="ghost" size="icon">
                    <Avatar class="h-8 w-8 rounded-lg">
                        <AvatarImage :src="avatarUrl" :alt="currentUser.username" />
                        <AvatarFallback class="rounded-lg">
                            {{ initials }}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </UserButton>
        </div>
    </header>
</template>