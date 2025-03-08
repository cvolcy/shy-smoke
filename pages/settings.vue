<script setup lang="ts">

const { data: subscription } = useFetch('/api/subscription')
</script>
<template>
    <div class="container">
        <LayoutHeading
            :title="$t(`settings.title`)"
            :description="$t(`settings.description`)"
            :icon="$t(`settings.icon`)"
            bg-color="bg-gray-700/10"
            icon-color="text-gray-700"
        />
        <div class="px-4 lg:px-8 space-y-4">
            <div class="text-muted-foreground text-sm">
                <span v-if="subscription?.isValid">
                    {{ $t(`subscription.pro.message`) }}
                </span>
                <span v-else>
                    {{ $t(`subscription.free.message`) }}
                </span>
            </div>
        </div>
    </div>
</template>