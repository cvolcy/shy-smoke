import OpenAIApi from 'openai';

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
        const { messages } = body

        if (!messages)
            throw createError({
                statusCode: 400,
                statusMessage: '`messages` param is required',
            });
        
        const response = await client.chat.completions.create({
            messages,
            model: 'gpt-3.5-turbo'
        })

        return response.choices.map(x => x.message);

    } catch (error: any) {
        console.log("Conversation Error", error);
        throw createError({
            statusCode: 500,
            statusMessage: error?.message
        })
    }
})