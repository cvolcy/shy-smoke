import Replicate from 'replicate'

let client: Replicate;

export default defineEventHandler(async (event) => {
    if (!event.context?.auth.isValid)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized Access',
        });
    
    if (!client) {
        const config = useRuntimeConfig(event)
        
        if (!config.REPLICATE_API_TOKEN)
            throw createError({
                statusCode: 500,
                statusMessage: 'Unconfigured API KEY for conversation',
            });
            
        client = new Replicate({
            auth: config.REPLICATE_API_TOKEN
        });
    }

    try {
        const body = await readBody(event)
        const { prompt, negative } = body

        if (!prompt)
            throw createError({
                statusCode: 400,
                statusMessage: '`prompt` param is required',
            });

        const input = {
            fps: 12,
            model: "xl",
            prompt: prompt,
            batch_size: 1,
            num_frames: 23,
            init_weight: 0.5,
            guidance_scale: 17.5,
            negative_prompt: negative || "very blue, dust, noisy, washed out, ugly, distorted, broken",
            remove_watermark: false,
            num_inference_steps: 25
        };
        
        const response = (await client.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input
            }
        )) as Array<ReadableStream>;
        
        return Promise.all(response.map(async x => await ReadableStreamToDataUrlAsync(x, 'video/mp4')))

    } catch (error: any) {
        console.log("Music Error", error);
        throw createError({
            statusCode: 500,
            statusMessage: error?.message
        })
    }  
})

async function ReadableStreamToDataUrlAsync(stream: ReadableStream, mimeType: string = 'audio/wav'): Promise<string> {
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    let totalLength = 0;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const buffer = Buffer.from(value, 'base64'); 
        chunks.push(buffer);
        totalLength += buffer.length;
    }

    const result = Buffer.concat(chunks, totalLength);
    const base64String = result.toString('base64');
    return `data:${mimeType};base64,${base64String}`;
}