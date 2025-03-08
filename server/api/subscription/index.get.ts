import { useRequestURL } from "nuxt/app";
import PaymentsService, { Subscription } from "~/server/services/payments.service";

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

        const subscription = await $paymentsService.getSubscriptionByUserId(userId);

        if (!subscription)
            return {
                isValid: false
            } as Subscription & { isValid: boolean }

        return {
            ...subscription,
            isValid: !!(subscription?.providerPriceId && subscription.providerCurrentPeriodEnd?.getTime()! + 86_400_000 > Date.now())
        } as Subscription & { isValid: boolean };

    } catch (error) {
        throw createError({
            status: 500,
            data: error,
            stack: ""
        })
    }
})