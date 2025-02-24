import getProducts from './index.get';

export default defineEventHandler((event) => {
    const productId = getRouterParam(event, 'productId');
    if (!productId || !productId.trim())
        throw createError({
            statusCode: 400,
            statusMessage: 'invalid or missing product ID'
        });

    const products = getProducts(event);
    const product = products.find(x => x.id == productId);

    if (!product)
        throw createError({
            statusCode: 404,
            statusMessage: 'Product not found'
        });

    return product!
})