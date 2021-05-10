export const fetchProducts = (data) => {
    return {
        type: 'FETCH_PRODUCTS',
        payload: data
    };
};