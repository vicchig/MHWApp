import React from 'react';
import { withRouter } from 'react-router-dom';
import "./style.css"
import { uid } from 'react-uid';
import CustomButton from '../CustomButton'


class NewsItemCard extends React.Component{

    state = {
        displaySaveButton: false,
        displayEditButton: true
    }

    render(){
        const {contents, date, appContext, handleDelete} = this.props
        
        const textItems = contents.map((content) => (
            <li key={uid(content)}>{content}</li>
        ))
        
        const dateObj = new Date(date)
        const formattedDate = dateObj.toString().split("GMT")[0]

        const editButton =  <CustomButton
                                buttonText={"Edit"}
                                borderColor={"rgb(133, 156, 72)"}
                                hoverColor={"rgb(79, 79, 79)"}
                                textColor={'rgb(133, 156, 72)'}
                                backgroundColor={"rgb(110, 110, 110)"}
                                variant={"outlined"}
                                alignSelf={"center"}
                                justifySelf={"center"}
                                marginBottom={"3pt"}
                                fontSize={"8pt"}
                                width={"4vw"}
                            ></CustomButton>
        const saveButton =  <CustomButton
                                buttonText={"Save"}
                                borderColor={"rgb(133, 156, 72)"}
                                hoverColor={"rgb(79, 79, 79)"}
                                textColor={'rgb(133, 156, 72)'}
                                backgroundColor={"rgb(110, 110, 110)"}
                                variant={"outlined"}
                                alignSelf={"center"}
                                justifySelf={"center"}
                                marginBottom={"3pt"}
                                fontSize={"8pt"}
                                width={"4vw"}
                            ></CustomButton>
        
        const deleteButton = <CustomButton
                                buttonText={"Delete"}
                                display={"block"}
                                buttonText={"Delete"}
                                borderColor={"rgb(133, 156, 72)"}
                                hoverColor={"rgb(79, 79, 79)"}
                                textColor={'rgb(133, 156, 72)'}
                                backgroundColor={"rgb(110, 110, 110)"}
                                variant={"outlined"}
                                alignSelf={"center"}
                                justifySelf={"center"}
                                fontSize={"8pt"}
                                width={"4vw"}
                                onClick={handleDelete}
                             ></CustomButton>

        return(
                <div id="newsItemCard_mainDiv">
                    <div id="newsItemCard_secondaryDiv">
                        <div id="newsItemCard_dateDiv">
                            {"Date: " + formattedDate}
                        </div>
                        <div id="newsItemCard_contentDiv">
                            <ul>{textItems}</ul>
                        </div>
                    </div>
                    <div id="buttonDiv">
                        {this.state.displaySaveButton && appContext.state.loggedInUser ? saveButton : null}
                        {this.state.displayEditButton && appContext.state.loggedInUser ? editButton : null}
                        {appContext.state.loggedInUser ? deleteButton : null}
                    </div>
                </div>        
        )
    }
}

export default withRouter(NewsItemCard);
