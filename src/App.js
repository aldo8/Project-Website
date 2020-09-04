import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import {ApplicationBar,SideMenuBar} from './components';
import routes from './route'
import './App.css';

class App extends React.Component{
  // constructor(props){
  //   super(props);
  //   // setI18nConfig(); //Set initial config
  // }
  render (){
  return (
    <div className='app-container'>
      <ApplicationBar/>
      <SideMenuBar/>
      <ConnectedRouter history={this.props.history}>
        {routes}
      </ConnectedRouter>
    </div>
  );
  }
}

export default App;
