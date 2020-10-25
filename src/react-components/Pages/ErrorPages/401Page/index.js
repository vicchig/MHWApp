import React from 'react';
import { withRouter } from 'react-router-dom';
import "./style.css"

class Page401 extends React.Component{
    render(){
        return(
            <div id="mainDiv401">
                <div id="headerContainer">
                    <header className="mainHeader">
                        401 Unauthorized Request
                    </header>
                </div>
                
                <div id="messageDiv">
                    Ooops, looks like you don't have permissions to access this resource.
                </div>
            </div>
        )
    }
}

export default withRouter(Page401);
