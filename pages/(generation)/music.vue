<script setup lang="ts">
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate'

definePageMeta({
    validate: async (_) => {
    const { data } = await useFetch(`/api/products/music`)
    return !!data.value;
}
})

const { data: product } = await useFetch(`/api/products/music`)

const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Prompt is required."
    }),
    style: z.string().optional()
})

const form = useForm({
    validationSchema: toTypedSchema(formSchema)
})
const { isSubmitting } = form

const music = ref<string|null>("")

const onSubmit = form.handleSubmit(async (values: z.infer<typeof formSchema>) => {
    try {
        music.value = null;

        const { data } = await useFetch<string>('/api/music', {
            method: 'POST',
            body: values,
            transform: (input: any) => {
                return input.audio;
            }
        })

        music.value = data.value;

        form.resetForm()
    } catch (error: any) {
        console.log(error);
    } finally {
        await refreshNuxtData('/api/counter')
    }

    isSubmitting.value = false;

    return false;
})
</script>
<template>
    <div class="container">
        <LayoutHeading
            :title="$t(`products.${product!.id}.label`)"
            :description="$t(`products.${product!.id}.description`)"
            :bg-color="product!.bgColor"
            :icon="product!.icon"
            :icon-color="product!.iconColor"
        />
        <div class="px-4 lg:px-8">
            <div>
                <form
                    class="rounded-md border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                    @submit.prevent.stop="onSubmit"
                >
                    <FormField
                        v-slot="{ componentField }"
                        name="prompt"
                    >
                        <FormItem class="col-span-12 lg:col-span-10">
                            <FormLabel>Prompt</FormLabel>
                            <FormControl class="m-0 p-0">
                                <Input
                                    class="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    type="text"
                                    placeholder="Piano solo 🎵🎵"
                                    v-bind="componentField"
                                    :disabled="isSubmitting"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField
                        v-slot="{ componentField }"
                        name="style"
                    >
                        <FormItem class="col-span-12">
                            <FormLabel>Style</FormLabel>
                            <FormControl class="m-0 p-0">
                                <Input
                                    class="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    type="text"
                                    placeholder="90's rap"
                                    v-bind="componentField"
                                    :disabled="isSubmitting"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <Button
                        class="col-span-12 md:col-span-4 lg:col-span-2 self-end"
                        :disabled="isSubmitting"
                    >
                        Generate
                    </Button>
                </form>
            </div>
            <div class="space-y-4 mt-4">
                <div
                    v-if="isSubmitting"
                    class="p-8 rounded-lg w-full flex items-center justify-center bg-muted"
                >
                    <Loader />
                </div>
                <div v-if="!music && !isSubmitting">
                    <Empty label="No music generated yet" fill="#10b981" />
                </div>
                <div
                    v-if="music"
                    class=""
                >
                    <audio controls class="w-full mt-8">
                        <source :src="music" />
                    </audio>
                </div>
            </div>
        </div>
    </div>
</template>