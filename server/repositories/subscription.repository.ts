import type PocketBase from 'pocketbase'; // add the type from pocketbase
import { RecordOptions } from 'pocketbase';
import { Subscription } from '../services/payments.service';

export interface SubscriptionRecord {
    id: string,
    providerCustomerId?: string,
    providerCurrentPeriodEnd?: string,
    providerPriceId?: string,
    providerSubscriptionId?: string,
    created: string,
    updated: string,
    user: string,
}

export default class SubscriptionRepository {
    constructor(private pb_admin: PocketBase) {}

    async getSubscriptionByUserId(userid: string) {
        const collection = this.pb_admin.collection('subscription')
        const recordOptions: RecordOptions = {
            fields: 'id,providerCustomerId,providerCurrentPeriodEnd,providerPriceId,providerSubscriptionId,created,updated,user'
        }

        try {
            return await collection.getFirstListItem<SubscriptionRecord>(`user="${userid}"`, recordOptions)
        } catch (error) {
            return null
        }
    }

    async Add(subscription: Subscription) {
        return await this.pb_admin.collection('subscription').create<SubscriptionRecord>({
            providerCustomerId: subscription.providerCustomerId,
            providerCurrentPeriodEnd: subscription.providerCurrentPeriodEnd,
            providerPriceId: subscription.providerPriceId,
            providerSubscriptionId: subscription.providerSubscriptionId,
            user: subscription.userId
        })
    }

    async getSubscriptionBySubscriptionId(subscriptionId: string) {
        const collection = this.pb_admin.collection('subscription')
        const recordOptions: RecordOptions = {
            fields: 'id,providerSubscriptionId'
        }

        try {
            return await collection.getFirstListItem<{id: string}>(`providerSubscriptionId="${subscriptionId}"`, recordOptions)
        } catch (error) {
            return null
        }
    }

    async updateProviderDataBySubscriptionId(subscriptionId: string, data: any) {
        const subscriptionRecord = await this.getSubscriptionBySubscriptionId(subscriptionId)
        if (!subscriptionRecord)
            return null

        const { id } = subscriptionRecord

        return await this.pb_admin.collection('subscription').update(id, data)
    }
}

