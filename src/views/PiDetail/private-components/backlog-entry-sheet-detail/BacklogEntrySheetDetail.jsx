import React from 'react';
import './BacklogEntrySheetDetail.scss';
import { CloseButton, SearchInput, ProceedConfirmation, ConfirmationModal } from 'components';
import {Pencil,Bin,CheckedGood, Delete} from 'assets/icons';
import './BacklogEntrySheetDetail.scss';
import { Formik, FieldArray } from "formik";
import { 
    FormControl, 
    MenuItem,
    Select, 
    Input,
    Button,
    CircularProgress,
} from '@material-ui/core';
import { BesHand, AddPicture } from 'assets/images';
import { convertToLocale } from 'utils/dateTime.helper';
import { Warning } from '@material-ui/icons';

export default class BacklogEntrySheetDetail extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            isShowEvidence:true,
            isShowIdentity:false,
            isShowRequirement:false,
            isShowConfirmationSave:false,
            isShowConfirmationApprove:false,
            isShowConfirmationReject:false,
            isShowNotification:false,
            initialValues:{
                Images:[],
                PartRequirements:[],
            }
        }
    }
    _renderConfirmationSave = (props) => {
        const {isShowConfirmationSave} = this.state;
        return(
            <ProceedConfirmation
                open={isShowConfirmationSave}
                onProceed={() => this._handleClickButton('submitBacklog',props)}
                onClose={() => this.setState({isShowConfirmationSave:false})}
            />
        )
    }
    _renderConfirmationApprove = (props) => {
        const {isShowConfirmationApprove} = this.state;
        return(
            <ProceedConfirmation
                open={isShowConfirmationApprove}
                onProceed={this.isBes ? () => this._handleClickButton('approveBacklog',props) : () => this._handleClickButton('approveMonitoring',props)}
                onClose={() => this.setState({isShowConfirmationApprove:false})}
            />
        )
    }
    _renderConfirmationReject = (props) => {
        const {isShowConfirmationReject} = this.state;
        return(
            <ProceedConfirmation
                open={isShowConfirmationReject}
                onProceed={() => this._handleClickButton('rejectBacklog',props)}
                onClose={() => this.setState({isShowConfirmationReject:false})}
            />
        )
    }
    _renderLoadingScreen = () => {
        const {isLoadingValidation} = this.props;
        return (
            <>
            {
                isLoadingValidation && <CircularProgress size={100} className="circular-progress" />
            }
            </>
            )
    }
    _handleClose = () => {
        this.setState({
            isShowNotification:false,
        })
        this.props.onClose()
        
    }
    _renderModalNotification = () => {
        const {besResponse} = this.props;
        console.log('coba aja dulu:',besResponse)   
        // Notification for BES
        if(besResponse.Response) {
        return (
            <ConfirmationModal
                open={this.state.isShowNotification}
                onClose={() => this._handleClose()}
                message={'Jobs has been approved'}
                isSuccess={besResponse.Response}
            />
        )
        }
        // Notification for BMS
        if(besResponse.status === 200){
            return (
                <ConfirmationModal
                    open={this.state.isShowNotification}
                    onClose={() => this._handleClose()}
                    message={'Jobs has been approved'}
                    isSuccess={besResponse.status === 200}
                />
            )   
        }
    }
    // Handle Search Spare part
    _handleSearch = (keyword) => {
        const {token} = this.props;
        if(keyword && keyword !== '') return this.props.fetchSparePart(keyword,token)
        return this.props.resultSparePart
    }
    // Handle Change Values
    _handleChangeObject = (key,event,props) => {
        const {masterDataBacklog,masterSpecificObjectPart} = this.props
        switch (key) {
            case 'objectPart':
                const objectPart = masterDataBacklog.ObjectParts.find(({Code}) => Code === event.target.value)
                return props.setFieldValue('ObjectPart',objectPart)
            case 'damage':
                const damage = masterDataBacklog.Damages.find(({Code}) => Code === event.target.value)
                return props.setFieldValue('Damage',damage)
            case 'suggestedAction':
                const suggestedAction = masterDataBacklog.SuggestedActions.find(({Code}) => Code === event.target.value)
                return props.setFieldValue('SuggestedAction',suggestedAction)
            case 'priority':
                const priority = masterDataBacklog.MPriorities.find(({Code}) => Code === event.target.value)
                return props.setFieldValue('Priority',priority)
            case 'smr':
                return props.setFieldValue('SMR',event.target.value)
            case 'specificObjectPart':
                const specificObjectPart = masterSpecificObjectPart.find(({Code}) => Code === event.target.value)
                return props.setFieldValue('ObjectSpecificPart',specificObjectPart)
            case 'cause':
                const cause = masterDataBacklog.Causes.find(({Code}) => Code === event.target.value)
                return props.setFieldValue('Cause',cause)
            case'decrease estimation':
                if (props.values.EstimatedJob !== 0) return props.setFieldValue('EstimatedJob',props.values.EstimatedJob - 0.25)
                break;
            case 'increase estimation':
                return props.setFieldValue('EstimatedJob',props.values.EstimatedJob + 0.25)
            case 'responsibility':
                const responsibilities = masterDataBacklog.Responsibilities.find(({Desc}) => Desc === event.target.value)
                return props.setFieldValue('Responsibility',responsibilities)            
            case 'actions':
                const act = masterDataBacklog.Actions.find(({Desc}) => Desc === event.target.value)
                return props.setFieldValue('Action',act)
            case 'status':
                const status = masterDataBacklog.BacklogStatuses.find(({Status}) => Status === event.target.value)
                return props.setFieldValue('Status',status.Status)
            default:
            break;
        }
    }
    // Handle Change Images
    _handleChangeImages = (key,event,index,props,arrayHelpers) => {
        const reader = new FileReader();
                const file = event.target.files[0];
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    if (file.size < 7500000) {
                    const img = new Image();
                    img.src = String(reader.result);
                    img.onload = () => {
                        const element = document.createElement('canvas');
                        const width = 250;
                        const scale = 250 / img.width;
                        const height = img.height * scale;
                        element.width = width;
                        element.height = height;
                        const ctx = element.getContext('2d');
                        if (ctx) ctx.drawImage(img, 0, 0, width, height);
                        this.dataImages = ctx ? ctx.canvas.toDataURL('image/jpg', 80) : '';
                        switch (key) {
                            case 'changeImages':
                                return props.setFieldValue(`Images[${index}]`, this.dataImages)
                            case 'addImages':
                                return arrayHelpers.push(this.dataImages)
                            default:
                                break;
                        }                
                    };
                    } else { this.setState({ error: 'File is too large' }); }
                };
        
    }
    // Handle Change Parts
    _handleChangePart = (event,key,type,props) => {
        const newPart = props.values.PartRequirements ? props.values.PartRequirements.map((field) => {
            if (type === 'increasePart' && field.PartNumber === key) {return {...field, Quantity:field.Quantity + 1}}
            if (type === 'decreasePart' && field.PartNumber === key && field.Quantity > 1) {return {...field, Quantity:field.Quantity - 1}}
            return {...field}
        }) : [];
        props.setFieldValue('PartRequirements',newPart)
    }
    _handleDeletedPart = (part,props) => {
        const deletedPart = props.values.PartRequirements ? props.values.PartRequirements.filter((field) => field.PartNumber !== part) : [] 
        props.setFieldValue('PartRequirements',deletedPart)
    }
    _handleClickButton = async (key,props) => {
        const {token} = this.props;
        switch (key) {
            case 'approveBacklog':
                this.setState({
                    isShowConfirmationApprove:false,
                    isShowNotification:true
                })
               await  this.props.approveBacklogEntrySheet(props.values.Id,token)
                break;
            case 'rejectBacklog':
                this.props.rejectBacklogEntrySheet(props.values.Id,token)
                this.setState({
                    isShowConfirmationReject:false
                })
                break;
            case 'submitBacklog':
                this.props.submitBacklogMonitoring(props.values,token)
                this.setState({
                    isShowConfirmationSave:false,
                })
                break;
            case 'approveMonitoring':
                this.setState({
                    isShowConfirmationApprove:false,
                    isShowNotification:true
                })
                await this.props.submitBacklogMonitoring(props.values,token)
                await this.props.approveBacklogMonitoring(props.values.Id,token)
                break;
            default:
                break;
        }
    }
    _selectedPart = (part,props) => {
        let isExist = false
        const newPart = props.values.PartRequirements ? props.values.PartRequirements : [];
        if (props.values.PartRequirements) {
            props.values.PartRequirements.map((field) => {
                if(field.PartNumber === part.PartNumber) isExist = true;
                return isExist;
            })
        }
        if(!isExist) newPart.push({...part,Quantity:1})
        props.setFieldValue('PartRequirements',newPart)
    }
    _validateSparePart = async (props) => {
        const {token} = this.props
        let sparePart = []
        let checkedSparePart = [];
        if(props.values.PartRequirements){
            props.values.PartRequirements.map((field) => {
                sparePart = [...sparePart,field.PartNumber]
                return sparePart;
            })
        }
       await this.props.validateParts(sparePart,token) 
       if(props.values.PartRequirements){
        props.values.PartRequirements.map((part) => (
        this.props.dataSparePartValidation.map((data) => {
            if(data.SparePartNumber === part.PartNumber){
                checkedSparePart = [...checkedSparePart, {...part,IsValidated:data.IsValidated}];
            }
            return checkedSparePart;
        })))}
        props.setFieldValue('PartRequirements',checkedSparePart)
    }
    _renderProblemEvidence = (props,arrayHelpers) => {
        const images = props.values.Images;
        return (
            // Images 1
            <>
                {
                    props.values.Images[0] &&
                    <div className='image-container'>
                    <div className='image-header'>
                        <label className='image-label'>Foto 1</label>
                        <div className='edit-img-container'>
                            <input className='add-image-input' type='file' onChange={event => this._handleChangeImages('changeImages',event,0,props)}/>
                            <img className='edit-img' alt='edit icon' src={Pencil}/>
                        </div>
                        {/* Insert condition set preview images */}
                    </div>
                    <div>
                        <img className='tractor-img' alt='evidence' src={props.values.Images[0]}/>
                    </div>
                    </div>
                }
                {/* Images 2 */}
                {
                    props.values.Images[1] &&
                    <div className='image-container'>
                    <div className='image-header'>
                        <label className='image-label'>Foto 2</label>
                        <div className='edit-img-container'>
                            <input className='add-image-input' type='file' onChange={event => this._handleChangeImages('changeImages',event,1,props)}/>
                            <img className='edit-img' alt='edit icon' src={Pencil}/>
                        </div>
                        {/* Insert condition set preview images */}
                    </div>
                    <div>
                        <img className='tractor-img' alt='evidence' src={props.values.Images[1]}/>
                    </div>
                    </div>
                }
                {/* Images 3 */}
                {
                    props.values.Images[2] &&
                    <div className='image-container'>
                    <div className='image-header'>
                        <label className='image-label'>Foto 3</label>
                        <div className='edit-img-container'>
                            <input className='add-image-input' type='file' onChange={event => this._handleChangeImages('changeImages',event,2,props)}/>
                            <img className='edit-img' alt='edit icon' src={Pencil}/>
                        </div>
                        {/* Insert condition set preview images */}
                    </div>
                    <div>
                        <img className='tractor-img' alt='evidence' src={props.values.Images[2]}/>
                    </div>
                    </div>
                }
                {
                    props.values.status !== 'CLOSED' && images.length < 3
                    && (
                        <div className='add-image'>
                            <input className='add-image-input' alt ='add images' type='file' onChange={event => this._handleChangeImages('addImages',event,3,props,arrayHelpers)}/>
                            <img className='add-image-icon' alt='add icon' src={AddPicture}/>
                        </div>
                    )
                }
            </>
        )
    }
    _renderProblemDescription = (props) => {
        return (
            <div className='item'>
                <label className='item-label'>PROBLEM DESCRIPTION</label>
                <p className='text-input-ellipsis'>{props.values.ProblemDesc}</p>
            </div>
        )
    }
    _renderProblemIdentity = (props) => {
        this.isBes = this.props.backlogParams.ShowBES
        const {backlogParams,masterDataBacklog} = this.props; 
        return (
            <>
            <div className='item-row-container'>
            <div className='item-column-container'>
            {this._renderProblemDescription(props)}
                    <div className='item'>
                        <label className='item-label'>BACKLOG DATE</label>
                        <p className='text-input'>{convertToLocale(props.values.CreatedDate,true)}</p>
                    </div>
                    <div className='item'>
                        <label className='item-label'>UNIT MODEL</label>
                        <p className='text-input'>{props.values.UnitModel || '-'}</p>
                    </div>
                    <div className='item'>
                        <label className='item-label'>WORK ZONE</label>
                        <p className='text-input'>{props.values.WorkZone ? `Zone ${props.values.WorkZone.Zone}` : '-'}</p>
                    </div>
                    <div className='item'>
                        <label className='item-label'>OBJECT PART</label>
                        {
                            this.isBes ? 
                            <FormControl className='form-control'>
                            <Select 
                                classes={{select:'select-item'}} 
                                onChange={event => this._handleChangeObject('objectPart',event,props)} 
                                value={props.values.ObjectPart ? props.values.ObjectPart.Code : 'Pilih Object Part'}
                            >
                            {
                                masterDataBacklog.ObjectParts.map((field) => (
                                    <MenuItem value={field.Code}>
                                    {field.Category}
                                </MenuItem>
                                ))
                            }
                            </Select>
                            </FormControl>
                            :
                            <div className='text-input'>{props.values.ObjectPart ? props.values.ObjectPart.Category : '-'}</div>
                        }
                    </div>
                    <div className='item'>
                        <label className='item-label'>DAMAGE</label>
                        {
                            this.isBes ? 
                            <FormControl className='form-control'>
                            <Select 
                                classes={{select:'select-item'}} 
                                onChange={event => this._handleChangeObject('damage',event,props)} 
                                value={props.values.Damage ? props.values.Damage.Code : 'Pilih Damage'}
                            >
                            {
                                masterDataBacklog.Damages.map((field) => (
                                    <MenuItem value={field.Code}>
                                    {field.Desc}
                                    </MenuItem>
                                ))
                            }
                            </Select>
                            </FormControl>
                            :
                            <div className='text-input'>{props.values.Damage ? props.values.Damage.Desc : '-'}</div>
                        }
                    </div>
                    <div className='item'>
                        <label className='item-label'>SUGGESTED ACTION</label>
                            <FormControl className='form-control'>
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
                    <div className='item'>
                        <label className='item-label'>{this.isBes ? 'PRIORITY' : 'ACTION'}</label>
                        {
                            this.isBes ? 
                            <FormControl className='form-control'>
                            <Select 
                                classes={{select:'select-item'}} 
                                onChange={event => this._handleChangeObject('priority',event,props)}
                                value={props.values.Priority ? props.values.Priority.Code : 'Pilih Priority'}
                            >
                            {
                                masterDataBacklog.MPriorities.map((field) => (
                                    <MenuItem value={field.Code}>
                                    {field.Desc}
                                    </MenuItem>       
                                ))
                            }
                            </Select>
                            </FormControl>
                            :
                            <FormControl className='form-control'>
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
                        }
                    </div>
                </div>
                <div className='item-column-container'>
                    <div className='item'>
                        <label className='item-label'>{this.isBes ? 'BACKLOG SOURCE' : 'NOTIFICATION'}</label>
                        <p className='text-input'>{backlogParams.ShowBES ? props.values.JobType || '-' : props.values.NotificationNumber || '-'}</p>
                    </div>
                    <div className='item'>
                        <label className='item-label'>UNIT CODE</label>
                        <p className='text-input'>{props.values.UnitCode}</p>
                    </div>
                    {/* Insert Formik  */}
                    <div className='item'>
                        <label className='item-label'>SMR / KM</label>
                        {
                            this.isBes ? 
                            <Input className='text-input-form' onChange={event => this._handleChangeObject('smr',event,props)} value={props.values.SMR}></Input>
                            :
                            <div className='text-input'>{props.values.SMR || 0}</div>
                        }
                        
                    </div>
                    <div className='item'>
                        <label className='item-label'>SPECIFIC OBJECT PART</label>
                        {
                            this.isBes ?
                            (
                                <FormControl className="form-control">
                                    <Select 
                                        classes={{ select: 'select-item' }} 
                                        onChange={event => this._handleChangeObject('specificObjectPart',event,props)}
                                        value={props.values.ObjectSpecificPart ? props.values.ObjectSpecificPart.Code : 'Pilih cause'}
                                    >
                                    {this.props.masterSpecificObjectPart.map((specificObjectPart) => (
                                    <MenuItem
                                        key={specificObjectPart.Sequence}
                                        value={specificObjectPart.Code}
                                    >
                                    {specificObjectPart.Desc}
                                    </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            )
                            :
                                <div className='text-input'>{props.values.ObjectSpecificPart ? props.values.ObjectSpecificPart.Desc : '-'}</div>
                        }
                    </div>
                    <div className='item'>
                        <label className='item-label'>CAUSE</label>
                        {
                            this.isBes ? 
                            <FormControl className='form-control'>
                            <Select 
                                classes={{select:'select-item'}}
                                onChange={event => this._handleChangeObject('cause',event,props)}
                                value={props.values.Cause ? props.values.Cause.Code : 'Pilih Cause'}
                            >
                            
                            {
                                masterDataBacklog.Causes.map((field) => (
                                    <MenuItem value={field.Code}>
                                    {field.Desc}
                                    </MenuItem>
                                ))
                            }
                            </Select>
                            </FormControl>
                            :
                            <div className='text-input'>{props.values.Cause ? props.values.Cause.Desc : '-'}</div>
                        }
                    </div>
                    <div className='item'>
                        <label className='item-label'>ESTIMATED JOB (HOURS)</label>
                        {
                            this.isBes ?
                            <div className='item-row-button'>
                                <div className='button' onClick={event => this._handleChangeObject('decrease estimation',event,props)}>{'-'}</div>
                                <div className='count'>{props.values.EstimatedJob}</div>
                                <div className='button' onClick={event => this._handleChangeObject('increase estimation',event,props)}>{'+'}</div>
                            </div> 
                            :
                            <div className='text-input'>{props.values.EstimatedJob || 0}</div>

                        }
                    </div>
                    <div className='item'>
                        <label className='item-label'>{this.isBes ? 'RESPONSIBILITY' : 'STATUS'}</label>
                        { this.isBes ?
                            (
                                <FormControl className='form-control'>
                                    <Select 
                                        classes={{select:'select-item'}} 
                                        onChange={event => this._handleChangeObject('responsibility',event,props)}
                                        value={props.values.Responsibility ? props.values.Responsibility.Desc : 'Pilih Responsibility'}
                                    >
                                    {
                                        masterDataBacklog.Responsibilities.map((field) => (
                                    <MenuItem value={field.Desc}>
                                        {field.Desc}
                                    </MenuItem>
                                    ))
                                    }
                                    </Select>
                                </FormControl>
                            )
                            :
                            (
                                <FormControl className='form-control'>
                                <Select 
                                    classes={{select:'select-item'}} 
                                    onChange={event => this._handleChangeObject('status',event,props)}
                                    value={props.values.Status ? props.values.Status.toLowerCase() : 'Pilih Status'}
                                >
                                {
                                    masterDataBacklog.BacklogStatuses.map((field) => (
                                        <MenuItem value={field.Status.toLowerCase()}>
                                        {field.Status.toUpperCase()}
                                        </MenuItem>
                                    ))
                                }
                                </Select>
                                </FormControl>
                            )
                        }
                    </div>
                </div>
            </div>
            </>
        )
    }
    _renderPartRequirement = (props) => {
        let iconValidate = Warning
        const resultSparePart = this.props.resultSparePart || [];
        return(
                <>
                {
                    this.isBes && (
                    <>
                    <SearchInput 
                        className='search-input'
                        onSearch={this._handleSearch}
                    />
                    <ul className='spare-part-list'>
                    {
                        resultSparePart.map((field) => (
                            <div className='spare-parts'>
                            <li className='spare-part-list-item'>
                                {field.PartNumber}
                            </li>
                            <div className='add-part-button' onClick={() => this._selectedPart(field,props)}>{'+'}</div>
                            </div>
                        ))
                    }
                    </ul>
                    </>
                    )
                }
                <div className="row-container-header">
                
                    <div className="part-validation" />
                    <div className="part-number">Part Number</div>
                    <div className="part-description">Part Description</div>
                    <div className="qty">Qty</div>
                </div>
                <div className='container-content'>
                    {/* Mapping data part requirement  */}
                    {
                        props.values.PartRequirements && props.values.PartRequirements.map((field) => {
                            iconValidate = field.IsValidated ? CheckedGood : Delete
                            return (
                                <div className='row-container-content'>
                            {
                                this.isBes &&
                                <div className='part-validation'>
                                    <img className='validation-icon' alt='validation icon' src={iconValidate}/>
                                </div>
                            }
                            <div className="part-number">{field.PartNumber}</div>
                            <div className="part-description">{field.PartDescription}</div>
                            <div className="qty">
                                {this.isBes && <div className='operation' onClick={(event) => this._handleChangePart(event,field.PartNumber,'decreasePart',props)}>{'-'}</div>}
                                <div className='qty-val'>{field.Quantity}</div>
                                {this.isBes && <div className='operation' onClick={(event) => this._handleChangePart(event,field.PartNumber,'increasePart',props)}>{'+'}</div>}
                            {this.isBes && <img className='part-delete' alt='bin' src={Bin} onClick={() => this._handleDeletedPart(field.PartNumber,props)}/>}
                            </div>
                            </div>
                            )})
                    }
                </div>
                
                {
                    this.isBes &&
                    this.props.displayMode === 'web' &&
                    <Button 
                        className='btn-save' 
                        onClick={() => this._validateSparePart(props)}
                    >
                        Validate
                    </Button>
                }
                <div className='img-container'>
                    <img className={this.isBes ? 'beshand' : 'beshand-bms'} alt='images bes' src={BesHand}/>
                </div>
                <div className='btn-row'>
                    {
                        this.props.displayMode !== 'web' &&
                        <Button className='btn-save'>Validate</Button>
                    }
                    <Button 
                        className='btn-approve' 
                        onClick={
                            this.isBes ? () => this.setState({isShowConfirmationReject:true}) : () => this.setState({isShowConfirmationSave:true})
                            }
                    >
                        {this.isBes ? 'Reject' : 'Save'}
                    </Button>
                    {console.log('response validasi',props.values)}
                    <Button 
                        className='btn-approve' 
                        onClick={() => this.setState({isShowConfirmationApprove:true})}
                        disabled={this.isBes ? this.props.validationResponse !==200 : props.values.Status && props.values.Status === 'OPEN' }
                    >Approve</Button>
                </div>
            </>
        )
    }

    _handleEvidence = () => {
        this.setState({
            isShowEvidence:true,
            isShowIdentity:false,
            isShowRequirement:false
        })
    }
    
    _handleIdentity = () => {
        this.setState({
            isShowEvidence:false,
            isShowIdentity:true,
            isShowRequirement:false
        })
    }

    _handleRequirement = () => {
        this.setState({
            isShowEvidence:false,
            isShowIdentity:false,
            isShowRequirement:true
        })
    }
    componentWillMount = () => {
        this.setState({
            initialValues:this.props.detailBacklog
        })
    }
    componentDidUpdate = () => {

    }
    render(){
        console.log('detail sip',this.props)
        const {displayMode} = this.props;
        const {initialValues} = this.state;
        if (displayMode !== 'web'){
            return (
                <div className='bes-detail-modal'>
                    {this._renderLoadingScreen()}
                    <CloseButton onClose={this.props.onClose}/>
                    <div className='modal-header'>
                        <div className='modal-header-line'/>
                        <p>{`Backlog ${this.isBes ? 'Entry Sheet' : 'Monitoring Sheet'}`}</p>
                    </div>
                    <Formik
                    enableReinitialize
                    initialValues={initialValues}
                >
                {
                    props => (
                    <div className='modal-content-container'>
                        {/* Insert loading component here */}
                        <div className='titles'>
                            <div className={this.state.isShowEvidence ? 'title-choosen' : 'title'} onClick={this._handleEvidence}>Problem Evidence</div>
                            <div className={this.state.isShowIdentity ? 'title-choosen' : 'title'} onClick={this._handleIdentity}>Problem Identity</div>
                            <div className={this.state.isShowRequirement ? 'title-choosen' : 'title'} onClick={this._handleRequirement}>Part Requirement</div>
                        </div>
                        {
                            this.state.isShowEvidence &&
                            <FieldArray
                            name='images'
                            render={arrayHelpers => (
                            <div className='problem-evidence-container'> 
                            {this._renderProblemEvidence(props,arrayHelpers)}
                            </div>
                            )}
                        />
                        }
                        
                        {
                            this.state.isShowIdentity && 
                            <div className='problem-identity-container'>
                            {this._renderProblemIdentity(props)}
                            </div>
                            
                        }
                        
                        {
                            this.state.isShowRequirement && 
                            <div className='part-requirement-container'>
                            {this._renderPartRequirement(props)}
                            </div>
                        }
                    </div>
                )}
                </Formik>
                </div>

            )
        }
        return(
            <div className='bes-detail-modal'>
                {this._renderLoadingScreen()}
                <CloseButton onClose={this.props.onClose}/>
                <div className='modal-header'>
                {/* Create condition for change title if there is BES/BMS */}
                    <p>{`Backlog ${this.isBes ? 'Entry Sheet' : 'Monitoring Sheet'}`}</p>      
                </div>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                >
                {
                    props => (
                        
                        <div className='modal-content-container'>
                        <FieldArray
                            name='images'
                            render={arrayHelpers => (
                                <div className='problem-evidence-container'>
                                    <p className='title'>Problem Evidence</p>
                                    {this._renderProblemEvidence(props,arrayHelpers)}
                                </div>
                            )}
                        />
                        <div className='problem-identity-container'>
                            <p className='title'>Problem Identity</p>
                            {this._renderProblemIdentity(props)}
                        </div>
                        <div className='part-requirement-container'>
                            <p className='title'>Part Requirement</p>
                            {this._renderPartRequirement(props)}
                        </div>
                            {this._renderConfirmationSave(props)}
                            {this._renderConfirmationApprove(props)}
                            {this._renderConfirmationReject(props)}
                            {this._renderModalNotification()}
                        </div>
                    )
                }
                </Formik>
            </div>
        )
    }
}