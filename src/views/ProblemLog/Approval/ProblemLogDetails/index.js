import ProblemLogDetails from './ProblemLogDetails';
import {connect} from 'react-redux';
import { push, createMatchSelector} from 'connected-react-router';
import {GET_DETAIL_PROBLEMLOG, SUBMIT_PROBLEMLOG} from 'actions/actionTypes';
import {createLoadingSelector} from 'utils/selector.helper';
import {
    submitProblemLog,
    problemLogGet,
    rejectProblemLog,
    updateProblemLog,
    masterDataProblemLog
} from 'actions/problemLog';
import { MENU } from 'constants/menu';

const loadingSelector = createLoadingSelector([GET_DETAIL_PROBLEMLOG,SUBMIT_PROBLEMLOG]);
const mapStateToProps = state => {
    const matchSelector = createMatchSelector(`${MENU.DETAIL_PROBLEMLOG}:woId`);
    const match = matchSelector(state);
    console.log('match',match)
    const WoId = match ? match.params.woId : null
    return {
    isLoading:loadingSelector(state),
    WoId:WoId,
    displayMode:state.displayMode,
    token:state.user.tokenResponse.accessToken,
    detailProblemLog:state.problemLog.detailProblemLog,
    dataMaster:state.problemLog.master.data,
    approveProblemLogResponse:state.problemLog.submitProblemLog.response,
    rejectProblemLogResponse:state.problemLog.rejectProblemLog.response
    }}

const mapDispatchToProps = dispatch => ({
    push:url => dispatch(push(url)),
    fetchMasterDataProblemLog:(token) => dispatch(masterDataProblemLog(token)),
    problemLogGet:(Id,token) => dispatch(problemLogGet(Id,token)),
    updateProblemLog:(data,token) => dispatch(updateProblemLog(data,token)),
    submitProblemLog:(Id,token) => dispatch(submitProblemLog(Id,token)),
    rejectProblemLog:(Id,token) => dispatch(rejectProblemLog(Id,token)),
})
export default  connect (mapStateToProps,mapDispatchToProps)(ProblemLogDetails)




