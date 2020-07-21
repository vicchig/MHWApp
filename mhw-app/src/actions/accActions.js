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
                  console.log("No user currently logged in.")
                  app.setState({ loggedInUser: null })
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

  export const login = async (context, usernameIn, passwordIn) => {
      const req = new Request('/log_in',{
        method: 'POST',
        body: JSON.stringify({username: usernameIn, password: passwordIn}),
        headers: {
            Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
        }
      })

      let result = null
      try{
        result = await fetch(req)
        if(result.status === 200){
          result.json().then(res => {
            if(res){
              context.setState({loggedInUser: res._id})
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
        Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
      }
    })

    let res = await fetch(req)
    return res.status
  }