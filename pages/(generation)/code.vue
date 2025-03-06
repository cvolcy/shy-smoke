<script setup lang="ts">
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate'
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { cn } from '@/lib/utils';
import VueMarkdown from 'vue-markdown-render'

definePageMeta({
  validate: async (_) => {
    const { data } = await useFetch(`/api/products/code`)
    return !!data.value;
  }
})

const { data: product } = await useFetch(`/api/products/code`)

const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Prompt is required."
    })
})

const form = useForm({
    validationSchema: toTypedSchema(formSchema)
})
const { isSubmitting } = form

const messages = ref<ChatCompletionMessageParam[]>([])

const onSubmit = form.handleSubmit(async (values: z.infer<typeof formSchema>) => {
    try {
        const userMessage: ChatCompletionMessageParam = {
            role: 'user',
            content: values.prompt
        }

        const newMessages = [...messages.value, userMessage]

        const { data } = await useFetch<ChatCompletionMessageParam[]>('/api/code', {
            method: 'POST',
            body: {
                messages: newMessages
            },
            transform: (input: ChatCompletionMessageParam[]) => {
                return input.map(x => ({
                    role: x.role,
                    content: x.content
                }) as ChatCompletionMessageParam);
            }
        })

        messages.value = [...newMessages, ...data.value!]

        form.resetForm()
    } catch (error: any) {
        console.log(error);
    } finally {
        await refreshNuxtData('/api/counter')
    }

    return false;
})

const md = ref<Array<typeof VueMarkdown>>([])
const mdPlugin = (mdInstance: any) => {
    mdInstance.options.highlight = function(str: string, lang: string) {
        // @ts-ignore
        return '<pre class="overflow-x-auto flex-grow min-w-0 full my-2 bg-black/10 rounded-lg p-2"><code class="bg-black/10 rounded-lg p-1">' + mdInstance.utils.escapeHtml(str) + '</code></pre>';
    }
}
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
                            <FormControl class="m-0 p-0">
                                <Input
                                    class="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    type="text"
                                    placeholder="Simple toggle button using vuejs"
                                    v-bind="componentField"
                                    :disabled="isSubmitting"
                                />
                            </FormControl>
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
                    class="p-8 rounded-lg w-full flex items-center justify-center bg-muted"
                >
                    <Loader />
                </div>
                <div v-if="messages.length === 0 && !isSubmitting">
                    <Empty label="No code generated" fill="#22c55e" />
                </div>
                <div class="flex flex-col-reverse gap-y-4">
                    <div
                        v-for="message in messages"
                        :key="message.content?.toString()"
                        :class="cn(
                            'p-8 w-full flex items-start gap-x-8 rounded-lg',
                            message.role === 'user'
                            ? 'bg-white border border-black/10 text-slate-800 flex-row-reverse' : 'bg-muted'
                        )"
                    >
                        <UserAvatar v-if="message.role === 'user'" />
                        <UserAvatar
                            v-else
                            initials="BOT"
                            username="bot"
                            url="/logo-reverse.svg"
                        />
                        <p v-if="message.role === 'user'" class="text-sm self-center">
                            {{ message.content }}
                        </p>
                        <VueMarkdown
                            v-else
                            ref="md"
                            class="text-sm w-1 flex-grow overflow-hidden leading-7"
                            :source="message.content"
                            :plugins="[mdPlugin]"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>