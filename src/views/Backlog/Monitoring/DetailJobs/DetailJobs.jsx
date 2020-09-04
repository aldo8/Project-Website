import React from 'react';
import { 
    Modal, 
    FormControl, 
    Select, 
    MenuItem, 
    CircularProgress
} from '@material-ui/core';
import styles from './DetailJobs.module.scss';
import {Button} from '@material-ui/core';
import { Formik } from 'formik';
import { BesHand } from 'assets/images';
import {Pencil} from 'assets/icons';
import { ConfirmationModal } from 'components';
export default class DetailJobs extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
             isConfirmApprove:false,
             isConfirmSave:false,
             isNotificationModal:false,
             initialValues:{
                 images:[],
                 partRequirements:[]
             }
        }
    }
    componentWillMount = () => {
        this.setState({
            initialValues:this.props.detailBms
        })
    }
    _handleClickConfirm = async (key,props) => {
        const {token} = this.props;
        switch(key){
            case 'confirmSave':
            this.setState({
                isConfirmSave:true
            })
            break;
            case 'confirmApprove':
            this.setState({
                isConfirmApprove:true
            })
            break;
            case 'cancelSave':
            this.setState({
                isConfirmSave:false
            })
            break;
            case 'cancelApprove':
            this.setState({
                isConfirmApprove:false
            })
            break;
            case 'submitBacklog':
                await this.props.submitBacklogMonitoring(props.values,token)
                this.setState({
                    isConfirmSave:false,
                    isNotificationModal:true
                })
                break;
            case 'approveBacklog':
                await this.props.submitBacklogMonitoring(props.values,token)
                await this.props.approveBacklogMonitoring(props.values.Id,token)
                this.setState({
                    isConfirmApprove:false,
                    isNotificationModal:true
                })
                break;
            default:
            break;
        }
    }
    _handleChangeObject = (key,event,props) => {
        const {masterDataBacklog} = this.props
        console.log('masterDataBacklog',masterDataBacklog)
        switch (key) {
            case 'suggestedAction':
                const suggestedAction = masterDataBacklog.SuggestedActions.find(({Code}) => Code === event.target.value)
                return props.setFieldValue('SuggestedAction',suggestedAction)
            case 'actions':
                const act = masterDataBacklog.Actions.find(({Desc}) => Desc === event.target.value)
                return props.setFieldValue('action',act)
            case 'status':
                const status = masterDataBacklog.BacklogStatuses.find(({Status}) => Status.toUpperCase() === event.target.value)
                console.log('status:',status.Status)
                return props.setFieldValue('Status',status.Status)
            default:
                break;
        }
    }
    _renderTitlePages = () => {
        return(
            <div className={styles['modal-header']}>
                <p>Backlog Monitoring Sheet</p>
            </div>
        )
    }
    _renderProblemEvidence = (props) => {
        console.log('EVIDENCE',props.values.images)
        const images = props.values.Images;
        return(
            <div className={styles['problem-evidence-container']}>
                <p className={styles['title']}>Problem Evidence</p>
                <div className={styles['problem-evidence-container']}>
                    {
                        images[0] &&
                        <div className={styles['image-container']}>
                            <div className={styles['image-header']}>
                            <label className={styles['image-label']}>Foto Tampak Depan</label>
                            <div className={styles['edit-img-container']}>
                                <input className={styles['add-image-input']} type='file' onChange={event => this._handleChangeImages('changeImages',event,0,props)}/>
                                <img className={styles['edit-img']} alt='edit icon' src={Pencil}/>
                            </div>
                        {/* Insert condition set preview images */}
                        </div>
                        <img className={styles['tractor-img']} alt='images-1' src={images[0]}/>
                        </div>
                    }
                    {
                        images[1] &&
                        <div className={styles['image-container']}>
                            <div className={styles['image-header']}>
                            <label className={styles['image-label']}>Foto Tampak Samping</label>
                            <div className={styles['edit-img-container']}>
                                <input className={styles['add-image-input']} type='file' onChange={event => this._handleChangeImages('changeImages',event,0,props)}/>
                                <img className={styles['edit-img']} alt='edit icon' src={Pencil}/>
                            </div>
                        {/* Insert condition set preview images */}
                        </div>
                        <img className={styles['tractor-img']} alt='images-1' src={images[1]}/>
                        </div>
                    }
                    {
                        images[2] &&
                        <div className={styles['image-container']}>
                            <div className={styles['image-header']}>
                            <label className={styles['image-label']}>Foto Tampak Belakang</label>
                            <div className={styles['edit-img-container']}>
                                <input className={styles['add-image-input']} type='file' onChange={event => this._handleChangeImages('changeImages',event,0,props)}/>
                                <img className={styles['edit-img']} alt='edit icon' src={Pencil}/>
                            </div>
                        {/* Insert condition set preview images */}
                        </div>
                        <img className={styles['tractor-img']} alt='images-1' src={images[2]}/>
                        </div>
                    }
                </div>
            </div>
        )
    }
    _renderProblemIdentity = (props) => {
        const {masterDataBacklog} = this.props;
        return (
            <div className={styles['problem-identity-container']}>
                <p>Problem Identity</p>
                <div className={styles['item-row-container']}>
                    <div className={styles['item-column-container']}>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>PROBLEM DESC</p>
                            <div className={styles['text-input']}>{props.values.ProblemDesc}</div>
                        </div>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>BACKLOG DATE</p>
                            <div className={styles['text-input']}>{'value backlog'}</div>
                        </div>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>UNIT MODEL</p>
                            <div className={styles['text-input']}>
                                {props.values.UnitModel || '-'}
                            </div>
                        </div>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>WORK ZONE</p>
                            <div className={styles['text-input']}>
                                {props.values.WorkZone ? props.values.WorkZone.Zone : '-'}
                            </div>
                        </div>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>OBJECT PART</p>
                            <div className={styles['text-input']}>
                                {props.values.ObjectPart ? props.values.ObjectPart.Category : '-'}
                            </div>
                        </div>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>DAMAGE</p>
                            <div className={styles['text-input']}>
                                {props.values.Damage ? props.values.Damage.Desc : '-'}
                            </div>
                        </div>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>SUGGESTED ACTION</p>
                            <FormControl className={styles['form-control']}>
                            <Select 
                                classes={{select:'select-item'}} 
                                onChange={event => this._handleChangeObject('suggestedAction',event,props)}
                                value={props.values.SuggestedAction ? props.values.SuggestedAction.Code :'Pilih Action Desc'}
                            >
                                {
                                    masterDataBacklog.SuggestedActions.map((field) => (
                                        <MenuItem value={field.Code}>
                                            {field.Desc}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                            </FormControl>
                        </div>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>ACTION</p>
                            <FormControl className={styles['form-control']}>
                            <Select 
                                classes={{select:'select-item'}} 
                                onChange={event => this._handleChangeObject('actions',event,props)}
                                value={props.values.Action ? props.values.Action.Desc : 'Pilih Action'}
                            >
                            {
                                masterDataBacklog.Actions.map((field) => (
                                <MenuItem value={field.Desc}>
                                    {field.Desc}
                                </MenuItem>
                            ))}
                            </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className={styles['item-column-container']}>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>NOTIFICATION</p>
                            <div className={styles['text-input']}>{props.values.NotificationNumber || '-'}</div>
                        </div>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>UNIT CODE</p>
                            <div className={styles['text-input']}>{props.values.UnitCode || '-'}</div>
                        </div>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>SMR</p>
                            <div className={styles['text-input']}>{props.values.SMR || 0}</div>
                        </div>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>SPECIFIC OBJECT PART</p>
                            <div className={styles['text-input']}>
                                {props.values.ObjectSpecificPart ? props.values.ObjectSpecificPart.Desc : '-'}
                            </div>
                        </div>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>CAUSE</p>
                            <div className={styles['text-input']}>
                                {props.values.Cause ? props.values.Cause.Desc : '-'}
                            </div>
                        </div>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>ESTIMATED JOB(HOURS)</p>
                            <div className={styles['text-input']}>
                                {props.values.EstimatedJob || 0}
                            </div>
                        </div>
                        <div className={styles['item']}>
                            <p className={styles['item-label']}>STATUS</p>
                            <FormControl className={styles['form-control']}>
                                <Select 
                                    classes={{select:'select-item'}} 
                                    onChange={event => this._handleChangeObject('status',event,props)}
                                    value={props.values.Status ? props.values.Status.toUpperCase() : 'Pilih Status'}
                                >
                                {
                                    masterDataBacklog.BacklogStatuses.map((field) => (
                                        <MenuItem value={field.Status.toUpperCase()}>
                                        {field.Status.toUpperCase()}
                                        </MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    _renderPartRequirement = (props) => {
        return(
            <div className={styles['part-requirement-container']}>
                <p>Part Requirement</p>
                <div className={styles['row-container-header']}>
                    <div className={styles['label-part-number']}>Part Number</div>
                    <div className={styles['label-part-description']}>Part Description</div>
                    <div className={styles['label-qty']}>Qty</div>
                </div>
                <div className={styles['container-content']}>
                    {/* Mapping data of part number */}
                    {
                        props.values.partRequirements && props.values.partRequirements.map((field) => (
                            <div className={styles['row-container-content']}>
                            <div className={styles['detail-part-number']}>{field.partNumber}</div>
                            <div className={styles['detail-part-description']}>{field.partDescription}</div>
                            <div className={styles['detail-qty']}>
                                <div className={styles['detail-qty-value']}>{field.quantity}</div>
                            </div>
                            </div>       
                        ))
                    }
                </div>
                <div className={styles['img-container']}>
                    <img className={styles['beshand-bms']} alt='Logo' src={BesHand}/>
                </div>
                {
                    this.props.detailBms.Status !== 'closed' &&
                    <div className={styles['btn-row-container']}>
                        <Button 
                        className={styles['btn-approve']} 
                        onClick={() => this._handleClickConfirm('confirmSave')}
                        >
                            Save
                        </Button>
                        <Button 
                        disabled={props.values.status === 'Open'}
                        className={styles['btn-approve']} 
                        onClick={() => this._handleClickConfirm('confirmApprove')}
                        >
                            Approve
                        </Button>
                    </div>
                }
            </div>
        )
    }
    
    _renderModalConfirmApprove = (props) => {
        return(
             <Modal
                className={styles["modal-container"]}
                classes={styles["modal-container"]}
                open={this.state.isConfirmApprove}
                onClose={() => this._handleClickConfirm('cancelApprove')}
            >
            <div className={styles["save-modal"]}>
            <div className={styles["close-btn-row"]}>
            <div
              className={styles["close-btn"]}
              onClick={() => this._handleClickConfirm('cancelApprove')}
            />
            </div>
            <div className={styles["title-modal-row"]}>
            <p className={styles["title-modal-approval"]}>
              Are you sure want to approve ?
            </p>
            </div>
            <div className={styles["button-modal-row"]}>
            <div
              className={styles["btn-yes"]}
              onClick={() => this._handleClickConfirm('approveBacklog',props)}
            >
              Yes
            </div>
            <div
              className={styles["btn-no"]}
              onClick={() => this._handleClickConfirm('cancelApprove')}
            >
              No
            </div>
            </div>
            </div>
            </Modal>
        )
    }
    _renderModalConfirmSave = (props) => {
        return(
            <Modal
                className={styles["modal-container"]}
                classes={styles["modal-container"]}
                open={this.state.isConfirmSave}
                onClose={() => this._handleClickConfirm('cancelSave')}
            >
            <div className={styles["save-modal"]}>
            <div className={styles["close-btn-row"]}>
            <div
              className={styles["close-btn"]}
              onClick={() => this._handleClickConfirm('cancelSave')}
            />
            </div>
            <div className={styles["title-modal-row"]}>
            <p className={styles["title-modal-approval"]}>
              Are you sure want to save ?
            </p>
            </div>
            <div className={styles["button-modal-row"]}>
            <div
              className={styles["btn-yes"]}
              onClick={() => this._handleClickConfirm('submitBacklog',props)}
            >
              Yes
            </div>
            <div
              className={styles["btn-no"]}
              onClick={() => this._handleClickConfirm('cancelSave')}
            >
              No
            </div>
            </div>
            </div>
            </Modal>
        )
    }
    _renderContent = () => {
        const {initialValues} = this.state;
        return(
            <div className={styles['modal-body']}>
            <Formik
                    enableReinitialize
                    initialValues={initialValues}
                >
                { props => (
                <div className={styles['modal-content-container']}>
                    {this._renderProblemEvidence(props)}
                    {this._renderProblemIdentity(props)}
                    {this._renderPartRequirement(props)}
                    {this._renderModalConfirmSave(props)}
                    {this._renderModalConfirmApprove(props)}
                </div>
                )}
            </Formik>
            </div>
        )
    }
    _renderLoadingScreen = () => {
        const {isLoading} = this.props
        console.log('isLoading',isLoading)
        return (
        <>
        {
            isLoading && <CircularProgress size={100} className="circular-progress" />
        }
        </>
        )
    }
    _renderModalNotification = () => {
        return (
        <ConfirmationModal
            open={this.state.isNotificationModal}
            onClose={() => this.setState({isNotificationModal:false})}
            message={this.props.responseWebSubmit ? 'Backlog Has Been Saved!' : 'Backlog Cannot Be Saved!'}
            isSuccess={this.props.responseWebSubmit}
            isLoading={this.props.isLoading}
        />
        );
    }
    render(){
        console.log('RESPONSEEEE',this.props)
        return(
            <>
            {this._renderLoadingScreen()}
                <div className={styles['modal-content-monitoring']}>
                    <div className='close-button-row'>
                    <div className='close-button' onClick={this.props.onClose}/>
                    </div>
                    {this._renderTitlePages()}
                    {this._renderContent()}
                    {this._renderModalNotification()}
                </div>
            </>
        )
    }
}