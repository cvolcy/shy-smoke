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
        const { prompt, style } = body

        if (!prompt)
            throw createError({
                statusCode: 400,
                statusMessage: '`prompt` param is required',
            });

        const input = {
            alpha: 0.5,
            prompt_a: prompt,
            prompt_b: style || "90's rap",
            denoising: 0.75,
            seed_image_id: "vibes",
            num_inference_steps: 40
        };
        
        const response = (await client.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input,
                wait: {
                    mode: 'block',
                    timeout: 30
                }
            }
        )) as { audio: ReadableStream, spectrogram: ReadableStream };

        return { 
            audio: await ReadableStreamToDataUrlAsync(response.audio),
            spectrogram: await ReadableStreamToDataUrlAsync(response.spectrogram, 'image/jpeg'),
        };

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