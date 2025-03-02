import OpenAIApi from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

let client: OpenAIApi;

export default defineEventHandler(async (event) => {
    if (!event.context?.auth.isValid)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized Access',
        });
    
    if (!client) {
        const config = useRuntimeConfig(event)
        
        if (!config.OPENAI_API_KEY)
            throw createError({
                statusCode: 500,
                statusMessage: 'Unconfigured API KEY for conversation',
            });
            
        client = new OpenAIApi({
            apiKey: config.OPENAI_API_KEY
        });
    }

    try {
        const body = await readBody(event)

        const insctructMsg: ChatCompletionMessageParam = {
            role: 'system',
            content: `
                You are a programming code generator.
                You must answer only in code snippets formatted for a markdown.
                Add code comments in your explanations when necessary.`
        }

        const { messages } = body

        if (!messages)
            throw createError({
                statusCode: 400,
                statusMessage: '`messages` param is required',
            });
        
        const response = await client.chat.completions.create({
            messages: [insctructMsg, ...messages] as ChatCompletionMessageParam[],
            model: 'gpt-3.5-turbo'
        })

        return response.choices.map(x => x.message);

    } catch (error: any) {
        console.log("Code Error", error);
        throw createError({
            statusCode: 500,
            statusMessage: error?.message
        })
    }
})