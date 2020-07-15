import React from "react";
import "./style.css";
import CustomButton from "./../CustomButton"
import { withRouter } from 'react-router-dom';

class Navbar extends React.Component{

    switchpage = (pagename) => {
        const { history } = this.props;
		history.push('/'+pagename, this.state)
    }

	render(){
        const {pageName, context} = this.props

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
							  buttonText={"Armour Mats"}
							  position={"relative"}
							  borderRadius={"10px"}
							  hoverColor={"rgb(74, 74, 74)"}
                              hoverTextColor={"rgb(161, 184, 98)"}
                              onClick={() => {this.switchpage("MonstHP")}}
                ></CustomButton>
				<CustomButton id={"buildSuggestButton"}
                              border={"solid"}
                              textColor={"rgb(161, 184, 98)"}
                              height={"30px"}
                              width={"150px"}
                              borderColor={"rgb(164, 164, 164)"}
                              fontSize={"10pt"}
                              position={"absolute"}
							  buttonText={"Socket Decos"}
							  position={"relative"}
							  borderRadius={"10px"}
							  hoverColor={"rgb(74, 74, 74)"}
							  hoverTextColor={"rgb(161, 184, 98)"}
                ></CustomButton>
                {pageName === 'home' ? 
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
			</div>
		)
	}
	
}


			

export default withRouter(Navbar);