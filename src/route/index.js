import React from 'react';
import {MENU} from 'constants/menu';
import {
    Login,
    Dashboard,
    Setting,
    WorkCenter,
    Jobs,
    JobsReport,
    PiDetailPage,
    ProblemLogDetails,
    UnitModel,
    UnitCode,
    ListJob,
    WorkCenterProblemLog,
    JobType,
    JobListProblemLog,
    DetailProblemLog
} from 'views';
import {Route,Switch} from 'react-router';
import Authorization from 'components/AuthGuard';

 const routes = (
    <div>
    <Switch>
        <Route exact path={MENU.LOGIN} component={Login}/>
        <Route exact path={MENU.DASHBOARD} component={Authorization(Dashboard)}/>
        {/* Route for Jobs */}
        <Route exact path={MENU.JOBS_SUMMARY} component={Authorization(Jobs)}/>
        <Route exact path={MENU.JOBS_REPORT} component={Authorization(JobsReport)}/>
        {/* Route for Detail Job PI */}
        <Route exact path={`${MENU.DETAIL_PI}:woId`} component={Authorization(PiDetailPage)}/>
        {/* Route for Problem Log */}
        <Route exact path={`${MENU.DETAIL_PROBLEMLOG}:woId`} component={Authorization(ProblemLogDetails)}/>
        {/* Route for Problem Log Monitoring */}
        <Route exact path={MENU.PROBLEMLOG_MONITORING} component={Authorization(WorkCenterProblemLog)}/>
        <Route exact path={`${MENU.PROBLEMLOG_MONITORING_JOB_TYPE}`} component={Authorization(JobType)}/>
        <Route exact path={`${MENU.PROBLEMLOG_MONITORING_JOB_LIST}`} component={Authorization(JobListProblemLog)}/>
        <Route exact path={`${MENU.PROBLEMLOG_MONITORING_DETAIL}:woId`} component={Authorization(DetailProblemLog)}/>
        {/* Route for BMS */}
        <Route exact path={MENU.BACKLOG_MONITORING} component={Authorization(WorkCenter)}/>
        <Route exact path={MENU.BACKLOG_MONITORING_UNIT_MODEL} component={Authorization(UnitModel)}/>
        <Route exact path={MENU.BACKLOG_MONITORING_UNIT_CODE} component={Authorization(UnitCode)}/>
        <Route exact path={MENU.BACKLOG_MONITORING_LIST_JOB} component={Authorization(ListJob)}/>
        {/* Route for Setting */}
        <Route exact path={MENU.SETTING} component={Authorization(Setting)}/>
        {/* Default route */}
        <Route exact path="*" component={Authorization(Dashboard)} />

    </Switch>
    </div>
);

export default routes;
