import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SearchBar from './../../IndividualComponents/SearchBar'
import "./style.css"

class SkillToGemPage extends React.Component{

    state = {
        searchbarText: ""
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <div id="mainDiv">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <SearchBar textFieldID={"searchbar"} value={this.state.searchbarText} onChange={this.handleInput}/>
                

                
            </div>
        )
    }
}

export default withRouter(SkillToGemPage);
