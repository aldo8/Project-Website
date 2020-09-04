import {connect} from 'react-redux';
import ListJob from './ListJob'
import {push,createMatchSelector} from 'connected-react-router';
import { MENU } from 'constants/menu';
import {bmsAchievementUnitCode, bmsAchievementDetail, getChoices, webSubmitBacklog, approveBms} from 'actions/backlog';
import { createLoadingSelector } from 'utils/selector.helper';
import { BMS_WEB_SUBMIT } from 'actions/actionTypes';

const mapStateToProps = state => {
    const matchSelector = createMatchSelector(`${MENU.BACKLOG_MONITORING}:workCenter/:unitModel/:unitCode`);
    const match = matchSelector(state);
    const workCenter = match ? match.params.workCenter : null;
    const unitModel = match ? match.params.unitModel : null;
    const unitCode = match ? match.params.unitCode : null;
    const loadingSelector = createLoadingSelector([BMS_WEB_SUBMIT]);
    return {
        isLoading:loadingSelector(state),
        token:state.user.tokenResponse.accessToken,
        displayMode:state.displayMode,
        workCenter:workCenter,
        unitModel:unitModel,
        unitCode:unitCode,
        bmsAchievementList:state.backlog.bmsAchievementList.data,
        bmsAchievementDetail:state.backlog.bmsAchievementDetail.data,
        masterDataBacklog:state.backlog.masterDataBacklog.data,
        responseWebSubmit:state.backlog.webSubmitBacklog.response

    }
}
const mapDispatchToProps = (dispatch) => ({
    push:(url) => dispatch(push(url)),
    fetchAchievementUnitCode:(workCenter,unitModel,unitCode,backlogParams,token) => dispatch(bmsAchievementUnitCode(workCenter,unitModel,unitCode,backlogParams,token)),
    fetchDetailBmsMonitoring:(backlogId,token) => dispatch(bmsAchievementDetail(backlogId,token)),
    fetchMasterDataBacklog:(token) => dispatch(getChoices(token)),
    submitBacklogMonitoring:(backlogParams,token) => dispatch(webSubmitBacklog(backlogParams,token)),
    approveBacklogMonitoring:(backlogId,token) => dispatch(approveBms(backlogId,token))
})

export default connect(mapStateToProps,mapDispatchToProps)(ListJob);