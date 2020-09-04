import {connect} from 'react-redux';
import DetailProblemLog from './DetailProblemLog';
import {push} from 'connected-react-router';
import {closeProblemLog} from 'actions/problemLog';


const mapStateToProps = state => ({
    token:state.user.tokenResponse.accessToken,
    displayMode:state.displayMode,
    detailProblemLog:state.problemLog.detailProblemLog,
    status:state.problemLog.statusProblemLog.status
})
const mapDispatchToProps = (dispatch) => ({
    push:(url) => dispatch(push(url)),
    closeProblemLog:(data,token) => dispatch(closeProblemLog(data,token))
})

export default connect(mapStateToProps,mapDispatchToProps)(DetailProblemLog);