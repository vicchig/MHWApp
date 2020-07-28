import React from 'react';
import { withRouter } from 'react-router-dom';
import CustomTextField from './../CustomTextField'
import CustomButton from './../CustomButton'
import { uid } from 'react-uid';
import "./style.css"

class SearchBar extends React.Component{

    state = {

    }

    handleChange = (e) => {
        this.props.onChange(e)

        this.testAction()
    }

    testAction = () => {
        var fs=require('fs');
        var data=fs.readFileSync('../../../Data/decorationNames.json', 'utf8');
        var words=JSON.parse(data);
        console.log(words)
    }

    
    render(){
        const {onChange, value, textFieldID} = this.props

        const list = ["1", "2", "3"]
        const testDiv = list.map(item => (<li key={uid(item)}>{item}</li>))

        return(
            <div id="mainSearchBarDiv">
                <CustomTextField
                    placeholder={"Search for skill"}
                    width={"90%"}
                    hoverBorderColour={"rgb(161, 184, 98)"}
                    focusedBorderColour={"rgb(180, 180, 180)"}
                    regularBorderColour={"rgb(100, 100, 100)"}
                    borderWidthFocused={"2pt"}
                    name={"searchbarText"}
                    value={value}
                    onChange={(e) => {this.handleChange(e)}}
                    id={textFieldID}
                    gridColStart={1}
                    gridColEnd={2}
                    gridRowStart={1}
                    gridRowEnd={1}
                    justifySelf={"center"}
                    alignSelf={"center"}
                >
                </CustomTextField>
                <CustomButton
                    width={"100px"}
                    height={"55px"}
                    buttonText={"Search"}
                    borderColor={"rgb(161, 184, 98)"}
                    hoverColor={"rgb(79, 79, 79)"}
                    textColor={'rgb(161, 184, 98)'}
                    variant={"outlined"}
                    gridColStart={2}
                    gridColEnd={2}
                    gridRowStart={1}
                    gridRowEnd={1}
                    alignSelf={"center"}
                    justifySelf={"start"}
                />
                <ul>
                    {testDiv}
                </ul>

            </div>
        )
    }
}

export default withRouter(SearchBar);