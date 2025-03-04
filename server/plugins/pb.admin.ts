import PocketBase from 'pocketbase';
import bootstrapRepositoriesDepencies from './repositories.di';

export default defineNitroPlugin(async (nitroApp) => {
    const config = useRuntimeConfig();
    const pb_admin = new PocketBase(config.public.BACKENDBASE_URL);
    // TODO: added catch for that kind of error on queries
    pb_admin.autoCancellation(false);

    try {
        const admin = await pb_admin.collection('_superusers').authWithPassword(config.BACKENDBASE_ADMIN_USER, config.BACKENDBASE_ADMIN_PASS)

        if (!pb_admin.authStore.isValid || !pb_admin.authStore.isSuperuser) {
            throw `Error in admin auth : \n ${JSON.stringify(admin)}`
        }
    } catch (error) {
        // clear the auth store on failed refresh
        console.error(error)
        pb_admin.authStore.clear();
    }

    nitroApp.hooks.hook("request", (event) => {
        event.context.$pb_admin = pb_admin
    });

    bootstrapRepositoriesDepencies(nitroApp, pb_admin)
});