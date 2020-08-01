import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SearchBar from './../../IndividualComponents/SearchBar'
import {getSkillList} from '../../../actions/dataActions'
import {getDecorationsWSkill} from '../../../actions/mhwActions'
import { uid } from 'react-uid';
import { processErrorWNav } from '../../../actions/utilities';

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
            filters: {slot: "2", rarity:"all", skill:this.state.searchbarText}
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

    render(){
        const items = this.state.searchResults.map(item => (<li key={uid(item)}>{item.name}</li>))

        return(
            <div id="mainDiv">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <SearchBar textFieldID={"searchbar"} searchTerm={"skillList"}
                           searchFunction={getSkillList} value={this.state.searchbarText}
                           parentContext={this} onChange={this.handleInput}
                           onSearch={this.onSearchAction}></SearchBar>
                <ul>{items}</ul>
            </div>
        )
    }
}

export default withRouter(SkillToGemPage);
