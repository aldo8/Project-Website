import {connect} from 'react-redux';
import JobsReport from './JobsReport';
import {push} from 'connected-react-router';
import { listOfJobReport } from 'actions/workOrder';
import { FETCH_JOB_REPORT, DOWNLOAD_REPORT_BACKLOG, DOWNLOAD_REPORT_PROBLEM_LOG, DOWNLOAD_REPORT_PI } from 'actions/actionTypes';
import { createLoadingSelector } from 'utils/selector.helper';
import { downloadReportBacklog } from 'actions/backlog';
import { downloadReportPI } from 'actions/periodicInspection';
import { downloadReportProblemLog } from 'actions/problemLog';

const loadingSelector = createLoadingSelector([FETCH_JOB_REPORT,DOWNLOAD_REPORT_BACKLOG,DOWNLOAD_REPORT_PROBLEM_LOG,DOWNLOAD_REPORT_PI]);
const mapStateToProps = state => ({
    isLoading:loadingSelector(state),
    token:state.user.tokenResponse.accessToken,
    displayMode:state.displayMode,
    listOfJobReport:state.workOrder.listOfJobReport.data,
    downloadReportBacklog:state.backlog.downloadReportBacklog.data,
    downloadReportProblemLog:state.problemLog.downloadReportProblemLog.data,
    downloadReportPI:state.periodicInspection.downloadReportPI.data
})
const mapDispatchToProps = (dispatch) => ({
    push:(url) => dispatch(push(url)),
    fetchJobReport:(parameterReport,token) => dispatch(listOfJobReport(parameterReport,token)),
    fetchReportBacklog:(reportBacklog,token) => dispatch(downloadReportBacklog(reportBacklog,token)),
    fetchReportPI:(reportPI,token) => dispatch(downloadReportPI(reportPI,token)),
    fetchReportProblemLog:(reportProblemLog,token) => dispatch(downloadReportProblemLog(reportProblemLog,token))
})

export default connect(mapStateToProps,mapDispatchToProps)(JobsReport);