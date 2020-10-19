import React from 'react';
import { withRouter } from 'react-router-dom';
import "./style.css"
import { uid } from 'react-uid';
import CustomButton from '../CustomButton'
import CustomTextField from '../CustomTextField'


class NewsItemCard extends React.Component{

    state = {
        displaySaveButton: false,
        displayEditButton: true,
        textContent: ""
    }

    handleEditButtonClick = () => {
        this.setState({
            displayEditButton: false,
            displaySaveButton: true
        })
    }

    handleSaveButtonClick = () => {
        this.setState({displayEditButton: true, displaySaveButton: false});
        this.props.handleSave(this.state.textContent)
    }

    handleContentChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    buildContents = (contentsArray) => {
        let contents = ""
        for(let i = 0; i < contentsArray.length; i++){
            contents += contentsArray[i]
            if(i < contentsArray.length - 1){
                contents += "-n"
            }
        }

        return contents
    }

    componentDidMount = () => {
        this.setState({
            textContent: this.buildContents(this.props.contents)
        })
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
                                marginBottom={"3pt"}
                                fontSize={"8pt"}
                                width={"4vw"}
                                onClick={this.handleEditButtonClick}
                            ></CustomButton>

        const saveButton =  <CustomButton
                                buttonText={"Save"}
                                borderColor={"rgb(133, 156, 72)"}
                                hoverColor={"rgb(79, 79, 79)"}
                                textColor={'rgb(133, 156, 72)'}
                                backgroundColor={"rgb(110, 110, 110)"}
                                variant={"outlined"}
                                marginBottom={"3pt"}
                                fontSize={"8pt"}
                                width={"4vw"}
                                onClick={this.handleSaveButtonClick}
                            ></CustomButton>
        
        const deleteButton = <CustomButton
                                buttonText={"Delete"}
                                display={"block"}
                                borderColor={"rgb(133, 156, 72)"}
                                hoverColor={"rgb(79, 79, 79)"}
                                textColor={'rgb(133, 156, 72)'}
                                backgroundColor={"rgb(110, 110, 110)"}
                                variant={"outlined"}
                                fontSize={"8pt"}
                                width={"4vw"}
                                onClick={handleDelete}
                             ></CustomButton>

        const newsCard = <div id="newsItemCard_secondaryDiv">
                            <div id="newsItemCard_dateDiv">
                                {"Date: " + formattedDate}
                            </div>
                            <div id="newsItemCard_contentDiv">
                                <ul>{textItems}</ul>
                            </div>
                         </div>
        
        const editArea = <div className={"cardEditDiv"}>
                            <CustomTextField
                                hoverBorderColour={"rgb(133, 156, 72)"}
                                regularBorderColour={"rgb(80, 80, 80)"}
                                focusedBorderColour={"rgb(50, 50, 50)"}
                                labelFocusedColour={"rgb(100, 100, 100)"}
                                type={"text"}
                                onChange={(e) => {this.handleContentChange(e)}}
                                value={this.state.textContent}
                                name={"textContent"}
                                setFocus={true}
                                borderWidthHover={"2px"}
                            ></CustomTextField>
                         </div>

        return(
            <div id="newsItemCard_mainDiv">
                {this.state.displaySaveButton ? editArea : newsCard}
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
