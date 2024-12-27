class ResponseModel {
    constructor(status, message, data = null, statusCode = 200) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }

    static success(data, message = 'Success', statusCode = 200) {
        return new ResponseModel('success', message, data, statusCode);
    }

    static error(message = 'Error', data = null, statusCode = 500) {
        return new ResponseModel('error', message, data, statusCode);
    }
}

module.exports = ResponseModel;