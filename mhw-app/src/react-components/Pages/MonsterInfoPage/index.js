import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SearchBar from './../../IndividualComponents/SearchBar'
import {getData} from './../../../actions/dataActions'
import CustomSelect from './../../IndividualComponents/CustomSelect'
import {processErrorWNav} from '../../../actions/utilities'
import { uid } from 'react-uid';
import './style.css'


const weaknessOptions = [
    {value: "all", label: "All"},
    {value: "i1", label: "Ice 1"},
    {value: "i2", label: "Ice 2"},
    {value: "i3", label: "Ice 3"},
    {value: "w1", label: "Water 1"},
    {value: "w2", label: "Water 2"},
    {value: "w3", label: "Water 3"},
    {value: "f1", label: "Fire 1"},
    {value: "f2", label: "Fire 2"},
    {value: "f3", label: "Fire 3"},
    {value: "t1", label: "Thunder 1"},
    {value: "t2", label: "Thunder 2"},
    {value: "t3", label: "Thunder 3"},
    {value: "d1", label: "Dragon 1"},
    {value: "d2", label: "Dragon 2"},
    {value: "d3", label: "Dragon 3"},
    {value: "sl1", label: "Sleep 1"},
    {value: "sl2", label: "Sleep 2"},
    {value: "sl3", label: "Sleep 3"},
    {value: "pa1", label: "Paralysis 1"},
    {value: "pa2", label: "Paralysis 2"},
    {value: "pa3", label: "Paralysis 3"},
    {value: "st1", label: "Stun 1"},
    {value: "st2", label: "Stun 2"},
    {value: "st3", label: "Stun 3"},
    {value: "po1", label: "Poison 1"},
    {value: "po2", label: "Poison 2"},
    {value: "po3", label: "Poison 3"},
    {value: "b1", label: "Blast 1"},
    {value: "b2", label: "Blast 2"},
    {value: "b3", label: "Blast 3"}
]

const temperedRankOptions = [
    {value: -1, label: "All"},
    {value: 1, label: "Threat Level 1"}, 
    {value: 2, label: "Threat Level 2"}, 
    {value: 3, label: "Threat Level 3"}
]

const speciesOptions = [
    {value: "all", label: "All"},
    {value: "elder dragon", label: "Elder Dragons"},
    {value: "piscine wyvern", label: "Piscine Wyverns"},
    {value: "brute wyvern", label: "Brute Wyverns"},
    {value: "fanged wyvern", label: "Fanged Wyverns"},
    {value: "flying wyvern", label: "Flying Wyverns"},
    {value: "relict", label: "Relict"},
    {value: "fanged beast", label: "Fanged Beasts"}
]

const difficultyRankOptions = [
    {value: "all", label: "All"},
    {value: 1, label: "1"},
    {value: 2, label: "2"},
    {value: 3, label: "3"},
    {value: 4, label: "4"},
    {value: 5, label: "5"},
    {value: 6, label: "6"},
    {value: 7, label: "7"},
    {value: 8, label: "8"},
    {value: 9, label: "9"},
    {value: 10, label: "10"},
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
    }

    handleSelect = (e, property) => {
        this.setState({
            [property]: e.value
        })
    }

    //this function is also used on the SkillToGem page so could put it in an action file instead of copying it
    sortResults = (e, compareOn, sortOption) => {
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

        return(
            <div id="mainDiv">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <div id="searchDiv">
                        <SearchBar id={"searchbar1"} textFieldID={"searchbar"} dataObjectName={"dataList"}
                                searchFunction={getData} searchCategory={"monsterNames"} value={this.state.searchbarText}
                                parentContext={this}
                                onSearch={this.onSearchAction}
                                onSetSelect={this.handleSelect} buttonText={"Search"}
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
                            valueContainerColour="rgb(161, 184, 98)"
                        ></CustomSelect>

                        <CustomSelect
                            name="temperedRankSelect" onChange={e => this.handleSelect(e, "threatLevel")} 
                            className="optionSelect" placeholder="Threat" menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)" options={temperedRankOptions}
                        ></CustomSelect>
                        <div className="emptyDiv"></div>
                        <CustomSelect
                            name="speciesSelect" onChange={e => this.handleSelect(e, "species")} 
                            className="optionSelect" placeholder="Species" options={speciesOptions}
                            menuBackgroundColour="rgb(100, 100, 100)" menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)"
                        ></CustomSelect>

                        <CustomSelect
                            name="difficultySelect" onChange={e => this.handleSelect(e, "difficulty")} 
                            className="optionSelect" placeholder="Difficulty" menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)" options={difficultyRankOptions}
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
                    
                </div>
            </div>
        )
    }
}

export default withRouter(MonsterInfoPage);
