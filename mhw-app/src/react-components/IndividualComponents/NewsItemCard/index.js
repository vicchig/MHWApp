import React from 'react';
import { withRouter } from 'react-router-dom';
import "./style.css"

class NewsItemCard extends React.Component{
    render(){
        const {content} = this.props
        const dateObj = new Date(this.props.date)
        const date = dateObj.toString().split("GMT")[0]
        
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
