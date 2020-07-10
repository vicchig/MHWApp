import React from 'react';
import { withRouter } from 'react-router-dom';
import NewsItemScroll from './../../IndividualComponents/NewsItemScroll'
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SignInFloat from './../../IndividualComponents/SignInFloat'
import "./style.css"


class HomePage extends React.Component{

    state = {
        displaySignInFloat: false
    }

    render(){
        return(
            <div id="mainDiv">
                <WebsiteHeader page={"home"}/>

                <div id="newsfeed_mainDiv">
                    <h3 id="newsfeed_header">
                            Updates
                    </h3>
                    <div id="newsfeedContainer">
                    <NewsItemScroll history={this.props.history}></NewsItemScroll>
                </div>
                </div>
                
                {this.state.displaySignInFloat ? <SignInFloat/> : null}
                
            </div>
        )
    }
}

export default withRouter(HomePage);
