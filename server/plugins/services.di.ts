import type { NitroApp } from "nitropack/types";
import PaymentsService from "../services/payments.service";

export default function bootstrapServicesDepencies(nitroApp: NitroApp) {
    const { STRIPE_API_KEY, STRIPE_WEBHOOK_SECRET } = useRuntimeConfig()
    let paymentsService: PaymentsService|null = null

    nitroApp.hooks.hookOnce("request", (event) => {
        paymentsService = new PaymentsService(STRIPE_API_KEY, STRIPE_WEBHOOK_SECRET, event.context.$subscriptionRepository)
    });

    nitroApp.hooks.hook("request", (event) => {
        event.context.$paymentsService = paymentsService!
    });
}