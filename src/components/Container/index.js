import {connect} from 'react-redux';
import Container from './Container';
import {setPageDisplayModeAction} from '../../actions/display';

const mapStateToProps = state => ({
    displayMode:state.displayMode,
})

const mapDispatchToProps = (dispatch) => ({
    setDisplayMode:(mode) => dispatch(setPageDisplayModeAction(mode)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Container);