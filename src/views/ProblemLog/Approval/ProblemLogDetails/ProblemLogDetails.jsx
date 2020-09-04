import React from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  Button, 
  Modal, 
  CircularProgress, 
  Input,
  FormControl, 
  Select, 
  MenuItem,
  } from "@material-ui/core";
import { KeyboardArrowRight, Edit } from "@material-ui/icons";
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import styles from "./ProblemLogDetails.module.scss";
import { MENU } from "constants/menu";
import { getStorage } from "utils/storage.helper";
import { Formik } from 'formik';
import { PROBLEMLOG_STORAGE } from "constants/storage";
import moment from "moment";
import { ConfirmationModal } from "components";

export default class ProblemLogDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isApproveModal: false,
      isRejectModal: false,
      isShowNotification:false,
      isEdit:false,
      initialValues:{},
      data:{},
    };
    this._toggleApproveModal = this._toggleApproveModal.bind(this);
    this._toggleRejectModal = this._toggleRejectModal.bind(this);
  }
  _toggleEdit = () => {
    this.setState({
      isEdit:!this.state.isEdit
    })
  }
  _toggleSaveModal = (props) => {
    const {token} = this.props;
    const parameter = {
      ProblemLog:props.values
    }
    this.props.updateProblemLog(parameter,token)
    this._toggleEdit()
  }
  _toggleApproveModal = () => {
    this.setState({
      isApproveModal: !this.state.isApproveModal
    });
  };
  _toggleRejectModal = () => {
    this.setState({
      isRejectModal: !this.state.isRejectModal
    });
  };
  _handleApproveBacklog = (props) => {
    console.log('xnks',props)
    const {token} = this.props;
    this.setState({
      isApproveModal:false,
      isShowNotification:true
    })
    this.props.submitProblemLog(props.values.Id,token);
  };
  _handleRejectBacklog = (props) => {
    console.log('forom:',props)
    const {token} = this.props;
    const {Id} = props.values;
    this.setState({
      isRejectModal:false,
      isShowNotification:true
    })
    this.props.rejectProblemLog(Id,token);
    
  };
  _handleOnClose = () => {
    const {WoId} = this.props;
    this.setState({
      isShowNotification:false
    })
    this.props.push(`${MENU.DETAIL_PI}${WoId}`);
  }
  _handleChangeObject = (key,event,props) => {
    console.log('event',event)
    const {dataMaster} = this.props;
    switch (key) {
      case 'problemTypes':
        const problemTypes = dataMaster.ProblemTypes.find(({Name}) => Name === event.target.value )
        return (
          props.setFieldValue('ProblemTypeId',problemTypes.Id),
          props.setFieldValue('ProblemTypeName',problemTypes.Name)
        )
      case 'impactTypes':
        const impactTypes = dataMaster.ImpactTypes.find(({Name}) => Name === event.target.value)
        return (
          props.setFieldValue('ImpactTypeId',impactTypes.Id),
          props.setFieldValue('ImpactTypeName',impactTypes.Name)
        )
      case 'responseTypes':
        const responseTypes = dataMaster.ResponseTypes.find(({Name}) => Name === event.target.value)
        return (
          props.setFieldValue('ResponseTypeId',responseTypes.Id),
          props.setFieldValue('ResponseTypeName',responseTypes.Name)
        )
      case 'DelayEnd':
        const endDate = moment(event).format('YYYY-MM-DDTHH:mm:ss')
        return (
          props.setFieldValue('DelayEnd',endDate)
        )
      default:
        props.setFieldValue(key,event.target.value)
        break;
    }
  }
  componentDidMount = ()  => {
    console.log('PROBLEM LOG',this.props)
    const {token} = this.props;
    const selectedProblemLog = getStorage(PROBLEMLOG_STORAGE)
       this.setState({
          initialValues:selectedProblemLog
        })
    this.props.problemLogGet(selectedProblemLog.Id,token)
    this.props.fetchMasterDataProblemLog(token)
  }
  _renderModalSuccess = () => {
    const {isShowNotification} = this.state;
    const {approveProblemLogResponse,rejectProblemLogResponse} = this.props;
    const problemLogResponse = approveProblemLogResponse.status === 200;
    const rejectResponse = rejectProblemLogResponse.status === 200;
    console.log('AFJEFLAB',problemLogResponse)
    console.log('BREAK',this.props)
    if (problemLogResponse){
      return (
        <ConfirmationModal
          open={isShowNotification}
          onClose={this._handleOnClose}
          message={'Problem Log has been approved'}
          isSuccess={problemLogResponse}
        />
      )
    }
    if (rejectResponse){
      return (
        <ConfirmationModal
          open={isShowNotification}
          onClose={this._handleOnClose}
          message={'Problem Log has been rejected'}
          isSuccess={rejectResponse}
        />
      )
    }
  }
  _renderBreadCrumbs = () => {
    const {WoId} = this.props;
    return (
      <div className={styles["sub-app-bar"]}>
        <Link className={styles["link"]} to={MENU.DASHBOARD}>Home</Link>
        <KeyboardArrowRight className={styles["arrow-right"]} />
        <Link className={styles["link"]} to={MENU.JOBS_SUMMARY}>
          Jobs Assignment
        </Link>
        <KeyboardArrowRight className={styles["arrow-right"]} />
        <Link className={styles["link"]} to={`${MENU.DETAIL_PI}${WoId}`}>
          Detail PI
        </Link>
        <KeyboardArrowRight className={styles["arrow-right"]} />
        <Link className={styles["link"]}>Problem Log Details</Link>
      </div>
    );
  };
  _renderContentProblemLog = (props) => {
    const {values} = props;
    const {isEdit} = this.state;
    if(isEdit)
    return this._renderEditContentProblemLog(props)
    return (
      <>
      <div className={styles["problem-log-content-container"]}>
        <div className={styles["problem-card-detail-left"]}>
          <p className={styles["problem-card-detail-label-big"]}>Problem</p>
          <div className={styles["problem-log-line-container"]}>
            <p className={styles["problem-card-detail-label"]}>PROBLEM TYPE</p>
            <p className={styles["problem-card-detail-text"]}>
              {values.ProblemTypeName}
            </p>
            <p className={styles["problem-card-detail-label-mid"]}>REMARKS</p>
            <p className={styles["problem-card-detail-remarks"]}>
              {values.ProblemTypeRemarks}
            </p>
          </div>
          <p className={styles["problem-card-detail-label-big-30"]}>
            Responsibility
          </p>
          <div className={styles["problem-log-line-container"]}>
            <p className={styles["problem-card-detail-label"]}>
              RESPONSIBILITY TYPE
            </p>
            <p className={styles["problem-card-detail-text"]}>
              {values.ResponseTypeName}
            </p>
          </div>
          <p className={styles["problem-card-detail-label-big-30"]}>
            Contingency Action
          </p>
          <div className={styles["problem-log-line-container"]}>
            <p className={styles["problem-card-detail-remarks"]}>
              {values.ResponseTypeRemarks}
            </p>
          </div>
          <p className={styles["problem-card-detail-label-big-30"]}>
            Delay Time
          </p>
          <div className={styles["problem-log-delay-container"]}>
            <div className={styles["start-container"]}>
              <p className={styles["delay-label"]}>START</p>
              <p className={styles["delay-text"]}>{moment(values.DelayStart).format('YYYY-MM-DD HH:mm')}</p>
            </div>
            <div className={styles["end-container"]}>
              <p className={styles["delay-label"]}>END</p>
              <p className={styles["delay-text"]}>{values.DelayEnd !== null ?moment(values.DelayEnd).format('YYYY-MM-DD HH:mm') : '-'}</p>
            </div>
          </div>
        </div>
        <div className={styles["problem-card-detail-right"]}>
          <p className={styles["problem-card-detail-label-big"]}>Impact</p>
          <div className={styles["problem-log-line-container"]}>
            <p className={styles["problem-card-detail-label"]}>IMPACT TYPE</p>
            <p className={styles["problem-card-detail-text"]}>{values.ImpactTypeName}</p>
            <p className={styles["problem-card-detail-label-mid"]}>REMARKS</p>
            <p className={styles["problem-card-detail-text"]}>
              {values.ImpactTypeRemarks}
            </p>
          </div>
          <p className={styles["problem-card-detail-label-big-30"]}>
            Reported By
          </p>
          <div className={styles["problem-log-line-container"]}>
            <p className={styles["problem-card-detail-text"]}>{values.CreatedByName}</p>
          </div>
          <p className={styles["problem-card-detail-label-big-30"]}>
            Suggestion for Improvement
          </p>
          <div className={styles["problem-log-line-container"]}>
            <p className={styles["problem-card-detail-remarks"]}>
              {values.SugestImprove}
            </p>
          </div>
          <p className={styles["problem-card-detail-label-big-30"]}>
            PIC For Follow Up Improvement
          </p>
          <div className={styles["problem-log-line-container"]}>
            <p className={styles["problem-card-detail-remarks"]}>
              {values.PicImprove}
            </p>
          </div>
          <p className={styles["problem-card-detail-label-big-30"]}>Aging</p>
          <div className={styles["problem-log-line-container"]}>
            <p className={styles["problem-card-detail-text"]}>{values.Age}</p>
          </div>
        </div>
      </div>
      {this._renderButton(props)}
      {this._renderModalSuccess()}
      </>
    );
  };

  _renderButton = (props) => {
    console.log('press button',props)
    return (
      <div className={styles["bottom-row"]}>
        {/* Create condition if delay end not null */}
        <Button
          className={styles["btn-approve"]}
          onClick={this._toggleApproveModal}
          disabled={props.values.DelayEnd === null}
        >
          Approve
        </Button>
        <Button
          className={styles["btn-reject"]}
          onClick={this._toggleRejectModal}
        >
          Reject
        </Button>
      </div>
    );
  };

  _renderButtonSave = (props) => {
    console.log('save data:',props)
    return (
      <div className={styles["bottom-row"]}>
        {/* Create condition if delay end not null */}
        <Button
          className={styles["btn-approve"]}
          onClick={() => this._toggleSaveModal(props)}
          disabled={props.values.DelayEnd === null}
        >
          Save
        </Button>
        <Button
          className={styles["btn-reject"]}
          onClick={this._toggleEdit}
        >
          Cancel
        </Button>
      </div>
    )
  }
  _renderCardProblemLog = (props) => {
    console.log('props problemlog:',props)
    return (
      <div className={styles["problem-log-detail-page-content"]}>
        <div className={styles["problem-log-detail"]}>
          <Card className={styles["problem-log-detail-card"]}>
            <div className={styles["problem-log-card-content"]}>
              <div className={styles["problem-log-card-title-row"]}>
                <div className={styles["problem-log-card-title"]}>
                  Detail Problem Log
                </div>
                {
                  props.values.SupervisorApprovedDate === null && (
                    <div className={styles['edit-container']}>
                      <Edit
                        className='edit-icon'
                        color='action'
                      />
                      <p 
                        className='edit-icon'
                        onClick={this._toggleEdit}
                      >
                      {' '}
                        Edit
                      </p>
                    </div>
                  )
                }
              </div>
              {this._renderContentProblemLog(props)}
            </div>
          </Card>
        </div>
      </div>
    );
  };
  _renderModalApprove = (props) => {
    return (
      <Modal
        className={styles["modal-container"]}
        classes={styles["modal-container"]}
        open={this.state.isApproveModal}
        onClose={this._toggleApproveModal}
      >
        <div className={styles["save-modal"]}>
          <div className={styles["close-btn-row"]}>
            <div
              className={styles["close-btn"]}
              onClick={this._toggleApproveModal}
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
              onClick={() => this._handleApproveBacklog(props)}
            >
              Yes
            </div>
            <div
              className={styles["btn-no"]}
              onClick={this._toggleApproveModal}
            >
              No
            </div>
          </div>
        </div>
      </Modal>
    );
  };
  _renderModalReject = () => {
    return (
      <Modal
        className={styles["modal-container"]}
        classes={styles["modal-container"]}
        open={this.state.isRejectModal}
        onClose={this._toggleRejectModal}
      >
        <div className={styles["save-modal"]}>
          <div className={styles["close-btn-row"]}>
            <div
              className={styles["close-btn"]}
              onClick={this._toggleRejectModal}
            />
          </div>
          <div className={styles["title-modal-row"]}>
            <p className={styles["title-modal-approval"]}>
              Are you sure want to reject ?
            </p>
          </div>
          <div className={styles["button-modal-row"]}>
            <div
              className={styles["btn-yes"]}
              onClick={this._handleRejectBacklog}
            >
              Yes
            </div>
            <div className={styles["btn-no"]} onClick={this._toggleRejectModal}>
              No
            </div>
          </div>
        </div>
      </Modal>
    );
  };
  
  _renderLoadingScreen = () => {
    const {data} = this.state;
    const {isLoading}=this.props
    console.log('TESTING DATA',data.Id)
    if (data.Id === null){
    return <CircularProgress size={100} className="circular-progress"/>}
    if(isLoading) {
      return <CircularProgress size={100} className="circular-progress"/>
    }

  }
  _updateData = (event) => {
    const field = event.target.name;
    const data = this.state.data;
    data[field] = event.target.value
    console.log('event',event.target.value)
    console.log('data update',data)
    this.setState({
      data:data
    })
  }
  _renderEditContentProblemLog = (props) => {
    const todayDate = moment(new Date()).format('YYYY-MM-DDTHH:mm');
    const {dataMaster} = this.props;
    console.log('dataMaster:',dataMaster)
    const {values}=props;
    const {isEdit} = this.state;
    return (
      isEdit &&
      <>
      <div className={styles["problem-log-content-container"]}>
        <div className={styles["problem-card-detail-left"]}>
          <p className={styles["problem-card-detail-label-big"]}>Problem</p>
          <div className={styles["problem-log-line-container"]}>
            <p className={styles["problem-card-detail-label"]}>PROBLEM TYPE</p>
            <FormControl className={styles['form-control']}>
              <Select 
                  classes={{select:'select-item'}} 
                  onChange={event => this._handleChangeObject('problemTypes',event,props)}
                  value={props.values.ProblemTypeName ? props.values.ProblemTypeName :'Pilih Problem Type'}
              >
                  {
                    dataMaster.ProblemTypes && dataMaster.ProblemTypes.map((field) => (
                          <MenuItem value={field.Name}>
                              {field.Name}
                          </MenuItem>
                      ))
                  }
              </Select>
            </FormControl>
            
            <p className={styles["problem-card-detail-label-mid"]}>REMARKS</p>
            <Input
              name='ProblemTypeRemarks'
              value={values.ProblemTypeRemarks}
              onChange={event => this._handleChangeObject('ProblemTypeRemarks',event,props)}
              className={styles["problem-card-detail-input-root"]}
            />
          </div>
          <p className={styles["problem-card-detail-label-big-30"]}>
            Responsibility
          </p>
          <div className={styles["problem-log-line-container"]}>
          <FormControl className={styles['form-control']}>
              <Select 
                  classes={{select:'select-item'}} 
                  onChange={event => this._handleChangeObject('responseTypes',event,props)}
                  value={props.values.ResponseTypeName ? props.values.ResponseTypeName :'Pilih Problem Type'}
              >
                  {
                    dataMaster.ResponseTypes && dataMaster.ResponseTypes.map((field) => (
                          <MenuItem value={field.Name}>
                              {field.Name}
                          </MenuItem>
                      ))
                  }
              </Select>
            </FormControl>
          </div>
          <p className={styles["problem-card-detail-label-big-30"]}>
            Contingency Action
          </p>
          <Input
              name='ImpactTypeRemarks'
              value={values.ResponseTypeRemarks}
              onChange={this._updateData}
              className={styles["problem-card-detail-input-root"]}
            />
          
          <p className={styles["problem-card-detail-label-big-30"]}>
            Delay Time
          </p>
          <div className={styles["problem-log-delay-container"]}>
            <div className={styles["start-container"]}>
              <p className={styles["delay-label"]}>START</p>
                <KeyboardDateTimePicker
                  variant="inline"
                  value={moment(values.DelayStart).format('YYYY-MM-DDTHH:mm')}
                  onChange={event => this._handleChangeObject('DelayStart',event,props)}
                  maxDate={todayDate}
                  format="yyyy-MM-dd HH:mm"
                />
            </div>
            <div className={styles["end-container"]}>
              <p className={styles["delay-label"]}>END</p>
              <KeyboardDateTimePicker
                  className={styles["dt-input"]}
                  variant="inline"
                  value={moment(values.DelayEnd).format('YYYY-MM-DDTHH:mm')}
                  onChange={event => this._handleChangeObject('DelayEnd',event,props)}
                  maxDate={todayDate}
                  format="yyyy-MM-dd HH:mm"
                />
            </div>
          </div>
        </div>
        <div className={styles["problem-card-detail-right"]}>
          <p className={styles["problem-card-detail-label-big"]}>Impact</p>
          <div className={styles["problem-log-line-container"]}>
            <p className={styles["problem-card-detail-label"]}>IMPACT TYPE</p>
            <FormControl className={styles['form-control']}>
              <Select 
                  classes={{select:'select-item'}} 
                  onChange={event => this._handleChangeObject('impactTypes',event,props)}
                  value={props.values.ImpactTypeName ? props.values.ImpactTypeName :'Pilih Problem Type'}
              >
                  {
                    dataMaster.ImpactTypes && dataMaster.ImpactTypes.map((field) => (
                          <MenuItem value={field.Name}>
                              {field.Name}
                          </MenuItem>
                      ))
                  }
              </Select>
            </FormControl>
            
            <p className={styles["problem-card-detail-label-mid"]}>REMARKS</p>
            <Input
              name='ImpactTypeRemarks'
              value={values.ImpactTypeRemarks}
              onChange={this._updateData}
              className={styles["problem-card-detail-input-root"]}
            />
            
          </div>
          <p className={styles["problem-card-detail-label-big-30"]}>
            Reported By
          </p>
          <div className={styles["problem-log-line-container"]}>
            <p className={styles["problem-card-detail-text"]}>{values.CreatedByName}</p>
          </div>
          <p className={styles["problem-card-detail-label-big-30"]}>
            Suggestion for Improvement
          </p>
          <Input
              name='ImpactTypeRemarks'
              value={values.SugestImprove}
              onChange={this._updateData}
              className={styles["problem-card-detail-input-root"]}
            />
          
          <p className={styles["problem-card-detail-label-big-30"]}>
            PIC For Follow Up Improvement
          </p>
          <Input
              name='ImpactTypeRemarks'
              value={values.PicImprove}
              onChange={this._updateData}
              className={styles["problem-card-detail-input-root"]}
            />
          
          <p className={styles["problem-card-detail-label-big-30"]}>Aging</p>
          <div className={styles["problem-log-line-container"]}>
            <p className={styles["problem-card-detail-text"]}>{values.Age}</p>
          </div>
        </div>
      </div>
      {this._renderButtonSave(props)}
      </>
    )

  }
  render() {
    const {initialValues}=this.state;
    console.log('detailpro',this.props)
    console.log('detail state',this.state)
    return (
      <div className="content2">
        {this._renderBreadCrumbs()}
        {this._renderLoadingScreen()}
        <Formik
            enableReinitialize
            initialValues={initialValues}
        >
        {
            props => (
            <>
        {this._renderCardProblemLog(props)}
        {this._renderModalApprove(props)}
        {this._renderModalReject(props)}
            </>
            )
        }
        </Formik>
      </div>
    );
  }
}
