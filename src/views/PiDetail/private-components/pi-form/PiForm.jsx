import React from 'react';
import {CloseButton, ProceedConfirmation} from 'components'
import { Button, CircularProgress } from '@material-ui/core';
import './PiForm.scss'
import CollapseGroup from 'components/Checksheets/CollapseGroup';
import Additional from 'components/Checksheets/Additional/Additional';
import { Formik } from 'formik';
import {ConfirmationModal} from 'components/'

export default class PiForm extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
            isApproveConfirmationShow:false,
            isHandoverConfirmationShow:false,
            isShowNotification:false,
            isModalSuccess:false,
            activeIndex:0,
            initialValues:{
                ZoneCheckSheets:[]
            }
        }
    }
    _confirmButton = async (isHandover) => {
        let newAdditionaFluid = []
        let newChecksheet = []
        this.formik.values.ZoneCheckSheets.map((field) => {
            field.AdditionalFluids.map((fluid) => {
                newAdditionaFluid = [...newAdditionaFluid,fluid];
                return newAdditionaFluid;
            })
            field.AreaCheckSheets.map((area) => (
                area.CheckSheetValues.map((value) => {
                    newChecksheet = [...newChecksheet,value];
                    return newChecksheet;
                })))
            return field;
        })
        const {workOrderId,token} = this.props;
        const data = {
            Force: true,
            AdditionalFluids:newAdditionaFluid,
            CheckSheetValues:newChecksheet
        }
        if (isHandover) {
            this.setState({isHandoverConfirmationShow:false})
            this.setState({isModalSuccess:true})
            await this.props.submitPeriodicInspection(data,token)
            this.props.handover(workOrderId,token)
        }
        else {
            this.setState({
                isApproveConfirmationShow:false,
                isShowNotification:true
            })
            this.props.approvePi(workOrderId,token)
            this.props.unHandover(workOrderId,token)
            this.props.submitPeriodicInspection(data,token)
        }
    }
    _renderModalSucces = () => {
        const {isModalSuccess,isShowNotification} = this.state;
        const {approvalPiResponse} = this.props;
        console.log('renderModalSuccess',this.props)
        if(isModalSuccess) {
            return (
                <ConfirmationModal
                    open={this.state.isModalSuccess}
                    onClose={()=> this.setState({isModalSuccess:false})}
                    message={'Jobs has been handover'}
                />
        )
        }
        if(approvalPiResponse.data.Response) {
            return (
                <ConfirmationModal
                    open={isShowNotification}
                    //  onClose={}
                    message={'Jobs has been approved'}
                    isSucess={approvalPiResponse.data.Response}
                />
            )
        }
    }
    
    handeChangeFormPi = (newData,props) => {
        props.setFieldValue('ZoneCheckSheets',newData)
    }
    _renderMessageHandOver = () => {
        const {unitIdentity} = this.props;
        return (
            unitIdentity.IsHandover && !unitIdentity.SupervisorApprovedDate &&
            <p className='request-handover'>{'Your mechanic requested a handover permissions'}</p>
        )
    }
    showConfirmProcess = (isHandover,props) => {
        this.formik = props;
        if(isHandover) return this.setState({isHandoverConfirmationShow:true})
        return this.setState({isApproveConfirmationShow:true})
    }
    _renderButton = (props) => {
        const {unitIdentity} = this.props;
        return (
        <div className='btn-approve-container'>
            {!unitIdentity.SupervisorApprovedDate && 
                <div className='btn-submit' onClick={() => this.showConfirmProcess(true,props)}>
                Handover
                </div>
            }
                <div className='btn-approve' onClick={() => this.showConfirmProcess(false,props)}>
                Approve
                </div>
        </div>
        )
    }
    componentDidMount = () => {
        const { ZoneCheckSheets } = this.props;
        const { initialValues } = this.state;
        if (ZoneCheckSheets.length > 0 && initialValues.ZoneCheckSheets.length === 0) {
            initialValues.ZoneCheckSheets = ZoneCheckSheets
            this.setState({
                initialValues
            })
        }
    }
    _renderModalApprove = () => {
        const {isApproveConfirmationShow} = this.state;
        return (
            <ProceedConfirmation
                open = {isApproveConfirmationShow}
                onClose={() => this.setState({isApproveConfirmationShow:false})}
                onProceed = {() => this._confirmButton(false)}
            />
        )
    }
    _renderModalHandover = () => {
        const {isHandoverConfirmationShow} = this.state;
        return (
            <ProceedConfirmation
                open = {isHandoverConfirmationShow}
                onClose = {() => this.setState({isHandoverConfirmationShow:false})}
                onProceed = {() => this._confirmButton(true)}
            />
        )
    }
    _renderContent = () => {
        const {ZoneCheckSheets} = this.props;
        const {activeIndex,initialValues} = this.state
        return (
            <div className='pi-form-modal'>
                {/* Insert loading component here */}
                {this._renderLoadingScreen()}
                <CloseButton onClose={this.props.onClose}/>
                <div className='title-container'>
                    <p className='title'>Periodic Inspection</p>
                </div>
                <div className='zone-row'>
                { ZoneCheckSheets.map((zone,index) => (
                    <Button className={activeIndex === index ? 'zone-active' : 'zone'} key={index} onClick={() => this.setState({activeIndex:index})} >
                        {zone.ZoneDesc.slice(0,6)}
                    </Button>
                ))
                }
                </div>
                <div style={{ overflowY: 'scroll' }}>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                >
                {props => (
                    <form>
                {
                    props.values.ZoneCheckSheets.map((zone,index) => {
                        if(activeIndex === index){
                            return (
                                <>
                                <CollapseGroup
                                    {...this.props}
                                    AreaCheckSheets={zone.AreaCheckSheets}
                                    updatePiForm = {(newData) => this.handeChangeFormPi (newData,props)}
                                />
                                <Additional
                                    {...this.props}
                                    ZoneCheckSheets = {props.values.ZoneCheckSheets}
                                    additionalFluids={zone.AdditionalFluids}
                                    zoneDesc={zone.ZoneDesc}
                                    workOrderId={this.props.workOrderId}
                                    updatePiForm = {(newData) => this.handeChangeFormPi (newData,props)}
                                />
                                </>
                            )
                        }
                        return null;
                    })
                }
                    {this._renderMessageHandOver()}
                    {this._renderButton(props)}
                    </form>
                )}
                </Formik>
                </div>
            </div>
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

    render(){
        return(
            <>
            {this._renderContent()}
            {this._renderModalHandover()}
            {this._renderModalApprove()}
            </>
        )
    }
}