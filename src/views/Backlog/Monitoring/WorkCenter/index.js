import {connect} from 'react-redux';
import WorkCenter from './WorkCenter';
import {push} from 'connected-react-router';
import { bmsAchievement } from 'actions/backlog';
import { createLoadingSelector } from 'utils/selector.helper';
import { BMS_ACHIEVEMENT } from 'actions/actionTypes';

const LoadingSelector = createLoadingSelector([BMS_ACHIEVEMENT])
const mapStateToProps = state => ({
    isLoading:LoadingSelector(state),
    token:state.user.tokenResponse.accessToken,
    displayMode:state.displayMode,
    achievementBms:state.backlog.bmsAchievement.data,
})
const mapDispatchToProps = (dispatch) => ({
    push:(url) => dispatch(push(url)),
    fetchBmsAchievement:(token) => dispatch(bmsAchievement(token))
})

export default connect(mapStateToProps,mapDispatchToProps)(WorkCenter);