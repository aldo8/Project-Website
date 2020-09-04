import React from 'react';
import {ApplicationBar,SideMenuBar} from 'components';
import { ConnectedRouter } from 'connected-react-router';
import {history} from 'config/router.config';
import routes from 'route';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default class Container extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isShowDrawer:false
    };
  };
  
    UNSAFE_componentWillMount () {
    window.addEventListener('resize', this._handleWindowSizeChange);
  }
  componentDidMount() {
    this._handleWindowSizeChange();
  }
  
  UNSAFE_componentWillUnmount() {
    window.removeEventListener('resize', this._handleWindowSizeChange);
  }

  _handleWindowSizeChange = () => {
    let mode = 'web';
    if (window.innerWidth < 600) { 
        mode = 'mobile'; 
        } else if (window.innerWidth < 1026) { 
        mode = 'tab'; 
        }
    this.props.setDisplayMode(mode);
  }
  handleClick = (key) => {
    switch (key) {
      case 'isOpen':
        this.setState({
          isShowDrawer:!this.state.isShowDrawer
        })
        break;
        case 'isClose':
        this.setState({
          isShowDrawer:false
        })
        break;
    
      default:
        break;
    }
  }
    render(){
        return (
            <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ApplicationBar onClick={() => this.handleClick('isOpen')}/>
            <SideMenuBar 
              open ={this.state.isShowDrawer}
              onClose={() => this.handleClick('isClose')}
              />
            <ConnectedRouter history={history}>
            {routes}
            </ConnectedRouter>
            </MuiPickersUtilsProvider>
            </>
        )
    }
}