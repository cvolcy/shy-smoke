import Stripe from "stripe"
import PaymentsService from "~/server/services/payments.service"

export default defineEventHandler(async (event) => {
    const { $paymentsService } = event.context as { $paymentsService: PaymentsService }
    const body = await readRawBody(event)    
    const signature = getHeader(event, 'Stripe-Signature')

    if (!signature)
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing some headers'
        })

    let sEvent: Stripe.Event;
    try {
        sEvent = $paymentsService.getConstructEvent(body as string, signature)

        const session = sEvent.data.object as Stripe.Checkout.Session

        if (sEvent.type === 'checkout.session.completed') {
            const subscription = await $paymentsService.getProviderSessionBySubscriptionId(session.subscription as string)

            if (!session?.metadata?.userId) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'userId is required'
                })
            }

            await $paymentsService.createSubscription({
                userId: session.metadata.userId,
                providerCustomerId: subscription.customer as string,
                providerCurrentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
                providerPriceId: subscription.items.data[0].price.id,
                providerSubscriptionId: subscription.id,
            })
        }

        if (sEvent.type === 'invoice.payment_succeeded') {
            const subscription = await $paymentsService.getProviderSessionBySubscriptionId(session.subscription as string)

            await $paymentsService.updateProviderDataBySubscriptionId(subscription.id as string, {
                providerPriceId: subscription.items.data[0].price.id,
                providerCurrentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
            })
        }
    } catch(error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message
        })
    }

    setResponseStatus(event, 200)
})