import UserApiLimitRepository from "../repositories/userapilimit.repository"
import getSubscription from '../api/subscription/index.get'

const generatorsRoutes = [
    "/api/code",
    "/api/conversation",
    "/api/image",
    "/api/music",
    "/api/video",
]
export default defineEventHandler(async (event) => {
    const { pathname } = getRequestURL(event)

    // check if the server route is in the (generators) folder
    if (pathname && generatorsRoutes.includes(pathname)) {
        const { $userApiLimitRepository } = event.context as { $userApiLimitRepository: UserApiLimitRepository }
        
        if (!event.context?.auth.isValid)
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized',
                message: 'Unauthorized Access',
                stack: ""
            });
        
        const creditAvailables = await $userApiLimitRepository.isApiLimitOk(event.context.auth.record.id)
        const { isValid } = await getSubscription(event)
        
        if (isValid !== true && !creditAvailables) {
            throw createError({
                statusCode: 403,
                statusMessage: "Forbidden",
                message: "No credit available",
                stack: ""
            })
        }

        event.node.res.on("finish", async () => {
            if (isValid !== true)
                await $userApiLimitRepository.increaseApiLimitByUserId(event.context.auth.record.id)
        })
    }
})