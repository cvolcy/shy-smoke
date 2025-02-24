<script setup lang="ts">
const { data: product } = await useFetch(`/api/products/conversation`)
</script>
<template>
    <div class="container">
        <LayoutHeading
            :title="product!.label"
            :description="product!.description"
            :bg-color="product!.bgColor"
            :icon="product!.icon"
            :icon-color="product!.iconColor"
        />
        <div class="px-4 lg:px-8">

        </div>
    </div>
</template>