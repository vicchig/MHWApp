import { constructErrorMsgCouldntReadServerResponse, constructErrorMsgNoResponse, ApiResponse, constructErrorMsgReqError } from './utilities'


export const getNewsItemInterval = async (amount = 0, skipAmount = 0) => {
  const url = `/newsitem/getInterval?amnt=${amount}&skip=${skipAmount}`
  const request = new Request(url, {
      method: 'GET', 
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      }
  });

  const res = await fetch(request).catch(err => {
    return new ApiResponse(-1, null, constructErrorMsgNoResponse(err, url))
  })
  if(res.status === 200){
    try{
      let parsedResponse = await res.json()
      return new ApiResponse(res.status, {"items": parsedResponse.items, "count": parsedResponse.count}, "")
    }
    catch(err){
      return new ApiResponse(res.status, null, constructErrorMsgCouldntReadServerResponse(err, url))
    }
  }
  else{
    return new ApiResponse(res.status, null, constructErrorMsgReqError(res.status, url))
  }
}





