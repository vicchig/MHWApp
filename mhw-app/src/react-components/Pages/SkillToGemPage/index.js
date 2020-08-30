import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SearchBar from './../../IndividualComponents/SearchBar'
import {getData} from '../../../actions/dataActions'
import {getDecorationsWSkill} from '../../../actions/mhwActions'
import { uid } from 'react-uid';
import { processErrorWNav } from '../../../actions/utilities';
import CustomSelect from '../../IndividualComponents/CustomSelect'
import BeatLoader from "react-spinners/BeatLoader";
import ReactHover, {Hover, Trigger} from 'react-hover'
import ResultCard from './../../IndividualComponents/ResultCard'
import './style.css'

const slotOptions = [
    {value: "all", label: "All Slots"},
    {value: "1", label: "1"},
    {value: "2", label: "2"},
    {value: "3", label: "3"},
    {value: "4", label: "4"}
]
const rarityOptions = [
    {value:"all", label: "All Rarities"},
    {value: "1", label: "1"},
    {value: "2", label: "2"},
    {value: "3", label: "3"},
    {value: "4", label: "4"},
    {value: "5", label: "5"},
    {value: "6", label: "6"},
    {value: "7", label: "7"},
    {value: "8", label: "8"},
    {value: "9", label: "9"},
    {value: "10", label: "10"},
    {value: "11", label: "11"},
    {value: "12", label: "12"}
]

const sortSlotOptions = [
    {value: 0, label: "No Preference"},
    {value: 1, label: "Slot Ascending"},
    {value: 2, label: "Slot Descending"}
]
const sortRarityOptions = [
    {value: 0, label: "No Preference"}, 
    {value: 1, label: "Rarity Ascending"}, 
    {value: 2, label: "Rarity Descending"}
]
const sortAlphaOptions = [
    {value: 0, label: "No Preference"}, 
    {value: 1, label: "A-Z"}, 
    {value: 2, label: "Z-A"}
]

const hoverOptions = {
    followCursor: true,
    shiftX: -500,
    shiftY: -1000
}


class SkillToGemPage extends React.Component{

    state = {
        searchbarText: "",
        filters: {
            slot: "all",
            rarity: "all",
            skill: ""
        },
        searchResults: [],
        searchResultsToShow: [],
        showResults: false,
        sortSlotVal: 0,
        sortRarityVal: 0,
        sortAlphaVal: 0,
        loading: false,
        showHelperText: false
    }

    handleSearchSelect = (e) => {
        this.setState({
            searchbarText: e.value.name
        })
    }

    onSearchAction = () => {
        this.setState({
            filters: {slot: this.state.filters.slot, rarity: this.state.filters.rarity, skill:this.state.searchbarText},
            showResults: true,
            loading: true,
            showHelperText: false,
        }, async () => {
            let res = await getDecorationsWSkill(this.state.filters).catch(err => {
                console.error("An error occurred while waiting for server response. \n\n" + err)
            })
            if(res.status !== 200 && res.status !== 304) processErrorWNav(this, res.status, res.errorMsg)
            else{
                this.setState({
                    searchResults: res.data.decos,
                    searchResultsToShow: res.data.decos,
                    loading: false,
                    showHelperText: true
                })
            }
        })
    }

    changeSlotSelect = (e) => {
        this.setState({
            filters: {
                slot: e.value,
                rarity: this.state.filters.rarity,
                skill: this.state.filters.skill
            },
            searchResultsToShow: e.value === 'all' ? this.state.searchResults : this.state.searchResults.filter(result => (result.slot === parseInt(e.value)))
        })
    }

    changeRaritySelect = (e) => {
        this.setState({
            filters: {
                slot: this.state.filters.slot,
                rarity: e.value,
                skill: this.state.filters.skill
            },
            searchResultsToShow: e.value === 'all' ? this.state.searchResults : this.state.searchResults.filter(result => (result.rarity === parseInt(e.value)))
        })
    }

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

    generateResultComponent = (items) => {
        let resultsComponent = null
        if(this.state.loading){
            resultsComponent = <div id="loadSpinnerDiv"><BeatLoader color="rgb(161, 184, 98)"></BeatLoader></div>
        }
        else if(!this.state.showResults && !this.state.loading){
            resultsComponent = null
        }
        else if(!this.state.loading && this.state.showResults){
            resultsComponent = <table id="resultsTable">
                                    <tbody>
                                        <tr>
                                            <th className={"thStyle"}>Slot</th>
                                            <th className={"thStyle"}>Rarity</th>
                                            <th className={"thStyle"}>Name</th>
                                            <th className={"thStyle"}>Skills</th>
                                        </tr>
                                        {items}
                                    </tbody>
                                </table> 
        }
        else{
            resultsComponent = null
        }

        return resultsComponent
    }

    render(){
        const items = this.state.searchResultsToShow.map(item => (
            <tr key={uid(item)}>
                <td className="tdStyle">{item.slot}</td>
                <td className="tdStyle">{item.rarity}</td>
                <td className="tdStyle">{item.name}</td>
                <td className="tdStyle">
                    <ul className="listStyle">{
                        item.skills.map(skill => (<li key={uid(skill)}>
                                                    <div className="hoverItem">
                                                        <ReactHover options={hoverOptions}>
                                                            <Trigger type='trigger'>
                                                                <span>{skill.skillName}</span>
                                                            </Trigger>
                                                            <Hover type='hover'>
                                                                <ResultCard skill={skill}></ResultCard>
                                                            </Hover>
                                                        </ReactHover>
                                                    </div>
                                                  </li>))}
                    </ul>
                </td>
            </tr>)
        )

        let resultsComponent = this.generateResultComponent(items)
        
        return(
            <div id="mainDiv">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <div id="searchDiv">
                        <SearchBar id={"searchbar1"} textFieldID={"searchbar"} dataObjectName={"dataList"}
                                searchFunction={getData} searchCategory={"skillNames"} value={this.state.searchbarText}
                                parentContext={this} onChange={this.handleInput}
                                onSearch={this.onSearchAction}
                                onSetSelect={this.handleSearchSelect} buttonText={"Search"}
                                hasButton={true} placeholder={"Select or type in the name of skill..."}
                                searchObjectProperties={["name"]}
                        ></SearchBar>
                   
                    <div id="filtersDiv">
                        <h1 className="sortsAndFiltersHeader">Filters:</h1>
                        <CustomSelect
                            name="slotsSelect" onChange={e => this.changeSlotSelect(e)} 
                            className="skillToGemSelect" placeholder="Slots" options={slotOptions}
                            menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)"
                        ></CustomSelect>

                        <CustomSelect
                            name="raritySelect" onChange={e => this.changeRaritySelect(e)} 
                            className="skillToGemSelect" placeholder="Rarity" options={rarityOptions}
                            menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)"
                        ></CustomSelect>
                       
                        <h1 className="sortsAndFiltersHeader">Sort:</h1>
                        <CustomSelect
                            name="slotSort" onChange={e => this.sortResults(e, "slot", "sortSlotVal")} 
                            className="skillToGemSelect" placeholder="Slot" options={sortSlotOptions}
                            menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)"
                        ></CustomSelect>

                        <CustomSelect
                            name="raritySort" onChange={e => this.sortResults(e, "rarity", "sortRarityVal")} 
                            className="skillToGemSelect" placeholder="Rarity" options={sortRarityOptions}
                            menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)"
                        ></CustomSelect>
                        <h1 className="sortsAndFiltersHeader"></h1>
                        <CustomSelect
                            name="alphabeticalSort" onChange={e => this.sortResults(e, "name", "sortAlphaVal")} 
                            className="skillToGemSelect" placeholder="Alphabetical" options={sortAlphaOptions}
                            menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                            optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                            controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                            singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                            valueContainerColour="rgb(161, 184, 98)"
                        ></CustomSelect>
                    </div>
                    
                </div>
                <div id={"resultsTableDiv"}>
                    {this.state.showHelperText ? <h5 id={"resultsTableHint"}>*Hover over the skill name to view skill info.</h5> : null }
                    {resultsComponent}

                </div>
            </div>
        )
    }
}

export default withRouter(SkillToGemPage);
