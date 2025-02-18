import PocketBase from 'pocketbase';

export default defineNitroPlugin(async (nitroApp) => {
    const config = useRuntimeConfig();
    const pb_admin = new PocketBase(config.public.BACKENDBASE_URL);
    // TODO: added catch for that kind of error on queries
    pb_admin.autoCancellation(false);

    try {
        const admin = await pb_admin.admins.authWithPassword(config.BACKENDBASE_ADMIN_USER, config.BACKENDBASE_ADMIN_PASS)
        if (!pb_admin.authStore.isValid || !pb_admin.authStore.isAdmin) {
            throw `Error in admin auth : \n ${JSON.stringify(admin)}`
        }
    } catch (_) {
        // clear the auth store on failed refresh
        pb_admin.authStore.clear();
    }

    nitroApp.hooks.hook("request", (event) => {
        event.context.$pb_admin = pb_admin
    });
});