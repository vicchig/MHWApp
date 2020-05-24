import React from 'react';
import Navbar from './../../IndividualComponents/Navbar'
import { withRouter } from 'react-router-dom';
import "./style.css"

class WebsiteHeader extends React.Component{
    render(){
        return(
            <div id="websiteHeaderDiv">
                <div id="headerContainer">
                    <header className="mainHeader">
                        MHW Info App
                    </header>
                </div>
                
                <Navbar id={"navbar"}/>
            </div>   
        )
    }
}

export default withRouter(WebsiteHeader);

