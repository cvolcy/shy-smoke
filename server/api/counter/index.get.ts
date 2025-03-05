import UserApiLimitRepository from "~/server/repositories/userapilimit.repository";

export default defineEventHandler(async (event) => {if (!event.context?.auth.isValid)
    if (!event.context?.auth.isValid)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Unauthorized Access',
            stack: ""
        });

    
    const { $userApiLimitRepository } = event.context as { $userApiLimitRepository: UserApiLimitRepository }

    return await $userApiLimitRepository.getApiLimitByUserId(event.context.auth.record.id)
})