import ProblemLogList from './ProblemLogList';
import {connect} from 'react-redux';
import { push} from 'connected-react-router';
import {GET_DETAIL_PROBLEMLOG} from 'actions/actionTypes';
import {selectedProblemLog} from 'actions/problemLog';
import {createLoadingSelector} from 'utils/selector.helper'

const loadingSelector = createLoadingSelector([GET_DETAIL_PROBLEMLOG]);
const mapStateToProps = state => ({
    isLoading:loadingSelector(state),
    displayMode:state.displayMode,
    token:state.user.tokenResponse.accessToken,
    detailProblemLog:state.problemLog.detailProblemLog.data
})

const mapDispatchToProps = dispatch => ({
    push:url => dispatch(push(url)),
    selectedProblemLog:(data) => dispatch(selectedProblemLog(data))
})
export default  connect (mapStateToProps,mapDispatchToProps)(ProblemLogList)




