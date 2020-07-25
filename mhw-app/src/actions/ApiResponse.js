const COULD_NOT_READ_SERVER_RESPONSE = 'Could not read server response.'
const REQUEST_ERROR = 'This request returned an error in its response: '
const NO_RESPONSE = 'Something went wrong while waiting for server response.'

class ApiResponse {

    constructor(responseStatus, data, errorMsg){
        this.status = responseStatus
        this.data = data
        this.errorMsg = errorMsg
    }
}

export {ApiResponse, COULD_NOT_READ_SERVER_RESPONSE, REQUEST_ERROR, NO_RESPONSE}