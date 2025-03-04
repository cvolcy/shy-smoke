import type PocketBase from 'pocketbase'; // add the type from pocketbase
import { ClientResponseError, RecordModel, RecordOptions } from 'pocketbase';
import { MAX_FREE_COUNTS } from '~/lib/contants';

export default class UserApiLimitRepository {
    constructor(private pb_admin: PocketBase) {}

    async getApiLimitByUserId(userid: string) { // add the event
        const collection = this.pb_admin.collection('userApiLimit')
        const recordOptions: RecordOptions = {
            fields: 'id,count,user',
        }

        try {
            const record = await collection.getFirstListItem(`user="${userid}"`, recordOptions)
            return record;
        } catch (error) {
            if (error instanceof ClientResponseError && error.status === 404) {
                console.error(`Error getting api limit for user with ID ${userid}:`, error);
                return await collection.create({
                    user: userid,
                    count: 1
                }, recordOptions)
            } else {
                console.error(`Unexpected error getting api limit for user with ID ${userid}:`, error)
            }
            
            return {} as RecordModel
        }
    }

    async increaseApiLimitByUserId(userid: string, amount: number = 1) {
        const collection = this.pb_admin.collection('userApiLimit')

        const apiLimit = await this.getApiLimitByUserId(userid);
        collection.update(apiLimit.id, {
            count: apiLimit.count + amount
        })
    }

    async isApiLimitOk(userid: string): Promise<boolean> {
        if (!userid || !userid.trim())
            return false

        const record = await this.getApiLimitByUserId(userid)

        if (!record || record.count < MAX_FREE_COUNTS) {
            return true
        } else {
            return false
        }
    }
}

