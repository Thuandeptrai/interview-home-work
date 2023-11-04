const successResponse = (data, message) => {
    return {
        message: message || 'Success',
        data,
    }
};
module.exports = {
    successResponse,
};