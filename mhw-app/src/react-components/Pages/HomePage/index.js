import React from 'react';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component'
import "./style.css"


class HomePage extends React.Component{
    render(){
        return(
            <div id="mainDiv">
                <div id="headerContainer">
                    <header className="mainHeader">
                        MHW Info App
                    </header>
                </div>
                <div id="newsfeedContainer">
                    <InfiniteScroll
                        dataLength={1} //This is important field to render the next data
                        hasMore={false}
                        loader={<h4>Loading...</h4>}
                    >
                        {
                            <h1>something</h1>
                        }
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

export default withRouter(HomePage);
