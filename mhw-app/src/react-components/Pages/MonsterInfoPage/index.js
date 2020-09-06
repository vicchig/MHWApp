import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SearchBar from './../../IndividualComponents/SearchBar'
import {processErrorWNav} from '../../../actions/utilities'
import { uid } from 'react-uid';
import './style.css'


class MonsterInfoPage extends React.Component{

    state = {
        searchbarText: "",
    }

    handleSearchSelect = (e) => {
        
    }

    render(){

        return(
            <div id="mainDiv">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <div id="searchbarDiv">
                    <SearchBar id={"searchbar1"} textFieldID={"searchbar"} buttonText={"Search"}     
                               parentContext={this} onSetSelect={this.handleSearchSelect} placeholder={"Select a monster..."}
                               
                    ></SearchBar>
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
