import {connect} from 'react-redux';
import JobListProblemLog from './JobListProblemLog';
import {push, createMatchSelector} from 'connected-react-router';
import { MENU } from 'constants/menu';
import {
    listMonitor, 
    problemLogGet
} from 'actions/problemLog';
import { createLoadingSelector } from 'utils/selector.helper';
import { LIST_PROBLEMLOG_MONITORING } from 'actions/actionTypes';


const loadingSelector = createLoadingSelector([LIST_PROBLEMLOG_MONITORING]);
const mapStateToProps = state => {
    const matchSelector = createMatchSelector(`${MENU.PROBLEMLOG_MONITORING}/:workCenterCode/:jobType`);
    const match = matchSelector(state);
    const workCenterCode = match ? match.params.workCenterCode : null;
    const jobType = match ? match.params.jobType : null;
    
    return {
        isLoading:loadingSelector(state),
        token:state.user.tokenResponse.accessToken,
        displayMode:state.displayMode,
        workCenterCode:workCenterCode,
        jobType:jobType,
        listMonitor:state.problemLog.listMonitoring.data

    }}
const mapDispatchToProps = (dispatch) => ({
    push:(url) => dispatch(push(url)),
    fetchListMonitoring:(parameter,token) => dispatch(listMonitor(parameter,token)),
    fetchDetailProblemLog:(Id,token) => dispatch(problemLogGet(Id,token))
})

export default connect(mapStateToProps,mapDispatchToProps)(JobListProblemLog);