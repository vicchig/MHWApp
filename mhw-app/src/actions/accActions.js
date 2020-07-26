import { constructErrorMsgCouldntReadServerResponse, ApiResponse, constructErrorMsgNoResponse, constructErrorMsgReqError } from './utilities'

export const getUserById = async (idIn) => {
    const url = '/users/findUserByID/'+idIn
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
      let responseBody = await res.json().catch((err) => {
        return new ApiResponse(res.status, null, constructErrorMsgCouldntReadServerResponse(err, url))
      })
      if (responseBody.errorMsg !== undefined) return responseBody
      return new ApiResponse(res.status, {user_id: responseBody.currentUser.id}, "")
    }
    else{
      return new ApiResponse(res.status, null, constructErrorMsgReqError(res.status, url))
    }
}

  
  
  export const readCookie = (app) => {
    const url = "/users/check-session";
  
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
              getUserById(json.currentUser).then((res) => {
                if(!res){
                  console.log("No user currently logged in.")
                  app.setState({ loggedInUser: null })
                }
                else{
                  app.setState({ loggedInUser: res.data.user_id});
                }
              })
            }
        })
        .catch(error => {
            console.log(error);
        });
  };

  export const login = async (context, usernameIn, passwordIn) => {
      const req = new Request('/log_in',{
        method: 'POST',
        headers: {
            Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
            Authorization: " Basic " + new Buffer(usernameIn + ":" + passwordIn).toString("base64")
        }
      })

      let result = null
      try{
        result = await fetch(req)
        if(result.status === 200){
          result.json().then(res => {
            if(res){
              context.setState({loggedInUser: res.user.id})
            }
            else{
              console.log("User was not retrieved properly.\n")
            }
          }, rej => {
            console.log("Promise rejected.\n")
            console.log(rej)
          })
        }
      }
      catch(err){
        console.log("An error occurred during account retrieval.\n")
        console.log(err)
      }
      finally{
        return {status: result.status}
      }
  }

  export const logOut = async () => {
    const req = new Request('/logout', {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain",
                "Content-Type": "application/json"
      }
    })

    let res = await fetch(req).catch( err => {
      return new ApiResponse(-1, null, constructErrorMsgNoResponse(err, '/users/logout'))
    })
    if(res.errorMsg !== undefined) return res
    return new ApiResponse(res.status, null, "")
  }