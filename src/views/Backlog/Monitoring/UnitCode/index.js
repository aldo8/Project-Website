import {connect} from 'react-redux';
import UnitCode from './UnitCode'
import {push,createMatchSelector} from 'connected-react-router';
import { MENU } from 'constants/menu';
import { bmsAchievementUnitModel } from 'actions/backlog';
import { createLoadingSelector } from 'utils/selector.helper';
import { BMS_ACHIEVEMENT_BY_UNIT_MODEL } from 'actions/actionTypes';

const loadingSelector = createLoadingSelector([BMS_ACHIEVEMENT_BY_UNIT_MODEL])
const mapStateToProps = state => {
    const matchSelector = createMatchSelector(`${MENU.BACKLOG_MONITORING}:workCenter/:unitModel`);
    const match = matchSelector(state);
    console.log('testing',match)
    const workCenter = match ? match.params.workCenter : null;
    const unitModel = match ? match.params.unitModel : null
    return {
        isLoading:loadingSelector(state),
        token:state.user.tokenResponse.accessToken,
        displayMode:state.displayMode,
        workCenter:workCenter,
        unitModel:unitModel,
        bmsAchievementUnitCode:state.backlog.bmsAchievementUnitCode.data,
    }
}
const mapDispatchToProps = (dispatch) => ({
    pushTo:(url) => dispatch(push(url)),
    fetchAchievementUnitModel:(backlogParams,token) => dispatch(bmsAchievementUnitModel(backlogParams,token))
})

export default connect(mapStateToProps,mapDispatchToProps)(UnitCode);