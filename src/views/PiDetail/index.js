import PiDetailPage from './PiDetailPage';
import {connect} from 'react-redux';
import { push,createMatchSelector } from "connected-react-router";
import { MENU } from 'constants/menu';
import {
    jobDetail,
    equipmentValueGet,
    unHandoverPi,
    handoverTrigger,
    equipmentValueSubmit
} from 'actions/workOrder';
import {assignmentSummary} from 'actions/assignment';
import {stagingInfo} from 'actions/tracking';
import {
    countBySpv,
    listBySpv
} from 'actions/problemLog';
import {
    formUnitModel,
    getCheckSheetValue,
    formApprove,
    formSubmit
} from 'actions/periodicInspection';
import { 
    FETCH_JOB_DETAIL,
    COUNT_BY_SPV,
    STAGING_INFO,
    FETCH_FORM_UNIT_MODEL,
    APPROVE_PERIODIC_INSPECTION,
    DETAIL_BACKLOG,
    VALIDATE_SPARE_PART,
    SEARCH_SPARE_PART,
    SUBMIT_BACKLOG,
    LIST_BACKLOG,
    APPROVE_BES,
    APPROVE_BMS,
    REJECT_BES,
    SUBMIT_PERIODIC_INSPECTION,
    HANDOVER_JOB
} from 'actions/actionTypes';
import { createLoadingSelector } from 'utils/selector.helper';
import { 
    summaryBacklog,
    listBacklog,
    detailBacklog,
    getChoices,
    getSpecificObjectChoices,
    sparePartValidation,
    searchSparePart,
    besApprove,
    besReject,
    submitBacklog,
    approveBms
} from 'actions/backlog';

const loadingSelector = createLoadingSelector(
    [
        FETCH_JOB_DETAIL,
        COUNT_BY_SPV,
        STAGING_INFO,
        FETCH_FORM_UNIT_MODEL,
        APPROVE_PERIODIC_INSPECTION,
        DETAIL_BACKLOG,
        LIST_BACKLOG,
        SUBMIT_PERIODIC_INSPECTION,
        HANDOVER_JOB
    ]
    );
const loadingApproval = createLoadingSelector([APPROVE_PERIODIC_INSPECTION,APPROVE_BMS]);
const loadingDetailBacklog = createLoadingSelector([DETAIL_BACKLOG]);
const loadingValidateSparePart = createLoadingSelector([VALIDATE_SPARE_PART,SEARCH_SPARE_PART,SUBMIT_BACKLOG,REJECT_BES,APPROVE_BES,APPROVE_BMS]);

const mapStateToProps = state => {
    const matchSelector = createMatchSelector(`${MENU.DETAIL_PI}:woId`);
    const match = matchSelector(state);
    console.log('match',match)
    const woId = match ? match.params.woId : null;
    return {
    isLoading:loadingSelector(state),
    isLoadingBacklog:loadingDetailBacklog(state),
    isLoadingValidation:loadingValidateSparePart(state),
    isLoadingApproval:loadingApproval(state),
    displayMode:state.displayMode,
    router:state.router,
    workOrderId:woId,
    token:state.user.tokenResponse.accessToken,
    unitIdentity:state.workOrder.jobDetail.detail,
    handoverResponse:state.workOrder.handoverTrigger.data,
    jobTime:state.workOrder.equipmentValueGet.jobTime,
    jobAssigned:state.assignment.summary.value,
    stagingInfo:state.tracking.stagingInfo.data,
    countBySpv:state.problemLog.countBySpv.woId,
    listBySpv:state.problemLog.listBySpv.data,
    checksheetPi:state.periodicInspection.getCheckSheetValue.data,
    masterChecksheet:state.periodicInspection.formUnitModel.data,
    approvalPiResponse:state.periodicInspection.formApprove.response,
    listBacklog:state.backlog.listBacklog.data,
    countBacklog:state.backlog.summaryBacklog.data,
    detailBacklog:state.backlog.detailBacklog.data,
    masterDataBacklog:state.backlog.masterDataBacklog.data,
    masterSpecificObjectPart:state.backlog.masterSpecificObjectPart.data,
    validationResponse:state.backlog.sparePartValidation.response,
    dataSparePartValidation:state.backlog.sparePartValidation.data,
    resultSparePart:state.backlog.dataSparePart.data,
    submitBacklogMonitoringResponse:state.backlog.submitBacklog,    
    besResponse:state.backlog.besApprove.response
    // handoverResponse:
    }
} 
const mapDispatchToProps = dispatch => ({
    push:url => dispatch(push(url)),
    fetchDetailJob:(woId,token) => dispatch(jobDetail(woId,token)),
    fetchJobTime:(WoId,token) => dispatch(equipmentValueGet(WoId,token)),
    fetchSummary:(woId,token) => dispatch(assignmentSummary(woId,token)),
    fetchCountImpact:(woId,token) => dispatch(countBySpv(woId,token)),
    fetchListProblemLog:(params,token) => dispatch(listBySpv(params,token)),
    fetchStaging:(woId,token) => dispatch(stagingInfo(woId,token)),
    fetchUnitModel:(unitModel,token) => dispatch(formUnitModel(unitModel,token)),
    fetchCheckSheetValue:(woId,token) => dispatch(getCheckSheetValue(woId,token)),
    approvePi:(woId,token) => dispatch(formApprove(woId,token)),
    handover:(woId,token) => dispatch(handoverTrigger(woId,token)),
    unHandover:(woId,token) => dispatch(unHandoverPi(woId,token)),
    submitPeriodicInspection:(data,token) => dispatch(formSubmit(data,token)),
    fetchSummaryBacklog:(backlogParameter,token) => dispatch(summaryBacklog(backlogParameter,token)),
    fetchListBacklog:(backlogParameter,token) => dispatch(listBacklog(backlogParameter,token)),
    fetchDetailBacklog:(woId,token) => dispatch(detailBacklog(woId,token)),
    fetchMasterDataBacklog:(token) => dispatch(getChoices(token)),
    fetchSpecificObjectChoices:(backlogParameter,token) => dispatch(getSpecificObjectChoices(backlogParameter,token)),
    validateParts:(sparePart,token) => dispatch(sparePartValidation(sparePart,token)),
    fetchSparePart:(sparePart,token) => dispatch(searchSparePart(sparePart,token)),
    approveBacklogEntrySheet:(backlogId,token) => dispatch(besApprove(backlogId,token)),
    rejectBacklogEntrySheet:(backlogId,token) => dispatch(besReject(backlogId,token)),
    submitBacklogMonitoring:(backlogParams,token) => dispatch(submitBacklog(backlogParams,token)),
    approveBacklogMonitoring:(backlogId,token) => dispatch(approveBms(backlogId,token)),
    submitEquipmentValue:(equipmentIdentity,token) => dispatch(equipmentValueSubmit(equipmentIdentity,token))
})

export default  connect (mapStateToProps,mapDispatchToProps)(PiDetailPage)