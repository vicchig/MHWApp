import React from 'react';
import { withRouter } from 'react-router-dom';
import NewsItemScroll from './../../IndividualComponents/NewsItemScroll'
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import "./style.css"


class HomePage extends React.Component{
    render(){
        return(
            <div id="mainDiv">
                <WebsiteHeader/>

                <div id="newsfeed_mainDiv">
                    <h3 id="newsfeed_header">
                            Updates
                    </h3>
                    <div id="newsfeedContainer">
                    <NewsItemScroll history={this.props.history}></NewsItemScroll>
                </div>
                </div>
                

                
            </div>
        )
    }
}

export default withRouter(HomePage);
