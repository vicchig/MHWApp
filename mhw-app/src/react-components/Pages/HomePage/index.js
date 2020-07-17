import React from 'react';
import { withRouter } from 'react-router-dom';
import NewsItemScroll from './../../IndividualComponents/NewsItemScroll'
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SignInFloat from './../../IndividualComponents/SignInFloat'
import "./style.css"


class HomePage extends React.Component{

    state = {
        displaySignInFloat: false,
        dispalyHintText: false
    }

    handleSignIn = (username, password) => {
       this.props.parentContext.handleSignIn(this, username, password)
    }

    render(){
        return(
            <div id="mainDiv">
                <WebsiteHeader pageName={"home"} parentContext={this}/>

                <div id="newsfeed_mainDiv">
                    <h3 id="newsfeed_header">
                            Updates
                    </h3>
                    <div id="newsfeedContainer">
                    <NewsItemScroll history={this.props.history}></NewsItemScroll>
                </div>
                </div>
                
                {this.state.displaySignInFloat ? <SignInFloat parentContext={this} displayHintText={this.state.displayHintText}/> : null}
                
            </div>
        )
    }
}

export default withRouter(HomePage);
