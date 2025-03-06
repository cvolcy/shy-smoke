import { H3Error } from 'h3';

export default defineNuxtPlugin((nuxtApp) => {
    const { isOpen } = useProSub()
    nuxtApp.hook('app:mounted', () => {
        globalThis.$fetch = new Proxy(globalThis.$fetch, {
          apply(target, thisArg, args) {
            const [url, options] = args;
            const originalOnResponse = options?.onResponseError
            const newOptions = {
              ...options,
              onResponseError(error: any) {
                originalOnResponse && originalOnResponse(error)

                if (error.response.status === 403
                    && error.response._data
                    && error.response._data.message === 'No credit available'
                ) {
                    isOpen.value = true
                }
              }
            }
            return target.apply(thisArg, [url, newOptions]);
          }
        });
      });
});