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

const processErrorWNav = (context, status, msg) => {
    if(status < 0) context.props.history.push('/unknownError')
    else context.props.history.push(`/${status}`)
    console.error(msg)
}

const constructErrorMsgReqError = (status, url) => {
    return `${REQUEST_ERROR}\n Request: ${url} \n\n returned status ${status}`
}

const constructErrorMsgNoResponse = (err, url) => {
    return `${NO_RESPONSE}\n Request: ${url} \n ${err}`
}

const constructErrorMsgCouldntReadServerResponse = (err, url) => {
    return `${COULD_NOT_READ_SERVER_RESPONSE} \n Request: ${url} \n ${err}`
}



export {ApiResponse, COULD_NOT_READ_SERVER_RESPONSE, REQUEST_ERROR, NO_RESPONSE, processErrorWNav, constructErrorMsgReqError, constructErrorMsgNoResponse, constructErrorMsgCouldntReadServerResponse}