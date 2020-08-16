import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SearchBar from './../../IndividualComponents/SearchBar'
import {getData} from '../../../actions/dataActions'
import './style.css'


class MatsPage extends React.Component{

    state = {
        searchbarText: "",
        selectedItems: [],
    }

    handleSearchSelect = (e) => {
        const currentlySelected = this.state.selectedItems
        currentlySelected.push(e.value)
        this.setState({
            searchbarText: e.value,
            selectedItems: currentlySelected
        })
    }

    render(){
        return(
            <div id="mainDiv">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <div id="searchbarDiv">
                    <SearchBar id={"searchbar1"} textFieldID={"searchbar"} buttonText={"Add"} searchFunction={getData} searchCategory={"equipmentNames"}      
                               parentContext={this} dataObjectName={"dataList"} onSetSelect={this.handleSearchSelect} placeholder={"Select a piece of equipment..."}
                    ></SearchBar>
                </div>
            </div>
        )
    }
}

export default withRouter(MatsPage);
