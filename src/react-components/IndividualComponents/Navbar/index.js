import React from "react";
import "./style.css";
import CustomButton from "./../CustomButton"
import { withRouter } from 'react-router-dom';
import {logOut} from '../../../actions/accActions'
import {processErrorWNav} from '../../../actions/utilities'

class Navbar extends React.Component{

    switchpage = (pagename) => {
        const { history } = this.props;
		history.push('/'+pagename, this.state)
    }

    handleLogOut = async () => {
        let response = await logOut().catch((err) => {
            console.error("An error occured")
        })

        if(response.status !== 200) processErrorWNav(this, response.status, response.errorMsg)
        else{
            this.props.appContext.setState({loggedInUser: null})
            this.props.history.push("/")
        }
    }

	render(){
        const {pageName, context, appContext} = this.props

		return (
			<div className="navbarDiv">
				<CustomButton id={"homeButton"}
                              border={"solid"}
                              textColor={"rgb(161, 184, 98)"}
                              height={"30px"}
                              width={"150px"}
                              borderColor={"rgb(164, 164, 164)"}
                              fontSize={"10pt"}
							  buttonText={"Home"}
							  position={"relative"}
							  borderRadius={"10px"}
							  hoverColor={"rgb(74, 74, 74)"}
                              hoverTextColor={"rgb(161, 184, 98)"}
                              alignSelf={"center"}
                              justifySelf={"center"}
                              margin={"0px 15px 0px 10px"}
                              onClick={() => {this.switchpage("")}}
                ></CustomButton>
				<CustomButton id={"skillToGemButton"}
                              border={"solid"}
                              textColor={"rgb(161, 184, 98)"}
                              height={"30px"}
                              width={"150px"}
                              borderColor={"rgb(164, 164, 164)"}
                              fontSize={"10pt"}
							  buttonText={"Skill to Deco"}
							  position={"relative"}
							  borderRadius={"10px"}
							  hoverColor={"rgb(74, 74, 74)"}
                              hoverTextColor={"rgb(161, 184, 98)"}
                              alignSelf={"center"}
                              justifySelf={"center"}
                              onClick={() => {this.switchpage("skillToGem")}}
                ></CustomButton>
				<CustomButton id={"armourMatsButton"}
                              border={"solid"}
                              textColor={"rgb(161, 184, 98)"}
                              height={"30px"}
                              width={"200px"}
                              borderColor={"rgb(164, 164, 164)"}
                              fontSize={"10pt"}
							  buttonText={"Equipment Materials"}
							  borderRadius={"10px"}
							  hoverColor={"rgb(74, 74, 74)"}
                              hoverTextColor={"rgb(161, 184, 98)"}
                              alignSelf={"center"}
                              justifySelf={"center"}
                              onClick={() => {this.switchpage("mats")}}
                ></CustomButton>
				<CustomButton id={"monsterInfoButton"}
                              border={"solid"}
                              textColor={"rgb(161, 184, 98)"}
                              height={"30px"}
                              width={"150px"}
                              borderColor={"rgb(164, 164, 164)"}
                              fontSize={"10pt"}
							  buttonText={"Monster Info"}
							  position={"relative"}
							  borderRadius={"10px"}
							  hoverColor={"rgb(74, 74, 74)"}
                              hoverTextColor={"rgb(161, 184, 98)"}
                              alignSelf={"center"}
                              justifySelf={"center"}
                              onClick={() => {this.switchpage("monsters")}}
                ></CustomButton>

                <CustomButton id={"augmentInfoButton"}
                  border={"solid"}
                  textColor={"rgb(161, 184, 98)"}
                  height={"30px"}
                  width={"150px"}
                  borderColor={"rgb(164, 164, 164)"}
                  fontSize={"10pt"}
                  buttonText={"Augments"}
                  position={"relative"}
                  borderRadius={"10px"}
                  hoverColor={"rgb(74, 74, 74)"}
                  hoverTextColor={"rgb(161, 184, 98)"}
                  alignSelf={"center"}
                  justifySelf={"center"}
                  onClick={() => {this.switchpage("augments")}}
                ></CustomButton>

                <CustomButton id={"aboutButton"}
                  border={"solid"}
                  textColor={"rgb(161, 184, 98)"}
                  height={"30px"}
                  width={"150px"}
                  borderColor={"rgb(164, 164, 164)"}
                  fontSize={"10pt"}
				  buttonText={"About"}
                  position={"relative"}
                  borderRadius={"10px"}
                  hoverColor={"rgb(74, 74, 74)"}
                  hoverTextColor={"rgb(161, 184, 98)"}
                  alignSelf={"center"}
                  justifySelf={"center"}
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
                        buttonText={"Sign In"}
                        borderRadius={"10px"}
                        hoverColor={"rgb(74, 74, 74)"}
                        hoverTextColor={"rgb(161, 184, 98)"}
                        justifySelf={"center"}
                        alignSelf={"center"}
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
                        buttonText={"Log out"}
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