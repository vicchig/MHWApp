import { constructErrorMsgCouldntReadServerResponse, constructErrorMsgNoResponse, ApiResponse, constructErrorMsgReqError, constructErrorMsgUnableToFetch } from './utilities'


const processResponse = async (req) => {
  const res = await fetch(req).catch(err => {
    return new ApiResponse(-1, null, constructErrorMsgNoResponse(err, req.url))
  })
  if (res.errorMsg !== undefined) return res

  if(res.status !== 200) {
    const responseBody = await res.json().catch(err => {
      return new ApiResponse(res.status, null, constructErrorMsgCouldntReadServerResponse(res.status, err, req.url))
    })
    if (responseBody.errorMsg !== undefined) return responseBody
    return new ApiResponse(res.status, null, constructErrorMsgReqError(res.status, req.url, responseBody.errMsg))
  }
  return new ApiResponse(res.status, null, "")
}

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
  if (res.errorMsg !== undefined) return res

  if(res.status === 200){
    let parsedResponse = await res.json().catch(err => {
      return new ApiResponse(res.status, null, constructErrorMsgCouldntReadServerResponse(err, url))
    })
    if (parsedResponse.errorMsg !== undefined) return parsedResponse

    return new ApiResponse(res.status, {"items": parsedResponse.items, "count": parsedResponse.count}, "")
  }
  else{
    return new ApiResponse(res.status, null, constructErrorMsgReqError(res.status, url))
  }
}

export const deleteNewsItem = async (id) => {
  const url = '/newsitem/delete/'+id
  const req = new Request(url, {
    method: 'DELETE', 
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      }
  })

  return await processResponse(req).catch(err => {
    return new ApiResponse(-1, null, constructErrorMsgUnableToFetch(err, url))
  })
}

export const updateItem = async (id, text) => {
  const url = "/newsitem/update/"+id
  const req = new Request(url, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: text})
  })

  return await processResponse(req).catch(err => {
    return new ApiResponse(-1, null, constructErrorMsgUnableToFetch(err, url))
  })
}

export const createItem = async (text) => {
  let url
  let req

  url = '/newsitem/index'
  const reqForId = new Request(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
  })

  let maxID = -1
  const res = await fetch(reqForId).catch(err => {
    return new ApiResponse(-1, null, constructErrorMsgUnableToFetch(err, url))
  })
  if (res.errorMsg !== undefined) return res
  if (res.status === 200){
    let responseBody = await res.json().catch(err => {
      return new ApiResponse(-1, null, constructErrorMsgCouldntReadServerResponse(res.status, err, url))
    })
    if (responseBody.errorMsg !== undefined) return responseBody
    else maxID = responseBody[0].id + 1
  }
  else return new ApiResponse(res.status, null, constructErrorMsgCouldntReadServerResponse(res.status, "", url))

  url = 'newsitem/create'
  req = new Request(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: text, id: maxID})
  })

  return await processResponse(req).catch(err => {
    return new ApiResponse(-1, null, constructErrorMsgUnableToFetch(err, url))
  })
}



