import {connect} from 'react-redux';
import JobType from './JobType';
import {push,createMatchSelector} from 'connected-react-router';
import { createLoadingSelector } from 'utils/selector.helper';
import { LIST_ACHIEVEMENT_PERCENTAGE } from 'actions/actionTypes';
import { MENU } from 'constants/menu';

const loadingSelector = createLoadingSelector([LIST_ACHIEVEMENT_PERCENTAGE]);
const mapStateToProps = state => {
    const matchSelector = createMatchSelector(`${MENU.PROBLEMLOG_MONITORING}/:workCenterCode`);
    const match = matchSelector(state);
    const workCenterCode = match ? match.params.workCenterCode : null;
    return {
        isLoading:loadingSelector(state),
        token:state.user.tokenResponse.accessToken,
        displayMode:state.displayMode,
        listAchievement:state.problemLog.listAchievementPercentage.data,
        workCenterCode:workCenterCode
    }
}
const mapDispatchToProps = (dispatch) => ({
    push:(url) => dispatch(push(url)),
})

export default connect(mapStateToProps,mapDispatchToProps)(JobType);