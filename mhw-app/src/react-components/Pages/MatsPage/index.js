import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import './style.css'


class MatsPage extends React.Component{

    render(){
        return(
            <div id="mainDiv">
                <WebsiteHeader appContext={this.props.parentContext}/>
                
            </div>
        )
    }
}

export default withRouter(MatsPage);
