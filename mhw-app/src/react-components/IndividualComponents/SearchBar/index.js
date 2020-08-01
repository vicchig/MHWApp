import React from 'react';
import { withRouter } from 'react-router-dom';
import CustomTextField from './../CustomTextField'
import CustomButton from './../CustomButton'
import { uid } from 'react-uid';
import {getMatchingDistance} from '../../../actions/algorithms'
import SearchSuggestionCard from '../SearchSuggestionCard/'
import "./style.css"

class SearchBar extends React.Component{

    state = {
        suggestions: []
    }

    handleChange = async (e) => {
        this.props.onChange(e)

        let result = await this.props.searchFunction().catch(err => {
            console.error("An error occurred while awaiting server response:\n\n" + err)
        })
        if (result.status === 200 || result.status === 304){
            if(this.props.value === ""){
                this.setState({
                    suggestions: []
                })
            }
            else{
                this.setState({
                    suggestions: this.computeBestMatches(this.props.value, result.data[this.props.searchTerm])
                })
            }
        }
    }

    computeBestMatches = (searchTerm, possibilities) => {
        let topSuggestions = []
        possibilities.forEach(word => {
            let distance = getMatchingDistance(searchTerm, word.name) 
            if(distance > 0.75 || (distance > 0.6 && this.props.value.length <= 2)){
                topSuggestions.push({text: word.name, rank: distance})
            }
        });

        topSuggestions.sort((a, b) => {if (a.rank < b.rank) return 1; else return -1})
        let sortedSuggestions = []
        topSuggestions.forEach(result => {
            sortedSuggestions.push(result.text)
        });
        return sortedSuggestions
    }

    onLoseFocus = () => {
        this.setState({suggestions: []})
    }

    render(){
        const {value, textFieldID, parentContext} = this.props

        const suggestions = this.state.suggestions.map(item => (<li key={uid(item)}><SearchSuggestionCard parentContext={this} searchContext={parentContext} content={item}/></li>))

        return(
            <div id="mainSearchBarDiv">
                <CustomTextField
                    placeholder={"Search for skill"}
                    width={"90%"}
                    hoverBorderColour={"rgb(161, 184, 98)"}
                    focusedBorderColour={"rgb(180, 180, 180)"}
                    regularBorderColour={"rgb(100, 100, 100)"}
                    borderWidthFocused={"2pt"}
                    name={"searchbarText"}
                    value={value}
                    onChange={(e) => {this.handleChange(e)}}
                    id={textFieldID}
                    gridColStart={1}
                    gridColEnd={2}
                    gridRowStart={1}
                    gridRowEnd={1}
                    justifySelf={"center"}
                    alignSelf={"center"}
                    onBlur={this.onLoseFocus}
                >
                </CustomTextField>
                <CustomButton
                    width={"100px"}
                    height={"55px"}
                    buttonText={"Search"}
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
                />
                <ul id="suggestionList">
                    {suggestions}
                </ul>

            </div>
        )
    }
}

export default withRouter(SearchBar);