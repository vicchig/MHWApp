export const getUserById = async (idIn) => {
    const url = '/users/findUserByID/'+idIn
    const request = new Request(url, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
    });
  
    try{
      const res = await fetch(request)
      if(res.status === 200){
        return await res.json()
      }
      else{
        return null
      }
    }
    catch(err){
      throw new Error(err)
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
                  console.log("Failed to update user from session data.")
                }
                else{
                  app.setState({ loggedInUser: res });
                }
              })
            }
        })
        .catch(error => {
            console.log(error);
        });
  };

  export const login = async (context, username, password) => {
      const req = new Request('/log_in',{
        method: 'POST',
        body: JSON.stringify({username: username, password: password}),
        headers: {
            Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
        }
      })

      let res = null
      try{
        res = await fetch(req)
        if(res.status === 200){
          context.loggedInUser = res.user._id
        }
      }
      catch(err){
        console.log("An error occurred during account retrieval.\n")
        console.log(err)
      }
      finally{
        return {status: res.status}
      }
  }