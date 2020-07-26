import React from 'react';
import { withRouter } from 'react-router-dom';
import NewsItemScroll from './../../IndividualComponents/NewsItemScroll'
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SignInFloat from './../../IndividualComponents/SignInFloat'
import CustomButton from '../../IndividualComponents/CustomButton'
import CreateCardFloat from '../../IndividualComponents/CreateCardFloat'
import "./style.css"


class HomePage extends React.Component{

    state = {
        displaySignInFloat: false,
        dispalyHintText: false,
        displayCardCreationFloat: false
    }

    handleSignInWrapper = (username, password) => {
       this.props.parentContext.handleSignIn(username, password, 
        () => {
           this.setState({
            displaySignInFloat: false,
            dispalyHintText: false
           })
        },
        () => {
          this.setState({displayHintText: true})  
        },
        (page) => {
            this.props.history.push(page)
        }
       )
    }

    render(){
        const createButton = <div id="createButton">
                                <CustomButton
                                     buttonText={"New"}
                                     borderColor={"rgb(133, 156, 72)"}
                                     hoverColor={"rgb(79, 79, 79)"}
                                     textColor={'rgb(133, 156, 72)'}
                                     backgroundColor={"rgb(110, 110, 110)"}
                                     variant={"outlined"}
                                     fontSize={"8pt"}
                                     onClick={() => {this.setState({displayCardCreationFloat: true})}}
                                ></CustomButton>
                            </div>

        return(
            <div id="mainDiv">
                <WebsiteHeader pageName={"home"} parentContext={this} appContext={this.props.parentContext}/>

                <div id="newsfeed_mainDiv">
                    <h3 id="newsfeed_header">
                            Updates
                    </h3>
                        <NewsItemScroll history={this.props.history} appContext={this.props.parentContext}></NewsItemScroll>
                        {this.props.parentContext.state.loggedInUser ? createButton : null}
                </div>
                
                {this.state.displaySignInFloat ? <SignInFloat parentContext={this} displayHintText={this.state.displayHintText}/> : null}
                {this.state.displayCardCreationFloat ? <CreateCardFloat parentContext={this}/> : null}
            </div>
        )
    }
}

export default withRouter(HomePage);
