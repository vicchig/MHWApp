import React from 'react';
import { withRouter } from 'react-router-dom';
import "./style.css"
import { uid } from 'react-uid';

class NewsItemCard extends React.Component{
    render(){
        const {contents, date} = this.props
        console.log(contents)
        const textItems = contents.map((content) => (
            <li key={uid(content)}>{content}</li>
        ))
        return(
            <div id="newsItemCard_mainDiv">
                <div id="newsItemCard_dateDiv">
                    {"Date: " + date}
                </div>
                <div id="newsItemCard_contentDiv">
                    <ul>{textItems}</ul>
                </div>
                
            </div>
        )
    }
}

export default withRouter(NewsItemCard);
