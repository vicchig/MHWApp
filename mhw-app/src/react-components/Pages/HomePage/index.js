import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './../../IndividualComponents/Navbar'
import NewsItemScroll from './../../IndividualComponents/NewsItemScroll'
import CustomButton from './../../IndividualComponents/CustomButton'
import "./style.css"


class HomePage extends React.Component{
    render(){
        return(
            <div id="mainDiv">
                <div id="headerContainer">
                    <header className="mainHeader">
                        MHW Info App
                    </header>
                </div>
                
                <Navbar id={"navbar"}/>

                <div id="newsfeed_mainDiv">
                    <h3 id="newsfeed_header">
                            Updates
                    </h3>
                    <div id="newsfeedContainer">
                    <NewsItemScroll></NewsItemScroll>
                </div>
                </div>
                

                
            </div>
        )
    }
}

export default withRouter(HomePage);
