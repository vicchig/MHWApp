//dependencies
import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter} from 'react-router-dom';

//pages
import HomePage from './react-components/Pages/HomePage';
import SkillToGemPage from './react-components/Pages/SkillToGemPage';
import Page404 from './react-components/Pages/ErrorPages/404Page'
import Page400 from './react-components/Pages/ErrorPages/400Page'
import Page401 from './react-components/Pages/ErrorPages/401Page'
import Page500 from './react-components/Pages/ErrorPages/500Page'

//actions
import {readCookie, login} from './actions/accActions'
import {handleServerResponseStatus} from './actions/utilities'


class App extends React.Component{
  constructor(props){
    super(props)
    readCookie(this)
  }

  state = {
    loggedInUser: null
  }

  handleSignIn = (callingContext, username, password) => {
    login(this, username, password).then( res => {
      switch(res.status){
        case 200: 
          callingContext.setState({displayHintText: false, displaySignInFloat: false})
          break
        case 400:
          callingContext.props.history.push('/400')
          break
        case 500:
          callingContext.props.history.push('/500')
          break
        case 404:
          callingContext.setState({displayHintText: true})
          break
        default:
          callingContext.props.history.push('/500')
          break
      }
    }, rej => {
      console.log("Promise rejected.\n")
      console.log(rej)
    })
  }

  render(){
    return (
      <BrowserRouter>
          <Switch> 
            <Route
              exact path={["/"] /* any of these URLs are accepted. */ }
              render={({ history }) => <HomePage history={history} parentContext={this}/>}
            />

            <Route
              exact path = {["/skillToGem"]}
              render={({history}) => <SkillToGemPage history={history}/>}
            />

            { /* 404 if URL isn't expected. */}
            <Route exact path='/404' 
                   render={({history}) => <Page404 history={history}/>}
            />

            <Route exact path='/400' 
                   render={({history}) => <Page400 history={history}/>}
            />

            <Route exact path='/401' 
                   render={({history}) => <Page401 history={history}/>}
            />

            <Route exact path='/500' 
                   render={({history}) => <Page500 history={history}/>}
            />
            
            
          </Switch>
        </BrowserRouter>
    );
  }
}


export default App;
