import UserApiLimitRepository from "../repositories/userapilimit.repository"

const generatorsRoutes = [
    "/api/code",
    "/api/conversation",
    "/api/image",
    "/api/music",
    "/api/video",
]
export default defineEventHandler(async (event) => {
    console.log('New request: ' + getRequestURL(event))

    // check if the server route is in the (generators) folder
    if (event.node.req.url && generatorsRoutes.includes(event.node.req.url)) {        
        const { $userApiLimitRepository } = event.context as { $userApiLimitRepository: UserApiLimitRepository }
        
        if (!event.context?.auth.isValid)
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized Access',
                stack: ""
            });
        
        const creditAvailables = await $userApiLimitRepository.isApiLimitOk(event.context.auth.record.id)
        
        if (!creditAvailables) {
            throw createError({
                statusCode: 403,
                statusMessage: "No credit available",
                stack: ""
            })
        }

        event.node.res.on("finish", async () => { 
            await $userApiLimitRepository.increaseApiLimitByUserId(event.context.auth.record.id)
        })
    }
})