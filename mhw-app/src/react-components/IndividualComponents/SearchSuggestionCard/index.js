import React from 'react';
import { withRouter } from 'react-router-dom';
import "./style.css"

class SearchSuggestionCard extends React.Component{


    

    render(){
        const {content, searchContext, parentContext} = this.props
        return(
            <div className={"searchSuggestion"} 
                onClick={() => {searchContext.setState({searchbarText: content}); parentContext.setState({suggestions: []})}}>
                    {content}
            </div>
        )
    }
}

export default withRouter(SearchSuggestionCard);