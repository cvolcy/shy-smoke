<script setup lang="ts">
const { $pb } = useNuxtApp();

const props = defineProps<{
    side?: "left" | "right" | "top" | "bottom" | undefined,
    inSidebar?: Boolean,
    url?: string,
    username?: string,
    initials?: string
}>()

const currentUser = $pb.authStore.record!;

const useCurrentUser = computed(() => props.url || props.username || props.initials)

const avatarUrl = computed(() => useCurrentUser ? $pb.files.getURL(currentUser, currentUser.avatar, { 'thumb': '40x40' }) : props.url)
const username = computed(() => useCurrentUser ? currentUser.username : props.username)
const initials = computed(() => useCurrentUser ? currentUser.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase() : props.initials)
</script>
<template>
    <Avatar class="h-8 w-8 rounded-lg">
        <AvatarImage :src="avatarUrl!" :alt="username" />
        <AvatarFallback class="rounded-lg">
            {{ initials }}
        </AvatarFallback>
    </Avatar>
</template>