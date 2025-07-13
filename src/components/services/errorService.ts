export const getErrorMessage = (error: any) => {
    const status = error?.response?.status;

    switch(status){
        case 400:
        return 'Bad request. Please check submitted data';
        case 401:
        return 'Unauthorized. Please log in';
        case 403:
        return 'You do not have permission to perform this action';
        case 404:
        return 'Resource not found';
        case 500:
        return 'Internal server error. Please try again later';
        case 503:
        return 'Server is down. Please try again later';
        default:
        return 'Network failed. Please try again later'
    }
};