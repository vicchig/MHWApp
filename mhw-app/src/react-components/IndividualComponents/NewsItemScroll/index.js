import React  from "react";
import NewsItemCard from './../../IndividualComponents/NewsItemCard'
import { getNewsItemInterval } from './../../../actions/newsitemActions'
import debounce from "lodash.debounce";
import { uid } from "react-uid";
import { withRouter } from 'react-router-dom';
import "./style.css"

class NewsItemScroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skipAmount: -10,
      error: false,
      hasMore: true,
      isLoading: false,
      items: [],
    };

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
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight
      ) {
        loadItems();
      }
    }, 100);
  }

  componentDidMount() {
    //initial load
    this.loadItems();
  }

  loadItems = () => {
    this.setState(
      { isLoading: true, skipAmount: this.state.skipAmount + 10},
      async () => {
        try{
          let response = await getNewsItemInterval(10, this.state.skipAmount)
          let nextItems

          switch(response.status){
            case 404:
              this.props.history.push("/404")
              break
            case 500:
              this.props.history.push("/500")
              break
            case 400:
              this.props.history.push("/400")
              break
            case 200:
              nextItems = response.items.map((item) => ({
                text: item.text,
                date: item.date
              }))

              // Merges newly added items with items that have already been loaded and are being displayed
              this.setState({
                hasMore: (this.state.items.length < response.count),
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
              break
            default:
              console.log("Some other error")
              break
          }
        }
        catch (err){
          console.log("An error occurred:\n" + err)
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
      items: items,
    } = this.state;

    return (
      <div>
          {
            items.map((item) => (
              <NewsItemCard
                key={uid(item)}
                date={item.date}
                contents={this.splitText("-n", item.text)}
              ></NewsItemCard>
            ))
          }
        <hr/>
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

