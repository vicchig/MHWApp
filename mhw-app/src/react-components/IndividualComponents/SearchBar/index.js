import React from 'react';
import { withRouter } from 'react-router-dom';
import CustomButton from './../CustomButton'
import {getMatchingDistance} from '../../../actions/algorithms'
import AsyncSelect from 'react-select/async'
import "./style.css"

class SearchBar extends React.Component{

    state = {
        suggestions: [],
        showSuggestions: true,
        inputText: ""
    }

    loadOptions = async () => {

        let result = await this.props.searchFunction(this.props.searchCategory).catch(err => {
            console.error("An error occured")
        })
        if (result.status === 200 || result.status === 304){
            return this.computeBestMatches(this.state.inputText, result.data[this.props.dataObjectName])
        }
    }

    computeBestMatches = (searchTerm, possibilities) => {
        let topSuggestions = []
        possibilities.forEach(obj => {
            let distance = getMatchingDistance(searchTerm, obj.name) 
            if(distance > 0.75 || (distance > 0.6 && this.state.inputText.length <= 2)){
                let suggestion = {rank: distance}
                this.props.searchObjectProperties.forEach(property => {
                    suggestion[property] = obj?.[property] ?? ""
                })
                topSuggestions.push(suggestion)
            }
        });

        topSuggestions.sort((a, b) => {if (a.rank < b.rank) return 1; else return -1})
        let sortedSuggestions = []
        topSuggestions.forEach(result => {
            let finalSuggestionObject = {}
            Object.keys(result).forEach(key => {
                if(key !== "rank") finalSuggestionObject[key] = result[key]
            })
            if(this.props.isMulti) sortedSuggestions.push({value: JSON.stringify(finalSuggestionObject), label: result.name})
            else sortedSuggestions.push({value: finalSuggestionObject, label: result.name})
        });
        return sortedSuggestions
    }

    customSelectStyles = {
        menu: (provided, state) => ({
          ...provided,
          backgroundColor: "rgb(100, 100, 100)",
        }),
        option: (provided, state) => ({
          "&:hover": {
            backgroundColor: "rgb(120, 120, 120)",
            gridColumnStart: 1,
            gridColumnEnd: 1,
            gridRowStart: 1,
            gridRowEnd: 1,
            justifySelf: "center",
            alignSelf: "center"
          },
          color: "rgb(161, 184, 98)",
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
            color: "rgb(161, 184, 98)",
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            color: "rgb(161, 184, 98)",
        }),
        input: (provided, state) => ({
            ...provided,
            color: "rgb(161, 184, 98)"
        })
    }

    render(){
        const {onSearch, id, buttonText, hasButton, placeholder, isMulti, className} = this.props
        return(
            <div id={id}>
                <div className={"mainSearchBarDiv-" + className}>
                    <AsyncSelect 
                        styles={this.customSelectStyles}
                        className={"searchbarSelect"}
                        placeholder={placeholder}
                        onInputChange={(input) => this.setState({inputText: input})}
                        onChange={(e) => {this.props.onSetSelect(e)}}
                        loadOptions={this.loadOptions}
                        name={"searchbarText"}
                        blurInputOnSelect={true}
                        isMulti={isMulti}
                    ></AsyncSelect>
                    {(hasButton ?? false) ? <CustomButton
                        width={"3vw"}
                        height={"3vh"}
                        buttonText={buttonText}
                        borderColor={"rgb(161, 184, 98)"}
                        hoverColor={"rgb(79, 79, 79)"}
                        textColor={'rgb(161, 184, 98)'}
                        variant={"outlined"}
                        gridColStart={2}
                        gridColEnd={2}
                        gridRowStart={1}
                        gridRowEnd={1}
                        alignSelf={"center"}
                        justifySelf={"start"}
                        left={"1vw"}
                        onClick={onSearch}
                    /> : null }


                </div>
            </div>
        )
    }
}

export default withRouter(SearchBar);