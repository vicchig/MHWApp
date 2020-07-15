import React from 'react';
import Navbar from './../../IndividualComponents/Navbar'
import { withRouter } from 'react-router-dom';
import "./style.css"

class WebsiteHeader extends React.Component{
    render(){
        const {pageName, parentContext} = this.props

        return(
            <div id="websiteHeaderDiv">
                <div id="headerContainer">
                    <header className="mainHeader">
                        MHW Info App
                    </header>
                </div>
                
                <Navbar id={"navbar"} pageName={pageName} context={parentContext}/>
            </div>   
        )
    }
}

export default withRouter(WebsiteHeader);

