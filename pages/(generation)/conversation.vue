<script setup lang="ts">
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate'

const { data: product } = await useFetch(`/api/products/conversation`)

const formSchema = toTypedSchema(z.object({
    prompt: z.string().min(1, {
        message: "Prompt is required."
    })
}))

const form = useForm({
    validationSchema: formSchema
})

async function onSubmit (values: z.infer<any>) {
    console.log(values);
}
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
                    @submit="form.handleSubmit(onSubmit)"
                >
                    <FormField
                        v-slot="{ componentField }"
                        name="prompt"
                    >
                        <FormItem class="col-span-12 lg:col-span-10">
                            <FormControl class="m-0 p-0">
                                <Input
                                    class="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    type="text"
                                    placeholder="What is the One piece ?"
                                    v-bind="componentField"
                                    :disabled="form.isSubmitting"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <Button
                        class="col-span-12 md:col-span-4 lg:col-span-2"
                        :disabled="form.isSubmitting"
                    >
                        Generate
                    </Button>
                </form>
            </div>
            <div class="space-y-4 mt-4">
                Messages Content
            </div>
        </div>
    </div>
</template>