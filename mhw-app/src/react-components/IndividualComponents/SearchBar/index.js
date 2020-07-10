import React from 'react';
import { withRouter } from 'react-router-dom';
import CustomTextField from './../CustomTextField'
import CustomButton from './../CustomButton'
import "./style.css"

class SearchBar extends React.Component{

    
    
    render(){
        return(
            <div id="mainSearchBarDiv">
                <CustomTextField
                    placeholder={"Search for skill"}
                    width={"65vw"}
                    left={"-150px"}
                    position={"relative"}
                >
                </CustomTextField>
                <CustomButton
                    width={"100px"}
                    height={"55px"}
                    buttonText={"Search"}
                    top={"8px"}
                    left={"-150px"}
                    borderColor={"rgb(161, 184, 98)"}
                    hoverColor={"rgb(79, 79, 79)"}
                    textColor={'rgb(161, 184, 98)'}
                    variant={"outlined"}
                />
            </div>
        )
    }
}

export default withRouter(SearchBar);