import React from 'react';
import { withRouter } from 'react-router-dom';
import "./style.css"

class UnknownError extends React.Component{
    render(){
        return(
            <div id="mainDiv">
                <div id="headerContainer">
                    <header className="mainHeader">
                        Error
                    </header>
                </div>
                
                <div id="messageDiv">
                    Some unspecified error occurred.
                </div>
            </div>
        )
    }
}

export default withRouter(UnknownError);
