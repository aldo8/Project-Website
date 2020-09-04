import {ProblemLogApi} from 'api';
import {
    SUCCESS_TYPE,
    REQUEST_TYPE,
    FAILURE_TYPE,
    COUNT_BY_SPV,
    LIST_BY_SPV,
    GET_DETAIL_PROBLEMLOG,
    SELECTED_PROBLEMLOG,
    SUBMIT_PROBLEMLOG,
    REJECT_PROBLEMLOG,
    LIST_WORKCENTER_PERCENTAGE,
    LIST_ACHIEVEMENT_PERCENTAGE,
    LIST_PROBLEMLOG_MONITORING,
    CLOSE_PROBLEMLOG_MONITORING,
    UPDATE_PROBLEMLOG_APPROVAL,
    FETCH_MASTER_DATA_PROBLEM_LOG,
    DOWNLOAD_REPORT_PROBLEM_LOG
} from 'actions/actionTypes';
import { setStorage } from 'utils/storage.helper';
import { PROBLEMLOG_STORAGE } from 'constants/storage';

const api = token => ProblemLogApi.newInstance(token);

export const masterDataProblemLog = (token) => async dispatch => {
    dispatch({
        type:`${FETCH_MASTER_DATA_PROBLEM_LOG}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).masterDataProblemLog()
        dispatch({
            type:`${FETCH_MASTER_DATA_PROBLEM_LOG}${SUCCESS_TYPE}`,
            payload:{data:res.data}
        })
    } catch (error) {
        console.log('errorMasterDataProblemLog',error)
        dispatch({
            type:`${FETCH_MASTER_DATA_PROBLEM_LOG}${FAILURE_TYPE}`
        })
        
    }
}
export const countBySpv = (woId,token) => async dispatch => {
    dispatch({
        type:`${COUNT_BY_SPV}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).countBySpv(woId)
        dispatch({
            type:`${COUNT_BY_SPV}${SUCCESS_TYPE}`,
            payload:{woId:res.data}
        })
        
    } catch (error) {
        console.log('errorCount:',error);
        dispatch({
            type:`${COUNT_BY_SPV}${FAILURE_TYPE}`
        })
    }
}

export const listBySpv = (params,token) => async dispatch => {
    dispatch({
        type:`${LIST_BY_SPV}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).listBySpv(params)
        dispatch({
            type:`${LIST_BY_SPV}${SUCCESS_TYPE}`,
            payload:{data:res.data}
        })
        
    } catch (error) {
        console.log('errorCount:',error);
        dispatch({
            type:`${LIST_BY_SPV}${FAILURE_TYPE}`
        })
    }

}

export const problemLogGet = (Id,token) => async dispatch => {
    console.log('actionnya id',Id)
    dispatch({
        type:`${GET_DETAIL_PROBLEMLOG}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).problemLogGet(Id)
        dispatch({
            type:`${GET_DETAIL_PROBLEMLOG}${SUCCESS_TYPE}`,
            payload:{detail:res.data}
        })
    } catch (error) {
        console.log('errorDetail:',);
        dispatch({
            type:`${GET_DETAIL_PROBLEMLOG}${FAILURE_TYPE}`,
        })
    }
}

export const selectedProblemLog = (data) => async dispatch => {
    console.log('data',data)
    dispatch({
        type:`${SELECTED_PROBLEMLOG}${REQUEST_TYPE}`
    })
    try {
        setStorage(PROBLEMLOG_STORAGE,data);
        dispatch({
            type:`${SELECTED_PROBLEMLOG}${SUCCESS_TYPE}`,
            payload:{detail:data}
        })
    } catch (error) {
        console.log('errorDetail:',error);
        dispatch({
            type:`${SELECTED_PROBLEMLOG}${FAILURE_TYPE}`,
        })
    }
}

export const submitProblemLog = (Id,token) => async dispatch => {
    dispatch({
        type:`${SUBMIT_PROBLEMLOG}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).submitProblemLog(Id)
        dispatch({
            type:`${SUBMIT_PROBLEMLOG}${SUCCESS_TYPE}`,
            payload:{response:res}
        })
    } catch (error) {
        console.log('errorSubmit:',error)
        dispatch({
            type:`${SUBMIT_PROBLEMLOG}${FAILURE_TYPE}`
        })
    }
}

export const rejectProblemLog = (Id,token) => async dispatch => {
    dispatch({
        type:`${REJECT_PROBLEMLOG}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).rejectProblemLog(Id)
        dispatch({
            type:`${REJECT_PROBLEMLOG}${SUCCESS_TYPE}`,
            payload:{response:res}
        })
    } catch (error) {
        console.log('errorReject:',error)
        dispatch({
            type:`${REJECT_PROBLEMLOG}${FAILURE_TYPE}`
        })
    }
}

export const listWorkCenterPercentage = (token) => async dispatch => {
    dispatch({
        type:`${LIST_WORKCENTER_PERCENTAGE}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).listWorkCenterPercentage()
        dispatch({
            type:`${LIST_WORKCENTER_PERCENTAGE}${SUCCESS_TYPE}`,
            payload:{data:res.data}
        })
    } catch (error) {
        console.log('errorWCPercentage:',error)
        dispatch({
            type:`${LIST_WORKCENTER_PERCENTAGE}${FAILURE_TYPE}`
        })
    }
}

export const listAchievementPercentage = (workCenterCode,token) => async dispatch => {
    dispatch({
        type:`${LIST_ACHIEVEMENT_PERCENTAGE}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).listAchievementPercentage(workCenterCode)
        dispatch({
            type:`${LIST_ACHIEVEMENT_PERCENTAGE}${SUCCESS_TYPE}`,
            payload:{data:res.data}
        })
    } catch (error) {
        console.log('errorWCPercentage:',error)
        dispatch({
            type:`${LIST_ACHIEVEMENT_PERCENTAGE}${FAILURE_TYPE}`
        })
    }
}

export const listMonitor = (parameter,token) => async dispatch => {
    dispatch({
        type:`${LIST_PROBLEMLOG_MONITORING}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).listMonitor(parameter)
        dispatch({
            type:`${LIST_PROBLEMLOG_MONITORING}${SUCCESS_TYPE}`,
            payload:{data:res.data}
        })
    } catch (error) {
        console.log('errorListMonitoring :',error)
        dispatch({
            type:`${LIST_PROBLEMLOG_MONITORING}${FAILURE_TYPE}`
        })
    }
}

export const closeProblemLog = (data,token) => async dispatch => {
    dispatch({
        type:`${CLOSE_PROBLEMLOG_MONITORING}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).closeProblemLog(data)
        dispatch({
            type:`${CLOSE_PROBLEMLOG_MONITORING}${SUCCESS_TYPE}`,
            payload:{status:res.status}
        })
    } catch (error) {
        console.log("errorClose :",error)
        dispatch({
            type:`${CLOSE_PROBLEMLOG_MONITORING}${FAILURE_TYPE}`
        })
    }
}

export const updateProblemLog = (data,token) => async dispatch => {
    dispatch({
        type:`${UPDATE_PROBLEMLOG_APPROVAL}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).updateProblemLog(data)
        setStorage(PROBLEMLOG_STORAGE,data.ProblemLog)
        dispatch({
            type:`${UPDATE_PROBLEMLOG_APPROVAL}${SUCCESS_TYPE}`,
            payload:{status:res.data}
        })
    } catch (error) {
        console.log("errorSave :",error)
        dispatch({
            type:`${UPDATE_PROBLEMLOG_APPROVAL}${FAILURE_TYPE}`
        })
    }
}
export const downloadReportProblemLog = (problemLogReport,token) => async dispatch => {
    dispatch({
        type:`${DOWNLOAD_REPORT_PROBLEM_LOG}${REQUEST_TYPE}`
    })
    try {
        const res = await api(token).downloadReportProblemLog(problemLogReport)  
        dispatch({
            type:`${DOWNLOAD_REPORT_PROBLEM_LOG}${SUCCESS_TYPE}`,
            payload:{data:res}
        })
    } catch (error) {
        console.log('DownloadProblemLogFailed',error)
        dispatch({
            type:`${DOWNLOAD_REPORT_PROBLEM_LOG}${FAILURE_TYPE}`,
            // payload:{data:error.request}
        })
    }
}