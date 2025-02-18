export default defineNuxtRouteMiddleware((to, from) => {
    const { $pb } = useNuxtApp()

    if (to?.meta?.allowAnonymous || to.path.startsWith('/api')) {
        return;
    }

    // if token doesn't exist redirect to log in
    if (!$pb.authStore.isValid) {
        abortNavigation();
        return navigateTo({ name: 'login', query: { redirect_url: from.path }});
    }
});