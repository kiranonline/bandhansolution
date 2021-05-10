export const loading = (data:any) => {
    return {
        type: 'LOADING',
        payload : data
    };
};

export const openToast = (data:any) => {
    return {
        type: 'START_TOAST',
        payload : data
    };
};

export const closeToast = (data:any) => {
    return {
        type: 'STOP_TOAST'
    };
};