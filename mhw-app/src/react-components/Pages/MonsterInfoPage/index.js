import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SearchBar from './../../IndividualComponents/SearchBar'
import {getData} from './../../../actions/dataActions'
import CustomSelect from './../../IndividualComponents/CustomSelect'
import {getMonsterInfo} from '../../../actions/dataActions'
import {processErrorWNav} from '../../../actions/utilities'
import { uid } from 'react-uid';
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
    {value: JSON.stringify({field: "species", value: "fanged beast"}), label: "Fanged Beasts"}
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


class MonsterInfoPage extends React.Component{

    state = {
        searchbarText: "",
        filters: {
            species: [],
            weakness: [],
            difficulty: [],
            threatLevel: [],
        },
        sortWeaknessVal: 0,
        sortDifficultyVal: 0,
        sortThreatVal: 0,
        results: [],
        searchResultsToShow: [],
        loading: false
    }

    onSearchAction = async () => {
        this.setState({loading: true}, async () => {
            const result = await getMonsterInfo(this.state.filters, this.state.searchbarText).catch(err => {
                console.error("An error has occurred while attempting to fetch data.\n" + err)
            })

            if(!result){
                console.error("Unknown Error!")
            }
            else if(result.status !== 200 && result.status !== 304){
                processErrorWNav(this, result.status, result.errorMsg)
            }
            else{
                this.setState({
                    searchResultsToShow: result.data.monsters, //change this to be results
                    loading: false
                }, () => { //TODO here need to apply the sort options currently selected
                    
                })
            }
        })
    }

    handleSelect = (e, property) => {
        if(property === "searchbarText"){
            this.setState({
                [property]: e.value,
            })
        }
        else{
            let newFilters = {}
            let filter = []
            newFilters = this.state.filters

            e.forEach(option => {
                filter.push(JSON.parse(option.value))
            })

            newFilters[property] = filter

            //TODO: Still need to make sure that when filter is selected, it modifies searchResultsToShow
            this.setState({
                filters: newFilters,
            })
        }
    }

    //this function is also used on the SkillToGem page so could put it in an action file instead of copying it
    sortResults = (e, compareOn, sortOption) => {
        console.log(e.value)
        if(e.value !== this.state[sortOption]){
            switch(e.value){
                case 0:
                    break
                case 1:
                    this.setState({
                        searchResultsToShow: this.state.searchResultsToShow.sort((a, b) => {if(a[compareOn] < b[compareOn]) return -1; else return 1})
                    })
                    break
                case 2:
                    this.setState({
                        searchResultsToShow: this.state.searchResultsToShow.sort((a, b) => {if(a[compareOn] > b[compareOn]) return -1; else return 1})
                    })
                    break
                default:
                    break
            }
        }

        this.setState({
            [sortOption]: e.value
        })
    }

    render(){
        //TODO: Need this to be mapping to a proper component
        const results = 
        <ul>
            {this.state.loading ? null : this.state.searchResultsToShow.map(result => (
                <li key={uid(result)}>{result.name}</li>
            ))}
        </ul>

        return(
            <div id="mainDiv">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <div id="searchDiv">
                        <SearchBar id={"searchbar1"} textFieldID={"searchbar"} dataObjectName={"dataList"}
                                searchFunction={getData} searchCategory={"monsterNames"} value={this.state.searchbarText}
                                parentContext={this}
                                onSearch={this.onSearchAction}
                                onSetSelect={e => this.handleSelect(e, "searchbarText")} buttonText={"Search"}
                                hasButton={true} placeholder={"Select a monster or monster group to dispaly the info for"}
                                searchObjectProperties={["name"]}
                        ></SearchBar>
                   
                    <div id="filtersDiv">
                        <h1 className="sortsAndFiltersHeader">Filters:</h1>
                        <CustomSelect
                            name="weaknessSelect" onChange={e => this.handleSelect(e, "weakness")} 
                            className="optionSelect" placeholder="Weakness" options={weaknessOptions}
                            menuBackgroundColour="rgb(100, 100, 100)" menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
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
                            menuBackgroundColour="rgb(100, 100, 100)" menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
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
                            name="weaknessSort" onChange={e => this.sortResults(e, "weakness", "sortWeaknessVal")} 
                            className="optionSelect" placeholder="Weakness" options={sortWeaknessOptions}
                            menuBackgroundColour="rgb(100, 100, 100)" menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)"
                        ></CustomSelect>

                        <CustomSelect
                            name="difficultySort" onChange={e => this.sortResults(e, "difficulty", "sortDifficultyVal")} 
                            className="optionSelect" placeholder="Difficulty" menuBackgroundColour="rgb(100, 100, 100)" options={sortDifficultyOptions}
                            menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)"
                        ></CustomSelect>
                        <div className="emptyDiv"></div>

                        <CustomSelect
                            name="threatSort" onChange={e => this.sortResults(e, "threat", "sortThreatVal")} 
                            className="optionSelect" placeholder="Threat" menuBackgroundColour="rgb(100, 100, 100)" options={sortThreatOptions}
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
