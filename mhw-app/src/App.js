//dependencies
import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter} from 'react-router-dom';

//pages
import HomePage from './react-components/Pages/HomePage';


class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <BrowserRouter>
          <Switch> 
            <Route
              exact path={["/"] /* any of these URLs are accepted. */ }
              render={({ history }) => <HomePage history={history}/>}
            />

            { /* 404 if URL isn't expected. */}
            <Route render={() => <div>404 Not found</div>} />
            
            
          </Switch>
        </BrowserRouter>
    );
  }
}


export default App;
