import Stripe from 'stripe'
import SubscriptionRepository, { SubscriptionRecord } from '../repositories/subscription.repository';
import { RecordModel } from 'pocketbase';

export interface Subscription {
    id?: string,
    providerCustomerId?: string,
    providerCurrentPeriodEnd?: Date,
    providerPriceId?: string,
    providerSubscriptionId?: string,
    userId: string,
    created?: string,
    updated?: string,
}

export default class PaymentsService {
    private stripe: Stripe;

    constructor(
        paymentProviderApiKey: string,
        private webhookSecret: string,
        private subscriptionRepository: SubscriptionRepository
    ) {
        this.stripe = new Stripe(paymentProviderApiKey, {
            apiVersion: '2025-02-24.acacia',
            typescript: true
        })
    }

    async getSubscriptionByUserId(userId: string) {
        const subscription = await this.subscriptionRepository.getSubscriptionByUserId(userId)

        if (subscription === null) return null

        return this.mapToSubscription(subscription);
    }

    async getProviderSessionUrlByUserId(userId: string, user: RecordModel, options?: { [name: string] :string }) {
        const subscription = await this.getSubscriptionByUserId(userId)
        if (subscription && subscription.providerCustomerId && options?.hasOwnProperty('return_url')) {
            const providerSession = await this.stripe.billingPortal.sessions.create({
                customer: subscription.providerCustomerId,
                return_url: options['return_url']
            })
            
            return providerSession.url
        }

        const providerSession = await this.stripe.checkout.sessions.create({
            success_url: options?.hasOwnProperty('return_url') ? options['return_url'] : undefined,
            cancel_url: options?.hasOwnProperty('return_url') ? options['return_url'] : undefined,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection: 'auto',
            customer_email: user.email,
            line_items: [{
                price_data: {
                    currency: options?.hasOwnProperty('currency') ? options['currency'] : 'USD',
                    product_data: {
                        name: 'Shy Smoke',
                        description: 'a bunch of credit'
                    },
                    unit_amount: 2000,
                    recurring: {
                        interval: 'month',
                      },
                },
                quantity: 1
            }],
            metadata: {
                userId
            }
        })

        return providerSession.url;
    }

    async getProviderSessionBySubscriptionId(subscriptionId: string) {
        return await this.stripe.subscriptions.retrieve(subscriptionId)
    }

    getConstructEvent(body: string|Buffer, signature: string|Buffer) {
        return this.stripe.webhooks.constructEvent(body, signature, this.webhookSecret)
    }

    createSubscription(subscription: Subscription) {
        return this.subscriptionRepository.Add(subscription)
    }

    async updateProviderDataBySubscriptionId(subscriptionId: string, data: any) {
        return await this.subscriptionRepository.updateProviderDataBySubscriptionId(subscriptionId, data)
    }

    private mapToSubscription(record: SubscriptionRecord) {
        return {
            id: record.id,
            providerCustomerId: record.providerCustomerId,
            providerCurrentPeriodEnd: !!record.providerCurrentPeriodEnd ? new Date(Date.parse(record.providerCurrentPeriodEnd)) : undefined,
            providerPriceId: record.providerPriceId,
            providerSubscriptionId: record.providerSubscriptionId
        } as Subscription
    }
}

