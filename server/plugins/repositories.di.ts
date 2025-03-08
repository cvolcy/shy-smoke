import type { NitroApp } from "nitropack/types";
import type PocketBase from "pocketbase";
import UserApiLimitRepository from "../repositories/userapilimit.repository";
import SubscriptionRepository from "../repositories/subscription.repository";


export default function bootstrapRepositoriesDepencies(nitroApp: NitroApp, pb_admin: PocketBase) {
    const userApiLimitRepository = new UserApiLimitRepository(pb_admin)
    const subscriptionRepository = new SubscriptionRepository(pb_admin)


    nitroApp.hooks.hook("request", (event) => {
        event.context.$userApiLimitRepository = userApiLimitRepository
        event.context.$subscriptionRepository = subscriptionRepository
    });
}