import {connect} from 'react-redux';
import Jobs from './JobsPage';
import {push} from 'connected-react-router';
import {
    listJobAssignment,
    selectedJob
} from 'actions/workOrder';
import {createLoadingSelector} from 'utils/selector.helper';
import {
    FETCH_LIST_JOBS_ASSIGNMENT,
    FETCH_LIST_MECHANIC,
    ASSIGN_JOB,
    UNASSIGN_JOB,
    ASSIGN_TRACKING
} from 'actions/actionTypes';
import {
    listOfMechanic,
    assignJob,
    unassignJob,
} from 'actions/assignment';
import { fixingassignstaging } from 'actions/tracking';

// Selector for identify loading screen
const loadingSelector = createLoadingSelector([FETCH_LIST_JOBS_ASSIGNMENT,FETCH_LIST_MECHANIC,ASSIGN_JOB,UNASSIGN_JOB,ASSIGN_TRACKING]);

const mapStateToProps = state => ({
    isLoading:loadingSelector(state),
    token:state.user.tokenResponse.accessToken,
    displayMode:state.displayMode,
    listJob:state.workOrder.listJobAssignment.data,
    jobDetail:state.workOrder.jobDetail,
    assignJob:state.assignment.assignJob.response,
    unassignJob:state.assignment.unassignJob.data,
    listMechanic:state.assignment.listOfMechanic,
    assignTrackingResponse:state.tracking.fixingassignstaging.response
    
})

const mapDispatchToProps = (dispatch) => ({
    push:(url) => dispatch(push(url)),
    fetchListJobAssignment:(parameter,token) => dispatch(listJobAssignment(parameter,token)),
    fetchListofMechanic:(token) => dispatch(listOfMechanic(token)),
    assignJobMechanic:(parameter,token) => dispatch(assignJob(parameter,token)),
    unassignJobMechanic:(parameter,token) => dispatch(unassignJob(parameter,token)),
    selectedJob:(data) => dispatch(selectedJob(data)),
    assignTracking:(trackingParams,token) => dispatch(fixingassignstaging(trackingParams,token))
})

export default connect(mapStateToProps,mapDispatchToProps)(Jobs);