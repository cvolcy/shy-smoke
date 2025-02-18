import PocketBase from 'pocketbase';

const COOKIE_PB_AUTH_KEY = 'pb_auth'

export default defineEventHandler(async (event) => {
    const cookies = parseCookies(event)
    const config = useRuntimeConfig(event)
    const pb = new PocketBase(config.public.BACKENDBASE_URL);

    pb.authStore.loadFromCookie(`${COOKIE_PB_AUTH_KEY}=${cookies[COOKIE_PB_AUTH_KEY]}`)
    try {
        // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
        pb.authStore.isValid && await pb.collection('users').authRefresh();

        event.context.$pb = pb
        event.context.auth = pb.authStore
    } catch (_) {
        // clear the auth store on failed refresh
        pb.authStore.clear();
    }
})