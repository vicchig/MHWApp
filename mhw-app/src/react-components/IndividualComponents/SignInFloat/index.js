import './style.css'
import { withRouter } from 'react-router-dom';
import React from 'react';
import CustomTextField from "../CustomTextField"
import CustomButton from "../CustomButton"
import IconButton from "@material-ui/core/IconButton";
import {Clear} from '@material-ui/icons'

class SignInFloat extends React.Component {

    state = {
        username: "",
        password: ""
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    makeSignInRequest = () => {
        this.props.parentContext.handleSignInWrapper(this.state.username, this.state.password)
    }

    render(){
        const {parentContext, displayHintText} = this.props
        
        return(
            <div id="signInFloat">
                <div id="layoutDiv">
                    <h1 id={"signInHeader"}>Sign In</h1>
                  
                    <CustomTextField
                        hoverBorderColour={"rgb(133, 156, 72)"}
                        regularBorderColour={"rgb(120, 120, 120)"}
                        focusedBorderColour={"rgb(100, 100, 100)"}
                        labelFocusedColour={"rgb(100, 100, 100)"}
                        gridColStart={"2"}
                        gridColEnd={"3"}
                        gridRowStart={"3"}
                        gridRowEnd={"4"}
                        justifySelf={"center"}
                        alignSelf={"top"}
                        label={"username"}
                        width={"70%"}
                        borderWidthFocused={"2pt"}
                        onChange={this.handleOnChange}
                        value={this.state.username}
                        name={"username"}
                    ></CustomTextField>

                    <CustomTextField id={"passwordInput"}
                        hoverBorderColour={"rgb(133, 156, 72)"}
                        regularBorderColour={"rgb(120, 120, 120)"}
                        focusedBorderColour={"rgb(100, 100, 100)"}
                        labelFocusedColour={"rgb(100, 100, 100)"}
                        width={"70%"}
                        gridColStart={"2"}
                        gridColEnd={"3"}
                        gridRowStart={"4"}
                        gridRowEnd={"5"}
                        justifySelf={"center"}
                        alignSelf={"top"}
                        label={"password"}
                        type={"password"}
                        borderWidthFocused={"2pt"}
                        name={"password"}
                        onChange={this.handleOnChange}
                        value={this.state.password}
                    ></CustomTextField>
                    
                    <CustomButton
                        width={"100px"}
                        height={"55px"}
                        buttonText={"Sign In"}
                        borderColor={"rgb(133, 156, 72)"}
                        hoverColor={"rgb(79, 79, 79)"}
                        textColor={'rgb(133, 156, 72)'}
                        backgroundColor={"rgb(110, 110, 110)"}
                        gridRowStart={5}
                        gridRowEnd={6}
                        gridColStart={2}
                        gridColEnd={3}
                        variant={"outlined"}
                        alignSelf={"center"}
                        justifySelf={"center"}
                        onClick={() => {this.makeSignInRequest()}}
                    ></CustomButton>

                    <IconButton
                        onClick={() => {parentContext.setState({displaySignInFloat: false})}}
                    >
                        <Clear
                            width={"5pt"}
                        ></Clear>
                    </IconButton>

                    {displayHintText ? 
                        <span id='hintText'>
                            Wrong password and/or username!
                        </span> 

                        : null
                    }

                    
                </div>

            </div>
        )
    }

}

export default withRouter(SignInFloat);