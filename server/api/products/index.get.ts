export interface Product {
    id: string,
    icon: string,
    iconColor: string,
    bgColor: string,
    to: string,
    disabled?: boolean,
}

export default defineEventHandler((event) => {
    if (!event.context?.auth.isValid)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Unauthorized Access',
            stack: ""
        });



    let products = [{
        id: 'dashboard',
        icon: 'lucide:layout-dashboard',
        to: '/',
        iconColor: 'text-sky-500',
        bgColor: 'bg-sky-500/10',
    },{
        id: 'conversation',
        icon: 'lucide:message-square-text',
        iconColor: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
        to: '/conversation'
    },{
        id: 'music',
        icon: 'lucide:music',
        iconColor: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        to: '/music',
        disabled: false
    },{
        id: 'image',
        icon: 'lucide:image',
        iconColor: 'text-pink-700',
        bgColor: 'bg-pink-700/10',
        to: '/image',
        disabled: false
    },{
        id: 'video',
        icon: 'lucide:video',
        iconColor: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        to: '/video',
        disabled: true
    },{
        id: 'code',
        icon: 'lucide:code',
        iconColor: 'text-green-500',
        bgColor: 'bg-green-500/10',
        to: '/code'
    }] as Array<Product>;

    const query = getQuery(event)

    if (!query.includeDisabled) {
        products = products.filter(x => !x.disabled)
    }

    return products;
})