import './style.css'
import { withRouter } from 'react-router-dom';
import React from 'react';
import CustomTextField from "../CustomTextField"
import CustomButton from "../CustomButton"
import IconButton from "@material-ui/core/IconButton";
import {Clear} from '@material-ui/icons'
import {createItem} from '../../../actions/newsitemActions'
import {processErrorWNav} from '../../../actions/utilities'

class CreateCardFloat extends React.Component {

    state = {
        newCardText: ""
    }

    handleTextChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClickCreateButton = () => {
        this.props.parentContext.setState({
            displayCardCreationFloat: false
        }, async () => {
            let res = await createItem(this.state.newCardText).catch(err => {
                console.error("An error occured")
            })
            if (res.status === 200) console.log("Add to other items")
            else processErrorWNav(this, res.status, res.errorMsg)
            window.location.reload(false)

        })
    }

    render(){
        const {parentContext} = this.props
        
        return(
            <div id="mainCardFloatDiv">
                <div id="layoutDivCreateCard">
                    <h2 id="titleHeader">New News Card</h2>
                    <CustomTextField
                        gridColStart={"2"}
                        gridColEnd={"3"}
                        gridRowStart={"2"}
                        gridRowEnd={"3"}
                        hoverBorderColour={"rgb(133, 156, 72)"}
                        regularBorderColour={"rgb(120, 120, 120)"}
                        focusedBorderColour={"rgb(100, 100, 100)"}
                        labelFocusedColour={"rgb(100, 100, 100)"}
                        justifySelf={"center"}
                        alignSelf={"top"}
                        borderWidthFocused={"2pt"}
                        borderWidthHover={"2pt"}
                        name={"newCardText"}
                        width={"100%"}
                        rows={3}
                        multiline={true}
                        value={this.state.newCardText}
                        onChange={(e) => {this.handleTextChange(e)}}
                    ></CustomTextField>
                    <CustomButton
                        gridRowStart={3}
                        gridRowEnd={3}
                        gridColStart={2}
                        gridColEnd={3}
                        buttonText={"Create"}
                        borderColor={"rgb(133, 156, 72)"}
                        hoverColor={"rgb(79, 79, 79)"}
                        textColor={'rgb(133, 156, 72)'}
                        backgroundColor={"rgb(110, 110, 110)"}
                        variant={"outlined"}
                        marginBottom={"3pt"}
                        fontSize={"8pt"}
                        width={"8vw"}
                        alignSelf={"center"}
                        justifySelf={"center"}
                        onClick={this.handleClickCreateButton}
                    ></CustomButton>

                    <IconButton
                        onClick={() => {parentContext.setState({displayCardCreationFloat: false})}}
                    >
                        <Clear
                            width={"5pt"}
                        ></Clear>
                    </IconButton>
                </div>
            </div>

        )
    }

}

export default withRouter(CreateCardFloat);