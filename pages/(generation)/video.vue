<script setup lang="ts">
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate'

definePageMeta({
    validate: async (_) => {
        const { data } = await useFetch(`/api/products/video`)
        return !!data.value;
    }
})

const { data: product } = await useFetch(`/api/products/video`)

const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Prompt is required."
    }),
    negative: z.string().optional()
})

const form = useForm({
    validationSchema: toTypedSchema(formSchema),
    initialValues: {
        negative: "very blue, dust, noisy, washed out, ugly, distorted, broken"
    }
})
const { isSubmitting } = form

const video = ref<string|null>("")

const onSubmit = form.handleSubmit(async (values: z.infer<typeof formSchema>) => {
    try {
        video.value = null;

        const { data } = await useFetch<string[]>('/api/video', {
            method: 'POST',
            body: values
        })

        video.value = data.value?.length ? data.value[0] : ""

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
            :title="product!.label"
            :description="product!.description"
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
                                    placeholder="🎥 Clown fish swimming in a coral reef, beautiful, 8k, perfect, award winning, national geographic"
                                    v-bind="componentField"
                                    :disabled="isSubmitting"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField
                        v-slot="{ componentField }"
                        name="negative"
                    >
                        <FormItem class="col-span-12">
                            <FormLabel>Negative Prompt</FormLabel>
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
                <div v-if="!video && !isSubmitting">
                    <Empty label="No video generated yet" fill="#f97316" />
                </div>
                <div
                    v-if="video"
                    class=""
                >
                    <video
                        class="w-full aspect-video rounded-lg border bg-black mt-8"
                        controls
                    >
                        <source :src="video" />
                    </video>
                </div>
            </div>
        </div>
    </div>
</template>