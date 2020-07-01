import React from 'react';
import { withRouter } from 'react-router-dom';
import "./style.css"
import { uid } from 'react-uid';

class NewsItemCard extends React.Component{
    render(){
        const {contents, date} = this.props
        
        const textItems = contents.map((content) => (
            <li key={uid(content)}>{content}</li>
        ))
        
        const dateObj = new Date(date)
        const formattedDate = dateObj.toString().split("GMT")[0]

        return(
            <div id="newsItemCard_mainDiv">
                <div id="newsItemCard_dateDiv">
                    {"Date: " + formattedDate}
                </div>
                <div id="newsItemCard_contentDiv">
                    <ul>{textItems}</ul>
                </div>
                
            </div>
        )
    }
}

export default withRouter(NewsItemCard);
