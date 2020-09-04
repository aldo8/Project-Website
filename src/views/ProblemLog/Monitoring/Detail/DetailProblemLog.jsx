import React from 'react';
import { MENU } from 'constants/menu';
import { KeyboardArrowRight } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Card, Button, Modal, TextField} from "@material-ui/core";
import styles from '../../Approval/ProblemLogDetails/ProblemLogDetails.module.scss';

export default class DetailProblemLog extends React.PureComponent{
  constructor(props) {
    super(props)
  
    this.state = {
       isShowCloseProblemLog:false,
       message:'',
       error:false,
    }
    this._toggleCloseModal = this._toggleCloseModal.bind(this);
  }
  
    _renderBreadCrumbs = () => {
        return (
            <div className='sub-app-bar'>
                <Link className='link' to={MENU.DASHBOARD}>Home</Link>
                <KeyboardArrowRight className='arrow-right'/>
                <Link className='link' to={MENU.PROBLEMLOG_MONITORING}>Work Center</Link>
                <KeyboardArrowRight className='arrow-right'/>
                <Link className='link' to={MENU.PROBLEMLOG_MONITORING_JOB_TYPE}>Job Type</Link>
                <KeyboardArrowRight className='arrow-right'/>
                <Link className='link' to={MENU.PROBLEMLOG_MONITORING_JOB_LIST}>Job List</Link>
                <KeyboardArrowRight className='arrow-right'/>
                <p className='not-link'>{'Detail Job'}</p>
            </div>
        )
    }
    _toggleCloseModal = () => {
      const {isShowCloseProblemLog} = this.state;
      this.setState({
        isShowCloseProblemLog:!isShowCloseProblemLog
      })
    }

    _handleCloseProblemLog = () => {
      const {detail} = this.props.detailProblemLog;
      const {token} = this.props;
      const {message} = this.state;
      const parameter = {
        Id:detail.Id,
        message:message
      }
      console.log('data kirim',parameter,token)
      this.props.closeProblemLog(parameter,token)
    }
    componentDidUpdate = () => {
      const {status} = this.props;
      if(status === 200){
        this.props.push(MENU.DASHBOARD)
      }
      
    }
    // _handleValidation = (value) => {
    //   if(value === undefined || value === ""){
    //     return false
    //   }
    //   return true
    // }

    _renderModalConfirmation = () => {
      console.log('pesan',this.state)
      return (
        <Modal
        // className={styles["save-modal"]}
        // classes={styles["save-modal"]}
        open={this.state.isShowCloseProblemLog}
        onClose={this.setState({isShowCloseProblemLog:false})}
      >
        <div className={styles["save-modal"]}>
          <div className={styles["close-btn-row"]}>
            <div
              className={styles["close-btn"]}
              onClick={this.setState({isShowCloseProblemLog:false})}
            />
          </div>
          <div className={styles["title-modal-row"]}>
            <p className={styles["title-modal-approval"]}>
              Are you sure want to Close ?
            </p>
          </div>
          <div className={styles["text-modal-row"]}>
          <TextField 
            // className={styles['text-field']}
            error={this.state.error}
            id="outlined-basic" 
            label="Input Content Of Problem Solving" 
            multiline
            variant="outlined"
            inputProps={{maxLength: 100}}
            rows="5" 
            onChange={(event) => this.setState({
              message:event.target.value
            })}
          />
          </div>
          <div className={styles["button-modal-row"]}>
            <div
              className={styles["btn-yes"]}
              onClick={() => this._handleCloseProblemLog()}
            >
              Yes
            </div>
            <div
              className={styles["btn-no"]}
              onClick={this.state.isShowCloseProblemLog}
            >
              No
            </div>
          </div>
        </div>
      </Modal>
      )
    }
    _renderContentProblemLog = () => {
      console.log('detail monitor',this.props)
      const {detail} = this.props.detailProblemLog;
        return (
          <div className={styles["problem-log-content-container"]}>
            <div className={styles["problem-card-detail-left"]}>
              <p className={styles["problem-card-detail-label-big"]}>Problem</p>
              <div className={styles["problem-log-line-container"]}>
                <p className={styles["problem-card-detail-label"]}>PROBLEM TYPE</p>
                <p className={styles["problem-card-detail-text"]}>
                  {detail.ProblemTypeName}
                </p>
                <p className={styles["problem-card-detail-label-mid"]}>REMARKS</p>
                <p className={styles["problem-card-detail-remarks"]}>
                  {detail.ProblemTypeRemarks}
                </p>
              </div>
              <p className={styles["problem-card-detail-label-big-30"]}>
                Responsibility
              </p>
              <div className={styles["problem-log-line-container"]}>
                <p className={styles["problem-card-detail-text"]}>
                  {detail.ResponseTypeName}
                </p>
              </div>
              <p className={styles["problem-card-detail-label-big-30"]}>
                Contingency Action
              </p>
              <div className={styles["problem-log-line-container"]}>
                <p className={styles["problem-card-detail-remarks"]}>
                  {detail.ResponseTypeRemarks}
                </p>
              </div>
              <p className={styles["problem-card-detail-label-big-30"]}>
                Delay Time
              </p>
              <div className={styles["problem-log-delay-container"]}>
                <div className={styles["start-container"]}>
                  <p className={styles["delay-label"]}>START</p>
                  <p className={styles["delay-text"]}>{detail.DelayStart}</p>
                </div>
                <div className={styles["end-container"]}>
                  <p className={styles["delay-label"]}>END</p>
                  <p className={styles["delay-text"]}>{detail.DelayEnd}</p>
                </div>
              </div>
              <p className={styles["problem-card-detail-label-big-30"]}>
                Action To Close
              </p>
              <div className={styles["problem-log-line-container"]}>
                <p className={styles["problem-card-detail-text"]}>
                  {detail.ClosedMessage}
                </p>
              </div>
            </div>
            <div className={styles["problem-card-detail-right"]}>
              <p className={styles["problem-card-detail-label-big"]}>Impact</p>
              <div className={styles["problem-log-line-container"]}>
                <p className={styles["problem-card-detail-label"]}>IMPACT TYPE</p>
                <p className={styles["problem-card-detail-text"]}>{detail.ImpactTypeName}</p>
                <p className={styles["problem-card-detail-label-mid"]}>REMARKS</p>
                <p className={styles["problem-card-detail-text"]}>
                  {detail.ImpactTypeRemarks}
                </p>
              </div>
              <p className={styles["problem-card-detail-label-big-30"]}>
                Reported By
              </p>
              <div className={styles["problem-log-line-container"]}>
                <p className={styles["problem-card-detail-text"]}>{`${detail.LeaderApprovedByName} - ${detail.LeaderApprovedBy}`}</p>
              </div>
              <p className={styles["problem-card-detail-label-big-30"]}>
                Suggestion for Improvement
              </p>
              <div className={styles["problem-log-line-container"]}>
                <p className={styles["problem-card-detail-remarks"]}>
                  {detail.SugestImprove}
                </p>
              </div>
              <p className={styles["problem-card-detail-label-big-30"]}>
                PIC For Follow Up Improvement
              </p>
              <div className={styles["problem-log-line-container"]}>
                <p className={styles["problem-card-detail-label"]}>
                  RESPONSIBILITY TYPE
                </p>
                <p className={styles["problem-card-detail-remarks"]}>
                  {detail.PicImprove || '-'}
                </p>
              </div>
              <p className={styles["problem-card-detail-label-big-30"]}>Aging</p>
              <div className={styles["problem-log-line-container"]}>
                <p className={styles["problem-card-detail-text"]}>{detail.Age}</p>
              </div>
            </div>
          </div>
        );
      };
    _renderCard = () => {
        return (
            <div className={styles["problem-log-detail-page-content"]}>
                <div className={styles["problem-log-detail"]}>
                    <Card className={styles["problem-log-detail-card"]}>
                    <div className={styles["problem-log-card-content"]}>
                        <div className={styles["problem-log-card-title-row"]}>
                        <div className={styles["problem-log-card-title"]}>
                            Detail Problem Log
                        </div>
                        </div>
                        {this._renderContentProblemLog()}
                        {this._renderButton()}
                    </div>
                    </Card>
                </div>
                </div>
        )
    }
    _renderButton = () => {
        return(
            <div className={styles["bottom-row"]}>
            {/* Create condition if delay end not null */}
            <Button
            className={styles["btn-approve"]}
            onClick={this._toggleCloseModal}
            >
            Close
            </Button>
            </div>
        )
    }
    render(){
        return(
            <>
            {this._renderBreadCrumbs()}
            <div className='content2'>
                {this._renderCard()}
                {this._renderModalConfirmation()}
            </div>
            </>
        )
    }
}