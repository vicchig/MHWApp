import React from 'react';
import { withRouter } from 'react-router-dom';
import "./style.css"

class Page404 extends React.Component{
    render(){
        return(
            <div id="mainDiv">
                <div id="headerContainer">
                    <header className="mainHeader">
                        404 Not Found
                    </header>
                </div>
                
                <div id="messageDiv">
                    Ooops, looks like the resource you are trying to access does not exist.
                </div>
            </div>
        )
    }
}

export default withRouter(Page404);
