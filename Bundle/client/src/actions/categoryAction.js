export const fetchCategories = (data) => {
    return {
        type: 'FETCH_CATEGORIES',
        payload: data
    };
};