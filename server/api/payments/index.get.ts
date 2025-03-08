import { useRequestURL } from "nuxt/app";
import PaymentsService from "~/server/services/payments.service";

export interface Product {
    id: string,
    icon: string,
    iconColor: string,
    bgColor: string,
    to: string,
    disabled?: boolean,
}

export default defineEventHandler(async (event) => {
    if (!event.context?.auth.isValid)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Unauthorized Access',
            stack: ""
        });

        
    try {
        const { $paymentsService } = event.context as { $paymentsService: PaymentsService }
        const { id: userId } = event.context.auth.record;

        const return_url = `${event.node.req.headers['x-forwarded-proto']}://${event.node.req.headers.host}/settings`;        
        const userSessionURL = await $paymentsService.getProviderSessionUrlByUserId(userId, event.context.auth.record, { return_url })

        if (userSessionURL) {
            return userSessionURL as string
        }

        return return_url
    } catch (error) {
        throw createError({
            status: 500,
            data: error,
            stack: ""
        })
    }
})