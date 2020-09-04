import {connect} from 'react-redux';
import WorkCenterProblemLog from './WorkCenterProblemLog';
import {push} from 'connected-react-router';
import {
    listWorkCenterPercentage,
    listAchievementPercentage
} from 'actions/problemLog'
import { LIST_WORKCENTER_PERCENTAGE } from 'actions/actionTypes';
import { createLoadingSelector } from 'utils/selector.helper';

const loadingSelector = createLoadingSelector([LIST_WORKCENTER_PERCENTAGE]);
const mapStateToProps = state => ({
    isLoading:loadingSelector(state),
    token:state.user.tokenResponse.accessToken,
    displayMode:state.displayMode,
    listWorkCenter:state.problemLog.listWorkCenterPercentage.data
})
const mapDispatchToProps = (dispatch) => ({
    push:(url) => dispatch(push(url)),
    fetchWorkCenterPercentage:(token) => dispatch(listWorkCenterPercentage(token)),
    fetchAchievementPercentage:(workCenterCode,token) => dispatch(listAchievementPercentage(workCenterCode,token))
})

export default connect(mapStateToProps,mapDispatchToProps)(WorkCenterProblemLog);