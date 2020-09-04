import React from 'react';
import {
    UnitIdentity,
    JobIdentity,
    JobTimeIdentity,
    JobList,
    JobStaging, 
    JobAssignment,
    InformationSummary,
    PiForm
} from './private-components';
import * as Yup from 'yup';
import {
    Link
} from 'react-router-dom';
import  {MENU}  from 'constants/menu';
import { KeyboardArrowRight } from '@material-ui/icons';
import './PiDetailPage.scss';
import { 
    DialogContent,
    Modal, 
    CircularProgress
} from '@material-ui/core';
import BacklogEntrySheetDetail from './private-components/backlog-entry-sheet-detail/BacklogEntrySheetDetail';
import BacklogJobsDetails from './private-components/backlog-jobs-detail/BacklogJobsDetails';
import {getStorage} from 'utils/storage.helper';
import {JOB_STORAGE} from 'constants/storage'
import JobInProgress from './private-components/job-in-progress/JobInProgress';
import { Formik } from 'formik';

export default class PiDetailPage extends React.Component{
    constructor(props){
        super(props);
        this.confirmationModalProps = {
            periodicInspection:{
                openModal:false,
                messageSuccess:'Periodical Inspection has been approved',
                messageFailure:'Please Re-Check Your Form Or Backlog Before Proceed',
                response:this.props.approvalPiResponse
            },
            bms:{
                messageSuccess:'Backlog Monitoring Sheet Has Been Approved',
                messageFailure:'',
                response:this.props.backlogMonitoringResponse
            },
            bes:{
                messageSuccess:'Backlog Entry Sheet Has Been Approved',
                messageFailure:'',
                response:this.props.backlogEntrySheetResponse
            },
            handover:{
                messageSuccess:'Handover job is success',
                messageFailure:'',
                response:this.props.handoverResponse
            },
        }
        this.state={
            isShowStagingProgress:false,
            isShowModalWorkOrders:false,
            isShowPiModal:false,
            isShowModalBesDetail:false,
            isShowModalProblemLogDetail:false,
            selectedJob:{},
            jobTime:{},
            backlogParams:{
                WoId:this.props.workOrderId,
                EquipmentNumber:'',
                Filter:'',
                ShowBES:false,
                ShowBMS:false,
                Query:{
                    PageNumber:1,
                    PageSize:2,
                    Sort:[],
                    Filter:[]
                }
            },
            problemLogParams:{
                WoId:this.props.workOrderId,
                Query:{
                    PageNumber: 1,
                    PageSize: 5,
                    Sort: [],
                    Filter: []
                }
            }
        }
    }
    _updateParameterBacklog = (field,value) => {
        const { backlogParams } = this.state;
        this.setState({
            backlogParams: {
              ...backlogParams,
              Query: {
                ...backlogParams.Query,
                [field]: value
              }
            }
          });
    }
    _updateParameterProblem = (field,value) => {
        const { problemLogParams } = this.state;
        this.setState({
            problemLogParams: {
              ...problemLogParams,
              Query: {
                ...problemLogParams.Query,
                [field]: value
              }
            }
          });
    }
    // Handling close button component
    handleOnClose = (key) => {
        const {token}=this.props;
        const {backlogParams}=this.state;
        switch (key) {
            case 'backlog':
                this.setState({
                    isShowBMS:false,
                    isShowModalBesDetail:false,
                })
                this.props.fetchSummaryBacklog(this.summaryBacklog,token);
                this.props.fetchListBacklog(backlogParams,token);
                break;
            default:
                this.setState({
                    isShowPiModal:false,
                    isShowModalWorkOrders:false,
                    isShowStagingProgress:false
                })
                break;
        }
    }
    // Handling click Icon on Information Summary
    handleClickPiForm = () => {
        // Insert condition if action request success
        this.setState({
            isShowPiModal:!this.state.isShowPiModal
        })
    }

    // Handling Click Modal Detail BES / BMS
    handleClickBacklogDetail = (backlog) => {
        const {token} = this.props
        console.log('qwerty:',backlog.ObjectPart)
        this.props.fetchDetailBacklog(backlog.Id,token);
        this.props.fetchSpecificObjectChoices(backlog.ObjectPart.Code,token)

    } 
    // Handling Click Modal Detail Problem Logs

    // Handling Click Modal Jobs by Work Order
    handleClickWorkOrder = (data) => {
        console.log('datajoblist',data)
        const {token} = this.props;
        // Fetch API Here
        this.setState({
            isShowBMS:true
        })
        this.props.fetchDetailBacklog(data.Id,token);
    }
    // Handling Click see detail job staging
    _handleClickSeeDetails = () => {
        this.setState({
            isShowStagingProgress:true
        })
    }
    // Handling click backlog entry sheet
    _handleClickBacklogList = (key) => {
        const {backlogParams,selectedJob} = this.state;
        if (key === 'EntrySheet') {
            this.setState({
                backlogParams:{
                    ...backlogParams,
                    ShowBES:true,
                    ShowBMS:false,
                    EquipmentNumber:selectedJob.EquipmentNumber
                }   
            });
        }
        if (key === 'MonitoringSheet') {
            this.setState({
                backlogParams:{
                    ...backlogParams,
                    ShowBMS:true,
                    ShowBES:false,
                    EquipmentNumber:selectedJob.EquipmentNumber

                }   
            });
        }
        
    }
    _searchParameter = (value) => {
        const {backlogParams} = this.state;
        this.setState({
            backlogParams:{
              ...backlogParams,
              SearchValue:value
            }
          })
    }
    _handleChangeData = (key,event,props) => {
        switch (key) {
            case 'SMR':
                props.setFieldValue('SMR',event.target.value)
                break;
            case 'HM':
                props.setFieldValue('HM',event.target.value)
                break;
            case 'KM':
                props.setFieldValue('KM',event.target.value)
                break;
            default:
                break;
        }
    }
    _handleSubmitJobTime = (values) => {
        console.log('values:',values)
        const {token} = this.props;
        this.props.submitEquipmentValue(values,token);
    }
    // Render component
    _renderCardJobs = () => {
        const {unitIdentity,jobTime}= this.props
        console.log('hasilSMR',jobTime.SMR + 100)
        const jobTimeValidation = Yup.object().shape({
            SMR:Yup.number()
            .min(jobTime.SMR,`value can't less than SMR`)
            .max(jobTime.SMR + 100,`value can't more than ${jobTime.SMR + 100}`)
            .required('Required SMR'),
            HM:Yup.number()
            .min(jobTime.HM,`value can't' less than HM`)
            .max(jobTime.HM + 100,`value can't more than ${jobTime.HM + 100}`)
            .required('Required HM'),
            KM:Yup.number()
            .min(jobTime.KM,'value cannot less than HM')
            .max(jobTime.KM + 100,`value cannot more than ${jobTime.KM + 100}`)
            .required('Required KM'),
        })
        return (
            <div className='job-identity'>
                <UnitIdentity unitIdentity={unitIdentity}/>
                <JobIdentity jobIdentity={unitIdentity}/>
                
                <Formik
                    enableReinitialize
                    initialValues={jobTime}
                    validationSchema={jobTimeValidation}
                    onSubmit={this._handleSubmitJobTime}
                >
                {
                    props => (
                        <JobTimeIdentity
                            handleSubmitJobTime={props.handleSubmit}
                            handleChangeJobTime={(key,event) => this._handleChangeData(key,event,props)} 
                            jobTime={props.values}
                            unitIdentity={unitIdentity}
                            jobTimeError={props.errors}
                        />
                    )
                }
                </Formik>
            </div>
        )
    }
    _renderBreadCrumbs = () => {
        return (
            <div className='sub-app-bars'>
            {/* Translate Text */}
                <Link className='link' to={MENU.DASHBOARD}>Home</Link>
                <KeyboardArrowRight className='arrow-right'/>
                <Link className='link' to={MENU.JOBS_SUMMARY}>Jobs Assignment</Link>
                <KeyboardArrowRight className='arrow-right'/>
                <p className ='not-link'>Detail PI</p>
            </div>
        )
    }
    _renderContent = () => {
        const {stagingInfo} = this.props;
        const {selectedJob} = this.state;
        const isOnProgress = stagingInfo.length >=9 || selectedJob.Status === 'Need Approval';
        return (
            <>
            <JobStaging
                {...this.props}
                displayMode={this.props.displayMode}
                onClick={this._handleClickSeeDetails}
            />
            {/* Condition if progress not finished yet */}
            { !isOnProgress && 
            <JobList
                {...this.props}
                displayMode={this.props.displayMode}
                searchbacklogParams={this._searchParameter}
                onClick={this.handleClickWorkOrder}
            />
            }
            {/* Condition if Status not unassign */}
            {selectedJob.Status !== 'unassign' &&
            <JobAssignment
                {...this.props}
                displayMode={this.props.displayMode}
            />
            }
            { isOnProgress &&
            <InformationSummary
                {...this.props}
                updateParameterBacklog={this._updateParameterBacklog}
                updateParameterProblem={this._updateParameterProblem}
                backlogParams={this.state.backlogParams}                
                displayMode={this.props.displayMode}
                onClickPiForm={this.handleClickPiForm}
                onClickBacklogDetail={this._handleClickBacklogList}
                onClickBacklogList={this.handleClickBacklogDetail}
            />
            }
            </>
        )
    }

    // Render Modals on Detail Pages 
    _renderModalPi = () => {
        return (
            <Modal open={this.state.isShowPiModal} className='modal-container' onClose={this.handleOnClose}>
                <DialogContent className='modal-content'>
                    <PiForm
                        {...this.props}
                        ZoneCheckSheets = {this.props.checksheetPi.ZoneCheckSheets}
                        onClose={this.handleOnClose}
                    />
                </DialogContent>
            </Modal>
        )
    }
    _renderModalBacklog = () => {
        
        return (
            <>
            <Modal
                className='modal-container'
                open={this.state.isShowModalBesDetail}
                onClose={this.handleOnClose}
            >
                <DialogContent className='modal-content'>                    
                    <BacklogEntrySheetDetail
                    {...this.props}
                    backlogParams={this.state.backlogParams}
                    onClose={() => this.handleOnClose('backlog')}
                    />
                </DialogContent>
            </Modal>
            </>
        )
    }
    renderModalJobList = () => {
        return (
            <Modal
                className='modal-container'
                open={this.state.isShowModalWorkOrders}
                onClose={this.handleOnClose}
            >
                <DialogContent className='modal-content'>
                    <BacklogJobsDetails
                        {...this.props}
                        onClick={this.handleOnClose}
                    />
                </DialogContent>
            </Modal>
        )
    }
    renderModalStaging = () => {
        return (
            <Modal
                className='modal-container'
                open={this.state.isShowStagingProgress}
                onClose={this.handleOnClose}
            >
                <DialogContent className='modal-content'>
                    <JobInProgress
                        stagingInfo={this.props.stagingInfo}
                        onClose={this.handleOnClose}
                    />
                </DialogContent>
            </Modal>
        )
    }
    _renderLoadingScreen = () => {
        const {isLoading} = this.props;
        return (
            <>
            {
              isLoading && <CircularProgress size={100} className="circular-progress" />
            }
            </>
            )
    }
    
    componentDidMount = async () => {
        const {token,workOrderId} = this.props;
        const {problemLogParams,backlogParams} = this.state;
        const selectedJob = getStorage(JOB_STORAGE)
        await this.props.fetchDetailJob(workOrderId,token);
        this.props.fetchJobTime(workOrderId,token);
        this.setState({
            selectedJob:selectedJob,
        })
        this.props.fetchSummary(workOrderId,token);
        this.props.fetchStaging(workOrderId,token);
        this.props.fetchMasterDataBacklog(token);
        // Test 
        // this.props.fetchCheckSheetValue(selectedJob.Id,token);
        // this.props.fetchUnitModel(selectedJob.UnitModel,token);
        // this.props.fetchCountImpact(workOrderId,token);
        // this.props.fetchListProblemLog(problemLogParams,token);
        // 
        if(selectedJob.Status === 'need approval') {
            this.props.fetchCountImpact(workOrderId,token);
            this.props.fetchListProblemLog(problemLogParams,token);
            this.props.fetchCheckSheetValue(selectedJob.Id,token);
            this.props.fetchUnitModel(selectedJob.UnitModel,token);
        }
        this.summaryBacklog = {
            WoId:workOrderId,
            EquipmentNumber:selectedJob.EquipmentNumber
        }
        this.props.fetchSummaryBacklog(this.summaryBacklog,token);
        if(selectedJob.Status !== 'Need Approval') {
            backlogParams.ShowBMS = true;
            backlogParams.EquipmentNumber = selectedJob.EquipmentNumber;
            this.setState({
                backlogParams
            })
            this.props.fetchListBacklog(backlogParams,token);
        }
        this.setState({
            jobTime:this.props.jobTime
        })
        
        
    }
    componentDidUpdate = (prevProps,prevState) => {
        const {token,isLoadingBacklog,isLoadingApproval} = this.props;
        const {backlogParams,problemLogParams} = this.state;
        if(prevProps.isLoadingApproval !== this.props.isLoadingApproval) {
            this.setState({
                confirmationModalProps:{
                    ...this.confirmationModalProps.periodicInspection,
                    isSuccess:this.props.approvalPiResponse,
                }
            })
        }
        if(prevState.problemLogParams !== this.state.problemLogParams){
            this.props.fetchListProblemLog(problemLogParams,token);
        }
        if(prevState.backlogParams !== this.state.backlogParams){
            this.props.fetchListBacklog(backlogParams,token);
        }
        if(prevState.backlogParams.showBES !== this.state.backlogParams.showBES) {
            this.props.fetchListBacklog(backlogParams,token);
        }
        if(prevState.backlogParams.ShowBMS !== this.state.backlogParams.ShowBMS) {
            this.props.fetchListBacklog(backlogParams,token);
        }
        if(prevProps.isLoadingBacklog && !isLoadingBacklog){
            if(this.state.isShowBMS){
                this.setState({
                    isShowModalWorkOrders:true,
                })
            }
            else {
            this.setState({
                isShowModalBesDetail:!this.state.isShowModalBesDetail
            })}
        }
        // if(prevProps.isLoadingApproval && !isLoadingApproval){
        //     this.setState({
        //         isShowModalBesDetail:false
        //     })
        //     this.props.fetchListBacklog(backlogParams,token);
        //     this.props.fetchSummaryBacklog(this.summaryBacklog,token);
        // }
    }
    // _renderConfirmationStatus = () => {
    //     <ConfirmationModal
    //         open={this.confirmationModalProps.openModal}
    //         onClose={}
    //         isSuccess={this.confirmationModalProps.isSuccess}
    //         errorMessage={this.confirmationModalProps.messageFailure}
    //         successMessage={this.confirmationModalProps.messageSuccess}
    //     />
    // }
    // First Rendering
    render(){
        console.log('PIDETAIL',this.props)
        console.log('INI STATE DUDE',this.state)
        const {displayMode} = this.props;
        if(displayMode === 'tab'){
            return (
                <main className='content2'>
                    {this._renderBreadCrumbs()}
                    <div className='job-identity-container'>
                        {this._renderCardJobs()}
                    </div>
                    <div className="detail-page-content">
                        <div className="line" />
                        <div className="detail">
                        {this._renderContent()}
                        </div>
                    </div>
                    {this._renderModalPi()}
                    {this._renderModalBacklog()}
                </main>
            )
        }
        return(
            <main className='content2'>
                {this._renderLoadingScreen()}
                {this._renderBreadCrumbs()}
                <div className='detail-page-content'>
                    {this._renderCardJobs()}
                    {this._renderContent()}
                </div>
                {this._renderModalPi()}
                {this._renderModalBacklog()}
                {this.renderModalJobList()}
                {this.renderModalStaging()}
            </main>
        )
    }
}