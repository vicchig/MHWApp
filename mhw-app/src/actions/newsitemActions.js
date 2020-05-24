
export const getNewsItemInterval = async (amount, skipAmount) => {
  const url = `/newsitem/getInterval?amnt=${amount}&skip=${skipAmount}`
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
      let body = await res.json()
      return {"status": res.status, "items": body.items, "count": body.count}
    }
    else{
      return {"status": res.status}
    }
  }
  catch(err){
    throw new Error(err)
  }
}





