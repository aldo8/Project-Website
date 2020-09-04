import {connect} from 'react-redux';
import UnitModel from './UnitModel'
import {push,createMatchSelector} from 'connected-react-router';
import { bmsAchievementWorkCenter } from 'actions/backlog';
import { MENU } from 'constants/menu';
import { BMS_ACHIEVEMENT_BY_WORK_CENTER } from 'actions/actionTypes';
import { createLoadingSelector } from 'utils/selector.helper';

const loadingSelector = createLoadingSelector([BMS_ACHIEVEMENT_BY_WORK_CENTER])
const mapStateToProps = state => {
    const matchSelector = createMatchSelector(`${MENU.BACKLOG_MONITORING}:workCenter`);
    const match = matchSelector(state);
    console.log('unitModels',match)
    const workCenter = match ? match.params.workCenter : null;
    return {
        isLoading:loadingSelector(state),
        token:state.user.tokenResponse.accessToken,
        displayMode:state.displayMode,
        unitModelAchievement:state.backlog.bmsAchievementUnitModel.data,
        workCenter:workCenter,
    }
    
}
const mapDispatchToProps = (dispatch) => ({
    push:(url) => dispatch(push(url)),
    fetchAchievementWorkCenter:(workCenter,token) => dispatch(bmsAchievementWorkCenter(workCenter,token))
})

export default connect(mapStateToProps,mapDispatchToProps)(UnitModel);