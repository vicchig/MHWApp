import { constructErrorMsgCouldntReadServerResponse, ApiResponse, constructErrorMsgUnableToFetch, constructErrorMsgReqError } from './utilities'

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
        return new ApiResponse(-1, null, constructErrorMsgUnableToFetch("An error occured", url))
    })

    if (result.status === -1) return result
    else if (result.status === 200 || result.status === 304){
        let responseBody = await result.json().catch(err => {
            return new ApiResponse(result.status, null, constructErrorMsgCouldntReadServerResponse(result.status, "An error occured", url))
        })
        if (responseBody.errorMsg) return responseBody
        return new ApiResponse(result.status, {dataList: responseBody}, "")
    }
    else{
        return new ApiResponse(result.status, null, constructErrorMsgReqError(result.status, url, result.errMsg))
    }
}


export const getEquipmentInfo = async (name, type) => {
    let url = `/equipment/${type}/${name}`
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json',
            'Cache-Control': 'private'
        }
    })

    let result = await fetch(request).catch(err => {
        return new ApiResponse(-1, null, constructErrorMsgUnableToFetch("An error occured", url))
    })

    if (result.status === -1) return result
    else if (result.status === 200 || result.status === 304){
        let responseBody = await result.json().catch(err => {
            return new ApiResponse(result.status, null, constructErrorMsgCouldntReadServerResponse(result.status, "An error occured", url))
        })
        if (responseBody.errorMsg) return responseBody
        return new ApiResponse(result.status, {item: responseBody}, "")
    }
    else{
        return new ApiResponse(result.status, null, constructErrorMsgReqError(result.status, url, result.errMsg))
    }
}

export const getMonsterInfo = async (filters, name = "") => {
    let query = (name === [] ? null : {name: name})

    const url = "/monsters" + (query ? "?q=" + JSON.stringify(query) : "")
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json',
            'Cache-Control': 'private'
        }
    })

    let result = await fetch(request).catch(err => {
        return new ApiResponse(-1, null, constructErrorMsgUnableToFetch("An error occured", url))
    })

    if (result.status === -1) return result
    else if (result.status === 200 || result.status === 304){
        let responseBody = await result.json().catch(err => {
            return new ApiResponse(result.status, null, constructErrorMsgCouldntReadServerResponse(result.status,"An error occured", url))
        })
        if (responseBody.errorMsg) return responseBody
        let filteredResponseBody = responseBody
        
        if(name === []){
            filteredResponseBody = filterMonsters(responseBody, filters)
        }

        filteredResponseBody  = filteredResponseBody.sort((a, b) => {if(a.name > b.name) {return 1} else return -1})

        return new ApiResponse(result.status, {monsters: filteredResponseBody}, "")
    }
    else{
        return new ApiResponse(result.status, null, constructErrorMsgReqError(result.status, url, result.errMsg))
    }
}

export const getAugmentMaterials = async (level, rarity, augment) => {
    const url = `/augments?level=${level}&rarity=${rarity}&augmentName=${augment}`
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json',
            'Cache-Control': 'private'
        },

    })

    let result = await fetch(request).catch(err => {
        return new ApiResponse(-1, null, constructErrorMsgUnableToFetch("An error occured", url))
    })

    if (result.status === -1) return result
    else if (result.status === 200 || result.status === 304){
        let responseBody = await result.json().catch(err => {
            return new ApiResponse(result.status, null, constructErrorMsgCouldntReadServerResponse(result.status, "An error occured", url))
        })
        if (responseBody.errorMsg) return responseBody
        
        return new ApiResponse(result.status, responseBody, "")
    }
    else{
        return new ApiResponse(result.status, null, constructErrorMsgReqError(result.status, url, result.errMsg))
    }
}

//helpers

export const filterMonsters = (data, filters, useORFilters = true) => {

    const allFilters = [...filters.species, ...filters.difficulty, ...filters.threatLevel, ...filters.weakness]

    let filteredMonsters = []
    let useAllSpecies, useAllDifficulties, useAllThreatLevels, useAllWeaknesses = false
    const speciesFilterAmount = filters.species.length

    useAllSpecies = (filters.species.filter(species => species.value === "all")).length > 0 ? true : false
    useAllDifficulties = (filters.difficulty.filter(difficulty =>difficulty.value === "all")).length > 0 ? true : false
    useAllThreatLevels = (filters.threatLevel.filter(level => level.value === "all")).length > 0 ? true : false
    useAllWeaknesses = (filters.weakness.filter(weakness => weakness.element === "all")).length > 0 ? true : false

    if(useORFilters && (useAllSpecies || useAllDifficulties || useAllThreatLevels || useAllWeaknesses)){
        filteredMonsters = [...data]
    }
    else{
        if(useORFilters){
            allFilters.forEach(filter => {
                let monstersToInclude = []
        
                if(filter.field === "weaknesses" && !useAllWeaknesses){
                    data.forEach(monster => {
                        if (monster.weaknesses.filter(weakness => weakness.stars === filter.stars && weakness.element === filter.element).length > 0){
                            monstersToInclude.push(monster)
                        }
                    })
                }
                else{
                    monstersToInclude = data.filter(monster => monster[filter.field] === filter.value)
                }
    
                filteredMonsters.push(...monstersToInclude)
            })
        }
        else{
            if(useAllSpecies || useAllDifficulties || useAllThreatLevels || useAllWeaknesses){
                data.forEach(monster => {
                    let passedAllFilters = 1
    
                    allFilters.forEach(filter => {
                        if(filter.field === "weaknesses" && filter.value !== "all" && !useAllWeaknesses && monster["weaknesses"].filter(weakness => weakness.stars === filter.stars && weakness.element === filter.element).length === 0){
                            passedAllFilters = 0
                        }
                        else if(filter.field !== "weaknesses" && filter.value !== "all" && monster[filter.field] !== filter.value){
                            passedAllFilters = 0
                        }
                    })
    
                    if(passedAllFilters){
                        filteredMonsters.push(monster)
                    }
                })
            }
            else{
                data.forEach(monster => {
                    let passedAllFilters = 1
    
                    allFilters.forEach(filter => {
                        if(filter.field === "weaknesses" && !useAllWeaknesses && monster["weaknesses"].filter(weakness => weakness.stars === filter.stars && weakness.element === filter.element).length === 0){
                            passedAllFilters = 0
                        }
                        else if(filter.field !== "weaknesses" && monster[filter.field] !== filter.value){
                            passedAllFilters = 0
                        }
                    })
    
                    if(passedAllFilters){
                        filteredMonsters.push(monster)
                    }
                })
            }

        }
    }

    //run the species filter again as that takes precedence, unless there are multiple species filters
    if(speciesFilterAmount === 1 && !useAllSpecies){
        filteredMonsters = filteredMonsters.filter(monster => monster.species === filters.species[0].value)
    }

    //remove duplicates
    filteredMonsters = [...new Set(filteredMonsters)]

    return filteredMonsters
}