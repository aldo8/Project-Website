import React from 'react';
import { 
    ExpansionPanel, 
    ExpansionPanelSummary, 
    ExpansionPanelDetails 
} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons'
import './JobAssignment.scss'
import {
    JobAssignmentTimeLine, 
    Star, 
    Dot, 
    JobAssignmentNow,
} from 'assets/icons'
import {convertToLocale} from 'utils/dateTime.helper'


export default class JobAssignment extends React.PureComponent{
    _renderJobAssignment = () => {
        const {jobAssigned} = this.props
        console.log('jobAssigned',jobAssigned)
        return (
            <div className='assignment-container'>
                <div className='timeline-label'>
                    <p>{convertToLocale(jobAssigned.Date,true)}</p>
                    <p>{convertToLocale(jobAssigned.Date,false)}</p>
                </div>
                <img className='timeline-icon' src={JobAssignmentNow} alt='timeline'/>
                <div className='jobs-assignment-creator'>
                    <p className='jobs-assignment-creator-title'>Assignment</p>
                    <p className='jobs-assignment-creator-label'>Created By</p>
                    <p className='jobs-assignment-creator-value'>{jobAssigned.CreatedBy || 'N/A'}</p>
                    <p className='jobs-assignment-creator-label'>Assigned By</p>
                    <p className='jobs-assignment-creator-value'>{jobAssigned.AssignedBy || 'N/A'}</p>
                </div>
                <div className='jobs-assignment-target'>
                    <p className='jobs-assignment-target-label'>Assigned To</p>
                    { jobAssigned.MechanicLeader &&
                    <div className='jobs-assignment-target-value'>
                        <img className='img-star' src={Star} alt='star'/>
                        <label className='label-name'>{`${jobAssigned.MechanicLeader.UserName || 'N/A'} - ${jobAssigned.MechanicLeader.Name ? jobAssigned.MechanicLeader.Name.toUpperCase() : 'N/A'}`}</label>
                    </div>}
                    { jobAssigned.Mechanics && jobAssigned.Mechanics.map((mechanic) => (
                        <div className='jobs-assignment-target-value' key={jobAssigned.MechanicLeader.UserName}>
                            <img className='img-dot' src={Dot} alt='dot'/>
                            <label className='label-name'>{`${mechanic.UserName || 'N/A'} - ${mechanic.Name.toUpperCase() || 'UNKNOWN'}`}</label>
                        </div>
                    ))
                    }
                </div>
            </div>
        )
    }
    _renderHandover = () => {
        const {jobAssigned} = this.props
        return (
            <div className='handover-container'>
                <div className='timeline-label'>
                    <p>{convertToLocale(jobAssigned.HandoverDate,true)}</p>
                    <p>{convertToLocale(jobAssigned.HandoverDate,false)}</p>
                </div>
                <img className='timeline-icon' src={JobAssignmentTimeLine} alt='timeline'/>
                <div className='jobs-assignment-creator'>
                    <p className="jobs-assignment-creator-title">Handover</p>
                    <p className="jobs-assignment-creator-label">Created By</p>
                    <p className="jobs-assignment-creator-value">{jobAssigned.HandoverCreatedBy || 'N/A'}</p>
                    <p className="jobs-assignment-creator-label">Assigned By</p>
                    <p className="jobs-assignment-creator-value">{jobAssigned.HandoverAssignedBy || 'N/A'}</p>
                </div>
                <div className='jobs-assignment-target'>
                    <p className='jobs-assignment-target-label'>Assigned To</p>
                    {/* Create condition if mechanic leader is true */}
                    {
                        jobAssigned.HandoverMechanicLeader && (
                    <div className='jobs-assignment-target-value'>
                        <img className='img-star' src={Star} alt='star'/>
                        <label className='label-name'>
                            {`${jobAssigned.HandoverMechanicLeader.UserName || 'N/A'} - ${jobAssigned.HandoverMechanicLeader.Name ? jobAssigned.HandoverMechanicLeader.Name : 'N/A'}`}
                        </label>
                    </div>
                    )}
                    {/* Mapping list of mechanic */}
                    {
                        jobAssigned.HandoverMechanics && jobAssigned.HandoverMechanics.map((field) => (
                            <div className='jobs-assignment-target-value'>
                                <img className='img-dot' src={Dot} alt='dot'/>
                                <label className='label-name'>
                                    {`${field.UserName} - ${field.Name ? field.Name : 'UNKNOWN'}`}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
    _renderPanelJobAssignment = () => {
        const {jobAssigned} = this.props;
        return(
            <ExpansionPanel defaultExpanded classes={{ root: 'job-assignment-expand' }}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore className="expand-icon" />}
                    classes={{
                    expanded: 'job-assignment-header-icon',
                    root: 'job-assignment-header-expanded',
                    content: 'job-assignment-header-expanded',
                    }}
                >
                <p className="job-assignment-title">Job Assignment</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{ root: 'job-assignment-detail' }}>
                        {this._renderJobAssignment()}
                    {/* Create condition if handover created is true */}
                    {jobAssigned.HandoverCreatedBy && this._renderHandover()} 
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )        
    }
    render(){
        return(
            <div className='job-assignment-container'>
                {this._renderPanelJobAssignment()}
            </div>
        )
    }
}