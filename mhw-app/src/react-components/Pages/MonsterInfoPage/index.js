import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SearchBar from './../../IndividualComponents/SearchBar'
import {getData} from './../../../actions/dataActions'
import CustomSelect from './../../IndividualComponents/CustomSelect'
import {getMonsterInfo, filterMonsters} from '../../../actions/dataActions'
import {processErrorWNav, arrayContains} from '../../../actions/utilities'
import GeneralResultCard from '../../IndividualComponents/GeneralResultCard'
import { uid } from 'react-uid';
import BeatLoader from "react-spinners/BeatLoader";
import './style.css'


const weaknessOptions = [
    {value: JSON.stringify({field: "weaknesses", element: "all", stars: "all"}), label: "All"},
    {value: JSON.stringify({field: "weaknesses", element: "ice", stars: 1}), label: "Ice 1"},
    {value: JSON.stringify({field: "weaknesses", element: "ice", stars: 2}), label: "Ice 2"},
    {value: JSON.stringify({field: "weaknesses", element: "ice", stars: 3}), label: "Ice 3"},
    {value: JSON.stringify({field: "weaknesses", element: "water", stars: 1}), label: "Water 1"},
    {value: JSON.stringify({field: "weaknesses", element: "water", stars: 2}), label: "Water 2"},
    {value: JSON.stringify({field: "weaknesses", element: "water", stars: 3}), label: "Water 3"},
    {value: JSON.stringify({field: "weaknesses", element: "fire", stars: 1}), label: "Fire 1"},
    {value: JSON.stringify({field: "weaknesses", element: "fire", stars: 2}), label: "Fire 2"},
    {value: JSON.stringify({field: "weaknesses", element: "fire", stars: 3}), label: "Fire 3"},
    {value: JSON.stringify({field: "weaknesses", element: "thunder", stars: 1}), label: "Thunder 1"},
    {value: JSON.stringify({field: "weaknesses", element: "thunder", stars: 2}), label: "Thunder 2"},
    {value: JSON.stringify({field: "weaknesses", element: "thunder", stars: 3}), label: "Thunder 3"},
    {value: JSON.stringify({field: "weaknesses", element: "dragon", stars: 1}), label: "Dragon 1"},
    {value: JSON.stringify({field: "weaknesses", element: "dragon", stars: 2}), label: "Dragon 2"},
    {value: JSON.stringify({field: "weaknesses", element: "dragon", stars: 3}), label: "Dragon 3"},
    {value: JSON.stringify({field: "weaknesses", element: "sleep", stars: 1}), label: "Sleep 1"},
    {value: JSON.stringify({field: "weaknesses", element: "sleep", stars: 2}), label: "Sleep 2"},
    {value: JSON.stringify({field: "weaknesses", element: "sleep", stars: 3}), label: "Sleep 3"},
    {value: JSON.stringify({field: "weaknesses", element: "paralysis", stars: 1}), label: "Paralysis 1"},
    {value: JSON.stringify({field: "weaknesses", element: "paralysis", stars: 2}), label: "Paralysis 2"},
    {value: JSON.stringify({field: "weaknesses", element: "paralysis", stars: 3}), label: "Paralysis 3"},
    {value: JSON.stringify({field: "weaknesses", element: "stun", stars: 1}), label: "Stun 1"},
    {value: JSON.stringify({field: "weaknesses", element: "stun", stars: 2}), label: "Stun 2"},
    {value: JSON.stringify({field: "weaknesses", element: "stun", stars: 3}), label: "Stun 3"},
    {value: JSON.stringify({field: "weaknesses", element: "poison", stars: 1}), label: "Poison 1"},
    {value: JSON.stringify({field: "weaknesses", element: "poison", stars: 2}), label: "Poison 2"},
    {value: JSON.stringify({field: "weaknesses", element: "poison", stars: 3}), label: "Poison 3"},
    {value: JSON.stringify({field: "weaknesses", element: "blast", stars: 1}), label: "Blast 1"},
    {value: JSON.stringify({field: "weaknesses", element: "blast", stars: 1}), label: "Blast 2"},
    {value: JSON.stringify({field: "weaknesses", element: "blast", stars: 1}), label: "Blast 3"}
]

const temperedRankOptions = [
    {value: JSON.stringify({field: "temperedRank", value: "all"}), label: "All"},
    {value: JSON.stringify({field: "temperedRank", value: 1}), label: "Threat Level 1"}, 
    {value: JSON.stringify({field: "temperedRank", value: 2}), label: "Threat Level 2"}, 
    {value: JSON.stringify({field: "temperedRank", value: 3}), label: "Threat Level 3"}
]

const speciesOptions = [
    {value: JSON.stringify({field: "species", value: "all"}), label: "All"},
    {value: JSON.stringify({field: "species", value: "elder dragon"}), label: "Elder Dragons"},
    {value: JSON.stringify({field: "species", value: "piscine wyvern"}), label: "Piscine Wyverns"},
    {value: JSON.stringify({field: "species", value: "brute wyvern"}), label: "Brute Wyverns"},
    {value: JSON.stringify({field: "species", value: "fanged wyvern"}), label: "Fanged Wyverns"},
    {value: JSON.stringify({field: "species", value: "flying wyvern"}), label: "Flying Wyverns"},
    {value: JSON.stringify({field: "species", value: "relict"}), label: "Relict"},
    {value: JSON.stringify({field: "species", value: "fanged beast"}), label: "Fanged Beasts"},
    {value: JSON.stringify({field: "species", value: "bird wyvern"}), label: "Bird Wyvern"}
]

const difficultyRankOptions = [
    {value: JSON.stringify({field: "difficulty", value: "all"}), label: "All"},
    {value: JSON.stringify({field: "difficulty", value: 1}), label: "1"},
    {value: JSON.stringify({field: "difficulty", value: 2}), label: "2"},
    {value: JSON.stringify({field: "difficulty", value: 3}), label: "3"},
    {value: JSON.stringify({field: "difficulty", value: 4}), label: "4"},
    {value: JSON.stringify({field: "difficulty", value: 5}), label: "5"},
    {value: JSON.stringify({field: "difficulty", value: 6}), label: "6"},
    {value: JSON.stringify({field: "difficulty", value: 7}), label: "7"},
    {value: JSON.stringify({field: "difficulty", value: 8}), label: "8"},
    {value: JSON.stringify({field: "difficulty", value: 9}), label: "9"},
    {value: JSON.stringify({field: "difficulty", value: 10}), label: "10"},
]

const sortThreatOptions = [
    {value: 0, label: "None"},
    {value: 1, label: "Threat Ascending"},
    {value: 2, label: "Threat Descending"}
]

const sortDifficultyOptions = [
    {value: 0, label: "None"},
    {value: 1, label: "Difficulty Ascending"},
    {value: 2, label: "Difficulty Descending"}
]

const sortWeaknessOptions = [
    {value: 0, label: "None"},
    {value: 1, label: "Weakness Ascending"},
    {value: 2, label: "Weakness Descending"}
]

const sortAlphaOptions = [
    {value: 0, label: "None"},
    {value: 1, label: "Alphabetical Ascending"},
    {value: 2, label: "Alphabetical Descending"}
]

class MonsterInfoPage extends React.Component{

    state = {
        searchbarValues: [],
        filters: {
            species: [],
            weakness: [],
            difficulty: [],
            threatLevel: [],
        },
        sorts: {
            sortWeaknessVal: 0,
            sortDifficultyVal: 0,
            sortThreatVal: 0,
            sortAlphaVal: 0
        },
        results: [],
        searchResultsToShow: [],
        loading: false
    }

    onSearchAction = async () => {
        this.setState({loading: true}, async () => {
            const result = await getMonsterInfo(this.state.filters, this.state.searchbarValues).catch(err => {
                console.error("An error occured")
            })

            if(!result){
                console.error("Unknown Error!")
            }
            else if(result.status !== 200 && result.status !== 304){
                processErrorWNav(this, result.status, result.errorMsg)
            }
            else{
                this.setState({
                    results: result.data.monsters, //change this to be results
                    loading: false,
                    searchResultsToShow: result.data.monsters
                })
            }
        })
    }

    handleSelect = (e, property) => {
        if(property === "searchbarValues"){
            if(e){
                let names = []
                e.forEach(objVal => {
                    const obj = JSON.parse(objVal.value).name
                    names.push(obj)
                })
                this.setState({
                    [property]: names,
                })
            }
            else{
                this.setState({
                    [property]: [],
                })
            }
        }
        else{
            let newFilters = {}
            let filter = []
            newFilters = this.state.filters

            if(e){
                e.forEach(option => {
                    filter.push(JSON.parse(option.value))
                })
            }
            
            newFilters[property] = filter

            //TODO: Still need to make sure that when filter is selected, it modifies searchResultsToShow
            this.setState({
                filters: newFilters,
                loading: true
            }, () => {
                const newSearchResultsToShow = filterMonsters(this.state.results, this.state.filters)

                this.setState({
                    loading: false,
                    searchResultsToShow: newSearchResultsToShow
                })
            })
        }
    }

    //this function is also used on the SkillToGem page so could put it in an action file instead of copying it
    sortResultsPrimitive = (e, compareOn, sortOption) => {
        if(!e || e.value !== this.state.sorts[sortOption]){
            const switchOn = e ? e.value : this.state.sorts[sortOption]
            //TODO: Probably want to put this in a separate function as well
            switch(switchOn){
                case 0:
                    break
                case 1:
                    this.setState({
                        searchResultsToShow: this.state.searchResultsToShow.sort((a, b) => {if(a[compareOn] < b[compareOn]) return -1; else return 1})
                    }, () => {
                        if(e){
                            let newSorts = {}
                            newSorts = this.state.sorts
                            newSorts[sortOption] = e.value
                    
                            this.setState({
                                sorts: newSorts
                            })
                        } 
                    })
                    break
                case 2:
                    this.setState({
                        searchResultsToShow: this.state.searchResultsToShow.sort((a, b) => {if(a[compareOn] > b[compareOn]) return -1; else return 1})
                    }, () => {
                        if(e){
                            let newSorts = {}
                            newSorts = this.state.sorts
                            newSorts[sortOption] = e.value
                    
                            this.setState({
                                sorts: newSorts
                            })
                        } 
                    })
                    break
                default:
                    break
            }
        }

         
    }

    sortResultsWeakness = (e) => {
        if(!e || e.value !== this.state.sorts.sortWeaknessVal){
            switch((e ? e.value : this.state.sorts.sortWeaknessVal)){
                case 0:
                    break
                case 1:
                    this.setState({
                        searchResultsToShow: this.state.searchResultsToShow.sort((a, b) => {
                            let aTotalStars = 0
                            let bTotalStars = 0

                            a.weaknesses.forEach(weakness => {
                                aTotalStars += weakness.stars
                            })

                            b.weaknesses.forEach(weakness => {
                                bTotalStars += weakness.stars
                            })
                            
                            if(aTotalStars < bTotalStars) return -1; else return 1})
                    })
                    break
                case 2:
                    this.setState({
                        searchResultsToShow: this.state.searchResultsToShow.sort((a, b) => {
                            let aTotalStars = 0
                            let bTotalStars = 0

                            a.weaknesses.forEach(weakness => {
                                aTotalStars += weakness.stars
                            })

                            b.weaknesses.forEach(weakness => {
                                bTotalStars += weakness.stars
                            })
                            
                            if(aTotalStars > bTotalStars) return -1; else return 1})
                    })
                    break
                default:
                    break
            }
        }

        if(e){
            let newSorts = {}
            newSorts = this.state.sorts
            newSorts.sortWeaknessVal = e.value
    
            this.setState({
                sorts: newSorts
            })
        }  
    }

    render(){
        const results = this.state.loading ? <BeatLoader color="rgb(161, 184, 98)"></BeatLoader> : this.state.searchResultsToShow.map(item => (
            (() => {
                let iconName = ""
                const splitName = item.name.split(" ")

                for(let i = 0; i < splitName.length; i++){
                    if(i === splitName.length - 1){
                        iconName += splitName[i].toLowerCase()
                    }
                    else{
                        iconName += splitName[i].toLowerCase() + "-"
                    }
                }

                //a couple special cases
                if(iconName === "great-jagras" || iconName === "seething-bazelgeuse" || iconName === 'yian-garuga' || iconName === 'velkhana' || iconName === 'fatalis'){
                    iconName += ".png"
                }
                else{
                    iconName += ".webp"
                }

                return <GeneralResultCard
                    key={uid(item)}
                    hasIcon={true} 
                    hasCloseButton={false}
                    hasCount={false}
                    iconWidth={"50vw"}
                    iconHeight={"60vh"}
                    name={item.name}
                    id={item.internalID}
                    displayType={1}
                    iconSource={item.name === "Pukei-Pukei" ? null : require("./../../../Images/" + iconName)}
                    className = {"MonsterInfo"}
                >    
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    {
                                        (() => {
                                            let elementalWeaknesses = []
                                            item.weaknesses.forEach(weakness => {
                                                if(arrayContains(['fire', 'water', 'thunder', 'ice', 'dragon'], weakness.element)) elementalWeaknesses.push(weakness)
                                            })

                                            return <ul className={"ulNoBullets"}>
                                                {elementalWeaknesses.map(weakness => (
                                                    <li key={uid(weakness)}>
                                                        <div className={"elementalWeaknessInlineDiv"}>

                                                            <img src={require("../../../Images/" + weakness.element + ".webp")}
                                                                className={"elementIcon"}
                                                                alt={"Content Unavailable"}
                                                            ></img>
                                                            <div className={"blankSpaceDiv"}></div>
                                                            {(() => {
                                                                if(weakness.stars === 0){
                                                                    if(weakness.condition){
                                                                        return <div className={"inlineStarDiv"}>
                                                                            <img src={require("../../../Images/redX.png")}
                                                                                    className={"xIconInline"}
                                                                                    alt={"Content Unavailable"}
                                                                            ></img>
                                                                            <div className={"blankSpaceDiv"}></div>
                                                                            <span>{"("+weakness.condition+")"}</span>
                                                                        </div>
                                                                    }
                                                                    else{
                                                                        return <img src={require("../../../Images/redX.png")}
                                                                                    className={"xIcon"}
                                                                                    alt={"Content Unavailable"}
                                                                                ></img>
                                                                    }
                                                                }
                                                                else if(weakness.stars > 0){
                                                                    if(weakness.condition){
                                                                        return <div className={"inlineStarDiv"}>
                                                                            <img src={require("../../../Images/star" + weakness.stars + ".png")}
                                                                                className={"starIconInline"+weakness.stars}
                                                                                alt={"Content Unavailable"}
                                                                            ></img>
                                                                            <div className={"blankSpaceDiv"}></div>
                                                                            <span>{"("+weakness.condition+")"}</span>
                                                                        </div>
                                                                    }
                                                                    else{
                                                                        return <img src={require("../../../Images/star" + weakness.stars + ".png")}
                                                                                    className={"starIcon"+weakness.stars}
                                                                                    alt={"Content Unavailable"}
                                                                                ></img>
                                                                    }
                                                                }
                                                            })()}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        })()
                                    }
                                </td>
                                <td>
                                    {
                                        (() => {
                                            let statusWeaknesses = []
                                            item.weaknesses.forEach(weakness => {
                                                if(arrayContains(['sleep', 'paralysis', 'blast', 'stun', 'poison'], weakness.element)) statusWeaknesses.push(weakness)
                                            })

                                            return <ul className={"ulNoBullets"}>
                                                {statusWeaknesses.map(weakness => (
                                                    <li key={uid(weakness)}>
                                                        <div className={"statusWeaknessInlineDiv"}>
                                                            <img src={require("../../../Images/" + weakness.element + ".webp")}
                                                                className={"elementIcon"}
                                                                alt={"Content Unavailable"}
                                                            ></img>
                                                            <div className={"blankSpaceDiv"}></div>
                                                            {(() => {
                                                                if(weakness.stars === 0){
                                                                    return <img src={require("../../../Images/redX.png")}
                                                                                className={"xIcon"}
                                                                                alt={"Content Unavailable"}
                                                                        ></img>
                                                                }
                                                                else if(weakness.stars > 0){
                                                                    return <img src={require("../../../Images/star" + weakness.stars + ".png")}
                                                                                className={"starIcon"+weakness.stars}
                                                                                alt={"Content Unavailable"}
                                                                        ></img>
                                                                }
                                                            })()}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        })()
                                    }
                                </td>
                                <td>
                                    <div className={"bufferDiv"}></div>
                                </td>
                                <td className={"flexTD"}>
                                    <div className={"cardHeaderDiv"}>Species</div>
                                    <div className={"cardContentDiv"}>{(() => {
                                        const speciesNameSplit = item.species.split(" ")
                                        let capitalizedName = ""

                                        speciesNameSplit.forEach(word => {
                                            capitalizedName += word.replace(word.substring(0, 1), word.substring(0, 1).toUpperCase()) + " "
                                        })
                                        return capitalizedName
                                    })()}</div>
                                </td>
                                <td>
                                    <div className={"bufferDiv"}></div>
                                </td>
                                <td className={"flexTD"}>
                                    <div className={"cardHeaderDiv"}>Threat Level</div>
                                    <div className={"cardContentDiv"}>{item.temperedRank}</div>
                                </td>
                                <td>
                                    <div className={"bufferDiv"}></div>
                                </td>
                                <td className={"flexTD"}>
                                    <div className={"cardHeaderDiv"}>Difficulty</div>
                                    <div className={"cardContentDiv"}>{item.difficulty ?? 0}</div>
                                </td>
                                <td>
                                    <div className={"bufferDiv"}></div>
                                </td>
                                <td className={"flexTD"}>
                                    <div className={"cardHeaderDiv"}>Health</div>
                                    <div className={"cardContentDiv"}>{
                                        <ul className={"ulNoBullets"}>
                                            {
                                                (() => {
                                                    const elements = []
                                                    for(let i = 0; i < item.health.length; i++){
                                                        elements.push(<li key={uid(item.health[i] + i)}>
                                                                          {item.health[i]}
                                                                      </li>)
                                                    }
                                                    return elements
                                                })()
                                            }
                                        </ul>
                                    }</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </GeneralResultCard>
            })()
        ))

        return(
            <div id="mainDivMonsterInfo">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <div id="searchDivMonsterInfo">
                        <SearchBar id={"searchbar1"} textFieldID={"searchbar"} dataObjectName={"dataList"}
                                searchFunction={getData} searchCategory={"monsterNames"} isMulti={true}
                                parentContext={this}
                                onSearch={this.onSearchAction}
                                onSetSelect={e => this.handleSelect(e, "searchbarValues")} buttonText={"Search"}
                                hasButton={true} placeholder={"Select a monster or monster group to dispaly the info for"}
                                searchObjectProperties={["name"]} className={"MonsterInfo"}
                        ></SearchBar>
                   
                    <div id="filtersDivMonsterInfo">
                        <h1 className="sortsAndFiltersHeader">Filters:</h1>
                        <CustomSelect
                            name="weaknessSelect" onChange={e => this.handleSelect(e, "weakness")} 
                            className="optionSelect" placeholder="Weakness" options={weaknessOptions}
                            menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)" isMulti={true}
                        ></CustomSelect>

                        <CustomSelect
                            name="temperedRankSelect" onChange={e => this.handleSelect(e, "threatLevel")} 
                            className="optionSelect" placeholder="Threat" menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)" options={temperedRankOptions} isMulti={true}
                        ></CustomSelect>
                        <div className="emptyDiv"></div>
                        <CustomSelect
                            name="speciesSelect" onChange={e => this.handleSelect(e, "species")} 
                            className="optionSelect" placeholder="Species" options={speciesOptions}
                            menuBackgroundColour="rgb(100, 100, 100)"  optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)" isMulti={true}
                        ></CustomSelect>

                        <CustomSelect
                            name="difficultySelect" onChange={e => this.handleSelect(e, "difficulty")} 
                            className="optionSelect" placeholder="Difficulty" menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)" options={difficultyRankOptions} isMulti={true}
                        ></CustomSelect>
                       
                        <h1 className="sortsAndFiltersHeader">Sort:</h1>
                        <CustomSelect
                            name="weaknessSort" onChange={e => this.sortResultsWeakness(e)} 
                            className="optionSelect" placeholder="Weakness" options={sortWeaknessOptions}
                            menuBackgroundColour="rgb(100, 100, 100)"  optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)"
                        ></CustomSelect>

                        <CustomSelect
                            name="difficultySort" onChange={e => this.sortResultsPrimitive(e, "difficulty", "sortDifficultyVal")} 
                            className="optionSelect" placeholder="Difficulty"  options={sortDifficultyOptions}
                            menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)"
                        ></CustomSelect>
                        <div className="emptyDiv"></div>

                        <CustomSelect
                            name="threatSort" onChange={e => this.sortResultsPrimitive(e, "temperedRank", "sortThreatVal")} 
                            className="optionSelect" placeholder="Threat"  options={sortThreatOptions}
                            menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)"
                        ></CustomSelect>

                        <CustomSelect
                            name="alphaSort" onChange={e => this.sortResultsPrimitive(e, "name", "sortAlphaVal")} 
                            className="optionSelect" placeholder="Alphabetical" options={sortAlphaOptions}
                            menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)"
                        ></CustomSelect>
                    </div>
                    
                </div>
                <div id="loadingDiv">
                </div>
                <div id="selectionResultsDiv">
                    {results}
                </div>
            </div>
        )
    }
}

export default withRouter(MonsterInfoPage);
