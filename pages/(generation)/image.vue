<script setup lang="ts">
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { Icon } from '@iconify/vue'

definePageMeta({
    validate: async (_) => {
        const { data } = await useFetch(`/api/products/image`)
        return !!data.value;
    }
})
const { data: product } = await useFetch(`/api/products/image`)

const formSchema = z.object({
    prompt: z.string().min(1, { message: "Image prompt is required." }),
    amount: z.string().min(1),
    resolution: z.string().min(1),
})

const form = useForm({
    validationSchema: toTypedSchema(formSchema),
    initialValues: {
        prompt: '',
        amount: '1',
        resolution: '512x512',
    },
})

const amountOptions = [
    { label: '1 Photo', value: '1' },
    { label: '2 Photos', value: '2' },
    { label: '3 Photos', value: '3' },
    { label: '4 Photos', value: '4' },
];

const resolutionOptions = [
    { label: '256x256', value: '256x256' },
    { label: '512x512', value: '512x512' },
    { label: '1024x1024', value: '1024x1024' },
];


const { isSubmitting } = form

const images = ref<string[]>([])

const onSubmit = form.handleSubmit(async (values: z.infer<typeof formSchema>) => {
    try {

        images.value = []
        const { data } = await useFetch('/api/image', {
            method: 'POST',
            body: {
                prompt: values.prompt,
                amount: values.amount,
                resolution: values.resolution,
            }
        })

        images.value = data.value! as Array<string>
        form.resetForm()
    } catch (error: any) {
        console.log(error);
    }

    return false;
})

function openImage(image: string) {
    window.open(image, '_blank')
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
                    @submit.prevent.stop="onSubmit"
                >
                    <FormField
                        v-slot="{ componentField }"
                        name="prompt"
                    >
                        <FormItem class="col-span-12 lg:col-span-6">
                            <FormControl class="m-0 p-0">
                                <Input
                                    class="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    type="text"
                                    placeholder="A picture of Eren Yeager in his final form"
                                    v-bind="componentField"
                                    :disabled="isSubmitting"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField
                        v-slot="{ componentField }"
                        name="amount"
                    >
                        <FormItem class="col-span-12 md:col-span-4 lg:col-span-2">
                            <Select
                                class="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                v-bind="componentField"
                                :disabled="isSubmitting"
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an amount" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem v-for="option in amountOptions" :key="option.value" :value="option.value">
                                            {{ option.label }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField
                        v-slot="{ componentField }"
                        name="resolution"
                    >
                        <FormItem class="col-span-12 md:col-span-4 lg:col-span-2">
                            <Select
                                class="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                v-bind="componentField"
                                :disabled="isSubmitting"
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an amount" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem v-for="option in resolutionOptions" :key="option.value" :value="option.value">
                                            {{ option.label }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <Button
                        class="col-span-12 md:col-span-4 lg:col-span-2"
                        :disabled="isSubmitting"
                    >
                        Generate
                    </Button>
                </form>
            </div>
            <div class="space-y-4 mt-4">
                <div
                    v-if="isSubmitting"
                    class="p-20d"
                >
                    <Loader />
                </div>
                <div v-if="images.length === 0 && !isSubmitting">
                    <Empty label="No images generated" fill="#be185d" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                    <Card v-for="image in images" :key="image">
                        <CardContent class="p-0">
                            <div class="relative aspect-square">
                                <img
                                    class="w-full rounded-t-xl"
                                    :src="image"
                                    alt="Generated image"
                                />
                            </div>
                        </CardContent>
                        <CardFooter class="p-2">
                            <Button
                                variant="secondary"
                                class="w-full"
                                @click="openImage(image)"
                            >
                                <Icon icon="lucinde:download" class="w-4 h-4 mr-2" />
                                Download
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>