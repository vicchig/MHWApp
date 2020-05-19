import React from "react";
import "./style.css";
import CustomButton from "./../CustomButton"
import { withRouter } from 'react-router-dom';

class Navbar extends React.Component{
	render(){
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
                ></CustomButton>
				<CustomButton id={"monstHpButton"}
                              border={"solid"}
                              textColor={"rgb(161, 184, 98)"}
                              height={"30px"}
                              width={"150px"}
                              borderColor={"rgb(164, 164, 164)"}
                              fontSize={"10pt"}
                              position={"absolute"}
							  buttonText={"Skill to Gem"}
							  position={"relative"}
							  borderRadius={"10px"}
							  hoverColor={"rgb(74, 74, 74)"}
							  hoverTextColor={"rgb(161, 184, 98)"}
                ></CustomButton>
				<CustomButton id={"monstHpButton"}
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
                ></CustomButton>
				<CustomButton id={"monstHpButton"}
                              border={"solid"}
                              textColor={"rgb(161, 184, 98)"}
                              height={"30px"}
                              width={"150px"}
                              borderColor={"rgb(164, 164, 164)"}
                              fontSize={"10pt"}
                              position={"absolute"}
							  buttonText={"More"}
							  position={"relative"}
							  borderRadius={"10px"}
							  hoverColor={"rgb(74, 74, 74)"}
							  hoverTextColor={"rgb(161, 184, 98)"}
                ></CustomButton>
			</div>
		)
	}
	
}


			

export default withRouter(Navbar);