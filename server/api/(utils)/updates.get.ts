import { RecordModel } from "pocketbase";

export interface SSEMessage<T> {
    timestamp: number,
    event: string,
    data: T
}

interface StreamClient {
    userId: string,
    stream: ReturnType<typeof createEventStream>
}

let clients: Set<StreamClient> = new Set();

export default defineEventHandler((event) => {
    if (!event.context?.auth.isValid)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Unauthorized Access',
            stack: ""
        });

    setResponseHeader(event, 'Content-Type', 'text/event-stream')
    setResponseHeader(event, 'Cache-Control', 'no-cache')
    setResponseHeader(event, 'Connection', 'keep-alive')

    const currentUser: RecordModel = event.context.auth!;

    const stream = createEventStream(event)

    stream.push(JSON.stringify({
        timestamp: Date.now(),
        event: 'message',
        data: 'Initial connection established'
    } as SSEMessage<string>))

    const streamClient = {
        userId: currentUser.id,
        stream
    }

    clients.add(streamClient)

    stream.onClosed(() => {
        clients.delete(streamClient)
    })

    return stream.send()
});