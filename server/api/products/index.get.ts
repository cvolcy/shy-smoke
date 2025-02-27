export interface Product {
    id: string,
    label: string,
    description: string,
    icon: string,
    iconColor: string,
    bgColor: string,
    to: string,
}

export default defineEventHandler((event) => {
    if (!event.context?.auth.isValid)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized Access',
        });

    return [{
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'lucide:layout-dashboard',
        to: '/',
        iconColor: 'text-sky-500',
        bgColor: 'bg-sky-500/10',
    },{
        id: 'conversation',
        label: 'Conversation',
        description: 'Our most advanced conversation model.',
        icon: 'lucide:message-square-text',
        iconColor: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
        to: '/conversation'
    },{
        id: 'music',
        label: 'Music Generation',
        icon: 'lucide:music',
        iconColor: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        to: '/music'
    },{
        id: 'image',
        label: 'Image Generation',
        icon: 'lucide:image',
        iconColor: 'text-pink-700',
        bgColor: 'bg-pink-700/10',
        to: '/image'
    },{
        id: 'video',
        label: 'Video Generation',
        icon: 'lucide:video',
        iconColor: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        to: '/video'
    },{
        id: 'code',
        label: 'Code Generation',
        description: 'Generate code using descriptive text.',
        icon: 'lucide:code',
        iconColor: 'text-green-500',
        bgColor: 'bg-green-500/10',
        to: '/code'
    }] as Array<Product>;
})