import React from 'react';
import { withRouter } from 'react-router-dom';
import "./style.css"

class Page500 extends React.Component{
    render(){
        return(
            <div id="mainDiv500">
                <div id="headerContainer">
                    <header className="mainHeader">
                        500 Internal Server Error
                    </header>
                </div>
                
                <div id="messageDiv">
                    An error occurred on the server.
                </div>
            </div>
        )
    }
}

export default withRouter(Page500);
