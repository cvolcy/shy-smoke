import GetSubscription from '../subscription/index.get'

export interface Product {
    id: string,
    icon: string,
    iconColor: string,
    bgColor: string,
    to: string,
    disabled?: boolean,
    isProSubscriptionRequired?: boolean
}

const products = [{
    id: 'dashboard',
    disabled: false,
    isProSubscriptionRequired: false,
    icon: 'lucide:layout-dashboard',
    to: '/dashboard',
    iconColor: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
},{
    id: 'conversation',
    disabled: false,
    isProSubscriptionRequired: false,
    icon: 'lucide:message-square-text',
    iconColor: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    to: '/conversation'
},{
    id: 'music',
    disabled: false,
    isProSubscriptionRequired: true,
    icon: 'lucide:music',
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    to: '/music',
},{
    id: 'image',
    disabled: false,
    isProSubscriptionRequired: false,
    icon: 'lucide:image',
    iconColor: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    to: '/image',
},{
    id: 'video',
    disabled: false,
    isProSubscriptionRequired: true,
    icon: 'lucide:video',
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    to: '/video',
},{
    id: 'code',
    disabled: false,
    isProSubscriptionRequired: false,
    icon: 'lucide:code',
    iconColor: 'text-green-500',
    bgColor: 'bg-green-500/10',
    to: '/code'
}] as Array<Product>;

export default defineEventHandler(async (event) => {
    if (!event.context?.auth.isValid)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Unauthorized Access',
            stack: ""
        });

    const query = getQuery(event)

    if (!query.includeDisabled) {
        return products.filter(x => !x.disabled)
    }

    return products;
})