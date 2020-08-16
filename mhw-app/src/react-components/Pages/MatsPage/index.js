import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SearchBar from './../../IndividualComponents/SearchBar'
import {getData} from '../../../actions/dataActions'
import './style.css'


class MatsPage extends React.Component{

    state = {
        searchbarText: "",
    }

    handleSearchSelect = (e) => {
        this.setState({
            searchbarText: e.value
        })
    }

    render(){
        return(
            <div id="mainDiv">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <div id="searchbarDiv">
                    <SearchBar id={"searchbar1"} textFieldID={"searchbar"} buttonText={"Add"} searchFunction={getData} searchCategory={"equipmentNames"}      
                               parentContext={this} dataObjectName={"dataList"} onSetSelect={this.handleSearchSelect}
                    ></SearchBar>
                </div>
            </div>
        )
    }
}

export default withRouter(MatsPage);
