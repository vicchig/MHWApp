import React from 'react';
import { withRouter } from 'react-router-dom';
import "./style.css"

class Page400 extends React.Component{
    render(){
        return(
            <div id="mainDiv400">
                <div id="headerContainer">
                    <header className="mainHeader">
                        400 Bad Request
                    </header>
                </div>
                
                <div id="messageDiv">
                    Ooops, looks like you made a bad request.
                </div>
            </div>
        )
    }
}

export default withRouter(Page400);
