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
import UnknownError from './react-components/Pages/ErrorPages/UnknownError'
import MatsPage from './react-components/Pages/MatsPage'
import MonsterInfoPage from './react-components/Pages/MonsterInfoPage'
import AugmentPage from './react-components/Pages/AugmentPage'

//actions
import {readCookie, login} from './actions/accActions'


class App extends React.Component{
  constructor(props){
    super(props)
  }

  state = {
    loggedInUser: null
  }
  componentDidMount = () => {
    readCookie(this)
  }

  handleSignIn = (username, password, onResolve, onUserNotFound, handleError) => {
    login(this, username, password).then( resolve => {
      switch(resolve.status){
        case 200:
          onResolve()
          break
        case 500:
          handleError('/500')
          break
        case 400:
          onUserNotFound()
          break
        case 404:
          onUserNotFound()
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
              render={({history}) => <SkillToGemPage history={history} parentContext={this}/>}
            />

            <Route
              exact path = {["/mats"]}
              render={({history}) => <MatsPage history={history} parentContext={this}/>}
            />

            <Route
              exact path = {["/monsters"]}
              render={({history}) => <MonsterInfoPage history={history} parentContext={this}/>}
            />

            <Route
              exact path = {["/augments"]}
              render={({history}) => <AugmentPage history={history} parentContext={this}/>}
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

            <Route exact path='/unknownError' 
                   render={({history}) => <UnknownError history={history}/>}
            />
            
          </Switch>
        </BrowserRouter>
    );
  }
}


export default App;
