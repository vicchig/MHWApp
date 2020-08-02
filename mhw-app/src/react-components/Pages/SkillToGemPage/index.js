import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SearchBar from './../../IndividualComponents/SearchBar'
import {getSkillList} from '../../../actions/dataActions'
import {getDecorationsWSkill} from '../../../actions/mhwActions'
import { uid } from 'react-uid';
import { processErrorWNav } from '../../../actions/utilities';
import Select from 'react-select'
import './style.css'

class SkillToGemPage extends React.Component{

    state = {
        searchbarText: "",
        filters: {
            slot: "all",
            rarity: "all",
            skill: ""
        },
        searchResults: []
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSearchAction = () => {
        this.setState({
            filters: {slot: this.state.filters.slot, rarity: this.state.filters.rarity, skill:this.state.searchbarText}
        }, async () => {
            let res = await getDecorationsWSkill(this.state.filters).catch(err => {
                console.error("An error occurred while waiting for server response. \n\n" + err)
            })
            if(res.status !== 200 && res.status !== 304) processErrorWNav(this, res.status, res.errorMsg)
            else{
                this.setState({
                    searchResults: res.data.decos
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
            }
        })
    }

    changeRaritySelect = (e) => {
        this.setState({
            filters: {
                slot: this.state.filters.slot,
                rarity: e.value,
                skill: this.state.filters.skill
            }
        })
    }

    customSlotSelectStyles = {
        menu: (provided, state) => ({
          ...provided,
          backgroundColor: "rgb(100, 100, 100)",
        }),
        option: (provided, state) => ({
          padding: 20,
          gridColumnStart: 2,
          gridColumnEnd: 2,
          gridRowStart: 1,
          gridRowEnd: 1,
          "&:hover": {
            backgroundColor: "rgb(120, 120, 120)"
          }
        }),
        control: (provided, state) => ({
            ...provided,
            background: "rgb(61, 61, 61)",
            borderColor: "rgb(100, 100, 100)",
            "&:hover": {
                borderColor: "rgb(161, 184, 98)" 
            },
            boxShadow: "none",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "rgb(161, 184, 98)",
        }),
        placeholder: (provided, state) => ({
            ...provided,
            borderColor: "red",
            color: "rgb(161, 184, 98)",
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            borderColor: "red",
            color: "rgb(161, 184, 98)",
            "&:focus": {
                borderColor: "red",
              }
        })
    }

    customRaritySelectStyles = {
        menu: (provided, state) => ({
          ...provided,
          backgroundColor: "rgb(100, 100, 100)",
        }),
        option: (provided, state) => ({
          padding: 20,
          gridColumnStart: 3,
          gridColumnEnd: 3,
          gridRowStart: 1,
          gridRowEnd: 1,
          "&:hover": {
            backgroundColor: "rgb(120, 120, 120)"
          }
        }),
        control: (provided, state) => ({
            ...provided,
            background: "rgb(61, 61, 61)",
            borderColor: "rgb(100, 100, 100)",
            "&:hover": {
                borderColor: "rgb(161, 184, 98)" 
            },
            boxShadow: "none",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "rgb(161, 184, 98)",
        }),
        placeholder: (provided, state) => ({
            ...provided,
            borderColor: "red",
            color: "rgb(161, 184, 98)",
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            borderColor: "red",
            color: "rgb(161, 184, 98)",
            "&:focus": {
                borderColor: "red",
              }
        })
    }

    render(){
        const items = this.state.searchResults.map(item => (<li key={uid(item)}>{item.name}</li>))

        const slotOptions = [{value: "all", label: "All Slots"}, {value: "1", label: "1"}, {value: "2", label: "2"}, {value: "3", label: "3"}, {value: "4", label: "4"},]
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

        return(
            <div id="mainDiv">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <div id="searchDiv">
                    <div id="searchBarDiv">
                        <SearchBar textFieldID={"searchbar"} searchTerm={"skillList"}
                                searchFunction={getSkillList} value={this.state.searchbarText}
                                parentContext={this} onChange={this.handleInput}
                                onSearch={this.onSearchAction}></SearchBar>
                    </div>
                   
                    <div id="filtersDiv">
                        <h1 id="filtersHeader">Filters:</h1>
                        <Select name="slotsSelect" onChange={(e) => {this.changeSlotSelect(e)}} className={"slotSelect"} placeholder={"Slots"} styles={this.customSlotSelectStyles} options={slotOptions} />
                        <Select name="raritySelect" onChange={(e) => {this.changeRaritySelect(e)}} className={"raritySelect"} placeholder={"Rarity"} styles={this.customRaritySelectStyles} options={rarityOptions} />
                    </div>

                    <ul>{items}</ul>
                </div>
                

            </div>
        )
    }
}

export default withRouter(SkillToGemPage);
