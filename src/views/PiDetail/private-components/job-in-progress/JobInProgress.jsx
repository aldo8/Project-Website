import React from 'react';
import {CloseButton} from 'components'
import './JobInProgress.scss';
import {convertDateTime} from 'utils/dateTime.helper'
import { 
    StagingLineGreen,
    StagingLineYellow,
    ProgressStartGreen,
    ProgressStartYellow,
    ProgressTravelingGreen,
    ProgressTravelingYellow,
    ProgressWaitingGreen,
    ProgressWaitingYellow,
    ProgressExecutionGreen,
    ProgressExecutionYellow,
    ProgressReportingGreen,
    ProgressReportingYellow
 } from 'assets/icons';

export default class JobInProgress extends React.PureComponent{
    _renderShift = (sortJobStaging) => {
        return (
            <div className='shift-details-row'>
                {
                    sortJobStaging.map((field) => {
                        if (field.Sequence !== sortJobStaging.length)
                        return this._renderShiftCard(field,'completed');
                        return this._renderShiftCard(field,'not completed');
                    })
                }
            </div>
        )
    }
    _renderShiftCard = (field,status) => {
        let shiftClassName = 'shift-details-container-not-yet';
        if (status === 'completed') shiftClassName = 'shift-details-container';
        if (status === 'not completed') shiftClassName = 'shift-details-container-current';
        return (
            <div className={shiftClassName} key={field.Sequence}>
                {this._renderInProgressDetail(field)}
            </div>
        )
    }
    _renderInProgressDetail = (field) => {
        return (
            <>
            <div className='shifts'>
                <div className='shift-detail-container'>
                    <div className='label-container'>
                        <p className='label-date'>
                            {field.Enddate ? `${convertDateTime(field.Enddate,true).format('DD MMM YYYY')}` : `-`}
                        </p>
                        <p className='label-title'>Latitude </p>
                        <p className='label-title'>Longitude</p>
                    </div>
                    <div className='value-container'>
                        <p className='label-right'>
                            : {field.Enddate ? `${convertDateTime(field.Enddate,true).format('HH:mm')}` : ``}
                        </p>
                        <p className='label-right'>
                            : {field.Latitude ? field.Latitude : 'N/A'}
                        </p>
                        <p className='label-right'>
                            : {field.Longitude ? field.Longitude : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
            </>
        )
    }
    _renderIcon = (field) => {
        const {Sequence,Enddate} = field;
        switch (true) {
            case Sequence === 1 && Enddate !== null:
                console.log('testing',field.Sequence === 1 && field.Enddate)
                return {
                    icon:ProgressStartGreen,
                    iconClassName:'icon-progress-complete',
                    stagingLine:StagingLineGreen
                }
            case Sequence === 1 && Enddate === null:
                return {
                    icon:ProgressStartYellow,
                    iconClassName:'icon-progress-current',
                    stagingLine:StagingLineYellow
                }    
            case Sequence === 2 && Enddate !== null:
                return {
                    icon: ProgressTravelingGreen, 
                    iconClassName: 'icon-progress-complete',
                    stagingLine: StagingLineGreen
                }
            case Sequence === 2 && Enddate === null:
                return {
                    icon: ProgressTravelingYellow,
                    iconClassName:'icon-progress-current',
                    stagingLine:StagingLineYellow
                }
            case Sequence === 3 && Enddate !== null:
                return {
                    icon: ProgressWaitingGreen,
                    iconClassName: 'icon-progress-complete',
                    stagingLine: StagingLineGreen
                }
            case Sequence === 3 && Enddate === null:
                return {
                    icon: ProgressWaitingYellow,
                    iconClassName:'icon-progress-current',
                    stagingLine:StagingLineYellow
                }
            case Sequence === 4 && Enddate !== null:
                return {
                    icon: ProgressExecutionGreen,
                    iconClassName: 'icon-progress-complete',
                    stagingLine: StagingLineGreen
                }
            case Sequence === 4 && Enddate === null:
                return {
                    icon: ProgressExecutionYellow,
                    iconClassName:'icon-progress-current',
                    stagingLine:StagingLineYellow
                }
            case Sequence === 5 && Enddate !== null:
                return {
                    icon: ProgressReportingGreen,
                    iconClassName: 'icon-progress-complete',
                    stagingLine: StagingLineGreen
                }
            default:
                return {
                    icon: ProgressReportingYellow, 
                    iconClassName: 'icon-progress-current',  
                    stagingLine: StagingLineYellow
                }
        }
    }
    render(){
        const jobStaging = this.props.stagingInfo.filter(((item) => item.Type !== 'JOB'));
        console.log('ALDO',this.props.stagingInfo)
        const sortJobStaging = jobStaging.sort((a,b) => a.Sequence - b.Sequence);
        return(
            <div className="job-inprogress-detail-modal">
                <CloseButton onClose={this.props.onClose}/>
                <div className='icons-row'>
                    {
                        sortJobStaging.map((field) => (
                            <div className='progress-container' key={field.Sequence}>
                                {field.Sequence > 1 && <img className='staging-line' alt='progress line' src={`${this._renderIcon(field).stagingLine}`}/>}
                                <img className={`${this._renderIcon(field).iconClassName}`} alt='icon progress' src={`${this._renderIcon(field).icon}`}/>
                            </div>
                        ))
                    }
                </div>
                <div className='labels-row'>
                    {
                        sortJobStaging.map((field) => (
                            <p className='waiting-to-start' key={field.Sequence}>{field.Title}</p>
                        ))
                    }
                </div>
                {this._renderShift(sortJobStaging)}
            </div>
        )
    }
}