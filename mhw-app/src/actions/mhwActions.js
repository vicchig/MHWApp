import { constructErrorMsgCouldntReadServerResponse, constructErrorMsgNoResponse, ApiResponse, constructErrorMsgReqError, constructErrorMsgUnableToFetch } from './utilities'

//api actions

export const getDecorationsWSkill = async (filters) => {
    const url = 'https://mhw-db.com/decorations'
    const request = new Request(url, {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json',
        'Cache-Control': 'private',
    })

    let result = await fetch(request).catch(err => {
        return new ApiResponse(-1, null, constructErrorMsgUnableToFetch(err, url))
    })
    if(result.status === -1) return result

    else if(result.status === 200 || result.status === 304){
        let resultBody = await result.json().catch(err => {
            return new ApiResponse(-1, null, constructErrorMsgUnableToFetch(err, url))
        })
        if(resultBody.status === -1) return resultBody

        const filteredDecos = filterDecos(resultBody, filters)
        return new ApiResponse(result.status, {decos: filteredDecos}, "")
    }
    else{
        return new ApiResponse(result.status, null, constructErrorMsgCouldntReadServerResponse(result.status, '', url))
    }

}

//helpers

const filterDecos = (decoObjects, filters) => {
    let filteredDecoObjects = []
    decoObjects.forEach(deco => {
        deco.skills.forEach(skillDescription => {
            if(skillDescription.skillName === filters.skill) filteredDecoObjects.push(deco)
        })
    })

    if(filters.slot !== "all"){
        filteredDecoObjects = filteredDecoObjects.filter(decoration => decoration.slot === parseInt(filters.slot))
    }
    if(filters.rarity !== "all"){
        filteredDecoObjects = filteredDecoObjects.filter(decoration => decoration.rarity === parseInt(filters.rarity))
    }

    return filteredDecoObjects
}

