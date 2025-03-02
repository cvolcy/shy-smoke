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
        const { prompt, amount = 1, resolution = '512x512' } = await readBody(event)

        if (!prompt)
            throw createError({
                statusCode: 400,
                statusMessage: '`prompt` param is required',
            });

        if (!amount)
            throw createError({
                statusCode: 400,
                statusMessage: '`amount` param is required',
            });

        if (!resolution)
            throw createError({
                statusCode: 400,
                statusMessage: '`resolution` param is required',
            });
    
        const response = await client.images.generate({
            prompt,
            n: parseInt(amount),
            size: resolution,
            // model: 'gpt-3.5-turbo'
        })

        return response.data.map(x => x.url);

    } catch (error: any) {
        console.log("Image Error", error);
        throw createError({
            statusCode: 500,
            statusMessage: error?.message
        })
    }
})