import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SearchBar from './../../IndividualComponents/SearchBar'
import "./style.css"

class SkillToGemPage extends React.Component{
    render(){
        return(
            <div id="mainDiv">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <SearchBar/>
                

                
            </div>
        )
    }
}

export default withRouter(SkillToGemPage);
