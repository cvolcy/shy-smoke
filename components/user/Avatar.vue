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

const useCurrentUser = computed(() => !props.url || !props.username || !props.initials)

const _avatarUrl = computed(() => useCurrentUser.value ? $pb.files.getURL(currentUser, currentUser.avatar, { 'thumb': '40x40' }) : props.url)
const _username = computed(() => useCurrentUser.value ? currentUser.username : props.username)
const _initials = computed(() => useCurrentUser.value ? currentUser.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase() : props.initials)
debugger;
</script>
<template>
    <Avatar class="h-8 w-8 rounded-lg">
        <AvatarImage :src="_avatarUrl!" :alt="_username" />
        <AvatarFallback class="rounded-lg">
            {{ _initials }}
        </AvatarFallback>
    </Avatar>
</template>