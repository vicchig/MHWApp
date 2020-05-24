import React from 'react';
import { withRouter } from 'react-router-dom';
import "./style.css"

class NewsItemCard extends React.Component{
    render(){
        const {content, date} = this.props
        return(
            <div id="newsItemCard_mainDiv">
                <div id="newsItemCard_dateDiv">
                    {"Date: " + date}
                </div>
                <div id="newsItemCard_contentDiv">
                    {content}
                </div>
                
            </div>
        )
    }
}

export default withRouter(NewsItemCard);