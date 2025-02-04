import React  from "react";
import NewsItemCard from './../../IndividualComponents/NewsItemCard'
import { getNewsItemInterval } from './../../../actions/newsitemActions'
import debounce from "lodash.debounce";
import { uid } from "react-uid";
import { withRouter } from 'react-router-dom';
import {processErrorWNav} from '../../../actions/utilities'
import {deleteNewsItem, updateItem} from '../../../actions/newsitemActions'
import "./style.css"

class NewsItemScroll extends React.Component {

  state = {
    skipAmount: -10,
    error: false,
    hasMore: true,
    isLoading: false,
    items: [],
  };

  componentDidMount() {
    // Binds our scroll event handler
    window.onscroll = debounce(() => {
      const {
        loadItems,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      // Return early if error, busy or no more items left
      if (error || isLoading || !hasMore) return;

      // Load more items when scrolled to bottom
      if (
        window.innerHeight + document.documentElement.scrollTop + 25
        >= document.documentElement.offsetHeight
      ) {
        loadItems();
      }
    }, 100);
  
    //initial load
    this.loadItems();
  }

  handleDelete = (id) => {
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
    }, () => {
      deleteNewsItem(id).then(res => {
        if (res.status !== 200) processErrorWNav(this, res.status, res.errorMsg)
      }, rej => {
          console.error("An error occured")
      })
    })
  }
  
  handleSave = (id, text) => {
    let tempItems = [...this.state.items]
    let itemToUpdate = tempItems.filter(item => item.id === id)[0]
    const i = tempItems[tempItems.indexOf(itemToUpdate)]

    itemToUpdate.text = text
    tempItems[i] = itemToUpdate

    this.setState({
      items: tempItems
    }, () => {
      updateItem(id, text).then(res => {
        if (res.status !== 200) processErrorWNav(this, res.status, res.errorMsg)
      }, rej => {
        console.error("An error occured")
      })
    })
    
  }

  loadItems = () => {
    this.setState(
      { isLoading: true, skipAmount: this.state.skipAmount + 10},
      async () => {
        try{
          let response = await getNewsItemInterval(10, this.state.skipAmount).catch(err => {
            console.error("An error occured")
          })
          let nextItems

          if (response.status !== 200) processErrorWNav(this, response.status, response.errorMsg)
          else{
            nextItems = response.data.items.map((item) => ({
              text: item.text,
              date: item.date,
              id: item.id
            }))

            // Merges newly added items with items that have already been loaded and are being displayed
            this.setState({
              hasMore: (this.state.items.length < response.data.count),
              isLoading: false,
              items: [
                ...this.state.items,
                ...nextItems,
              ],
            }, () => {
              this.setState({
                items: this.state.items.sort((item1, item2) => {return item1.date <= item2.date ? 1 : -1})
              })
            });
          } 
        }
        catch (err){
          this.props.history.push('/unknownError')
          console.error("An error occurred\n")
        }
    });
  }

  splitText = (splitOn, text) => {
    return text.split(splitOn)
  }

  render() {
    const {
      error,
      hasMore,
      isLoading,
      items,
    } = this.state;

    return (
      <div id="scrollDiv">
          {
            items.map((item) => (
              <NewsItemCard
                key={uid(item)}
                date={item.date}
                contents={this.splitText("-n", item.text)}
                appContext={this.props.appContext}
                handleDelete={() => {this.handleDelete(item.id)}}
                handleSave={(text) => {this.handleSave(item.id, text)}}
              ></NewsItemCard>
            ))
          }
        <hr id='endScrollLine'/>
        {error &&
          <div >
            {error}
          </div>
        }
        {isLoading &&
          <div id="loadingDiv">Loading...</div>
        }
        {!hasMore &&
          <div id="hasMoreDiv">No more updates to load.</div>
        }
      </div>
    );
  }
}

export default withRouter(NewsItemScroll);

