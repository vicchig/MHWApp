import { constructErrorMsgCouldntReadServerResponse, ApiResponse, constructErrorMsgUnableToFetch, constructErrorMsgNoResponse, constructErrorMsgReqError } from './utilities'

export const getData = async (category) => {
    const url = '/data/' + category
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json',
            'Cache-Control': 'private'
        }
    })

    let result = await fetch(request).catch(err => {
        return new ApiResponse(-1, null, constructErrorMsgUnableToFetch(err, url))
    })

    if (result.status === -1) return result
    else if (result.status === 200 || result.status === 304){
        let responseBody = await result.json().catch(err => {
            return new ApiResponse(result.status, null, constructErrorMsgCouldntReadServerResponse(result.status, err, url))
        })
        if (responseBody.errorMsg) return responseBody
        return new ApiResponse(result.status, {dataList: responseBody}, "")
    }
    else{
        return new ApiResponse(result.status, null, constructErrorMsgReqError(result.status, url, result.errMsg))
    }
}