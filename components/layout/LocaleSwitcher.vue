<script setup lang="ts">

const { locale, locales, setLocale } = useI18n()
function updateLocale(lang: any) {
    setLocale(lang)
}
</script>
<template>
    <div class="locale-switcher">
        <Select
            :default-value="locale"
            @update:modelValue="updateLocale"
        >
            <SelectTrigger class="w-[120px]">
                <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem
                        v-for="l in locales"
                        :key="l.code"
                        :value="l.code"
                    >
                        {{ l.name }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
</template>
