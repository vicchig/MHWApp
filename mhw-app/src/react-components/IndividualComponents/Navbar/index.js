import React from "react";
import "./style.css";
import CustomButton from "./../CustomButton"
import { withRouter } from 'react-router-dom';
import {logOut, readCookie} from '../../../actions/accActions'
import {processErrorWNav} from '../../../actions/utilities'

class Navbar extends React.Component{

    switchpage = (pagename) => {
        const { history } = this.props;
		history.push('/'+pagename, this.state)
    }

    handleLogOut = async () => {
        let response = await logOut().catch((err) => {
            console.error(`Could not log out due to an error. \n ${err}`)
        })

        if(response.status != 200) processErrorWNav(this, response.status, response.errorMsg)
        else{
            this.props.appContext.setState({loggedInUser: null})
            this.props.history.push("/")
        }
    }

	render(){
        const {pageName, context, appContext} = this.props

		return (
			<div id="navbarDiv">
				<CustomButton id={"homeButton"}
                              border={"solid"}
                              textColor={"rgb(161, 184, 98)"}
                              height={"30px"}
                              width={"150px"}
                              borderColor={"rgb(164, 164, 164)"}
                              fontSize={"10pt"}
                              position={"absolute"}
							  buttonText={"Home"}
							  position={"relative"}
							  borderRadius={"10px"}
							  hoverColor={"rgb(74, 74, 74)"}
                              hoverTextColor={"rgb(161, 184, 98)"}
                              onClick={() => {this.switchpage("")}}
                ></CustomButton>
				<CustomButton id={"skillToGemButton"}
                              border={"solid"}
                              textColor={"rgb(161, 184, 98)"}
                              height={"30px"}
                              width={"150px"}
                              borderColor={"rgb(164, 164, 164)"}
                              fontSize={"10pt"}
                              position={"absolute"}
							  buttonText={"Skill to Deco"}
							  position={"relative"}
							  borderRadius={"10px"}
							  hoverColor={"rgb(74, 74, 74)"}
                              hoverTextColor={"rgb(161, 184, 98)"}
                              onClick={() => {this.switchpage("skillToGem")}}
                ></CustomButton>
				<CustomButton id={"armourMatsButton"}
                              border={"solid"}
                              textColor={"rgb(161, 184, 98)"}
                              height={"30px"}
                              width={"150px"}
                              borderColor={"rgb(164, 164, 164)"}
                              fontSize={"10pt"}
                              position={"absolute"}
							  buttonText={"Equipment Materials"}
							  position={"relative"}
							  borderRadius={"10px"}
							  hoverColor={"rgb(74, 74, 74)"}
                              hoverTextColor={"rgb(161, 184, 98)"}
                              onClick={() => {this.switchpage("mats")}}
                ></CustomButton>
				<CustomButton id={"monsterInfoButton"}
                              border={"solid"}
                              textColor={"rgb(161, 184, 98)"}
                              height={"30px"}
                              width={"150px"}
                              borderColor={"rgb(164, 164, 164)"}
                              fontSize={"10pt"}
                              position={"absolute"}
							  buttonText={"Monster Info"}
							  position={"relative"}
							  borderRadius={"10px"}
							  hoverColor={"rgb(74, 74, 74)"}
                              hoverTextColor={"rgb(161, 184, 98)"}
                              onClick={() => {this.switchpage("monsters")}}
                ></CustomButton>

                <CustomButton id={"augmentInfoButton"}
                  border={"solid"}
                  textColor={"rgb(161, 184, 98)"}
                  height={"30px"}
                  width={"150px"}
                  borderColor={"rgb(164, 164, 164)"}
                  fontSize={"10pt"}
                  position={"absolute"}
                  buttonText={"Augments"}
                  position={"relative"}
                  borderRadius={"10px"}
                  hoverColor={"rgb(74, 74, 74)"}
                  hoverTextColor={"rgb(161, 184, 98)"}
                  onClick={() => {this.switchpage("augments")}}
                ></CustomButton>

                <CustomButton id={"aboutButton"}
                  border={"solid"}
                  textColor={"rgb(161, 184, 98)"}
                  height={"30px"}
                  width={"150px"}
                  borderColor={"rgb(164, 164, 164)"}
                  fontSize={"10pt"}
                  position={"absolute"}
							    buttonText={"About"}
                  position={"relative"}
                  borderRadius={"10px"}
                  hoverColor={"rgb(74, 74, 74)"}
                  hoverTextColor={"rgb(161, 184, 98)"}
                  onClick={() => {this.switchpage("about")}}
                >
                </CustomButton>

                {pageName === 'home' && !appContext.state.loggedInUser ? 
                    <CustomButton id={"signInButton"}
                        border={"solid"}
                        textColor={"rgb(161, 184, 98)"}
                        height={"30px"}
                        width={"150px"}
                        borderColor={"rgb(164, 164, 164)"}
                        fontSize={"10pt"}
                        position={"absolute"}
                        buttonText={"Sign In"}
                        position={"relative"}
                        borderRadius={"10px"}
                        hoverColor={"rgb(74, 74, 74)"}
                        hoverTextColor={"rgb(161, 184, 98)"}
                        justifySelf={"end"}
                        onClick={() => {context.setState({displaySignInFloat: true})}}
                    ></CustomButton>
        
                    : null
                }
                {appContext.state.loggedInUser ? 
                    <CustomButton id={"logoutButton"}
                        border={"solid"}
                        textColor={"rgb(161, 184, 98)"}
                        height={"30px"}
                        width={"150px"}
                        borderColor={"rgb(164, 164, 164)"}
                        fontSize={"10pt"}
                        position={"absolute"}
                        buttonText={"Log out"}
                        position={"relative"}
                        borderRadius={"10px"}
                        hoverColor={"rgb(74, 74, 74)"}
                        hoverTextColor={"rgb(161, 184, 98)"}
                        justifySelf={"end"}
                        onClick={this.handleLogOut}
                    ></CustomButton>
        
                    : null
                }
			</div>
		)
	}
	
}


			

export default withRouter(Navbar);