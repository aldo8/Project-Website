import React from 'react';
import {Card} from '@material-ui/core';
import './JobIdentity.scss';

export default class JobIdentity extends React.Component {
    render(){
        const {jobIdentity} = this.props;
        return (
            <Card className="job-card">
                <div className="color-line" />
                    <div className="job-card-content">
                    <div className="job-card-title-row">
                        <p className="job-card-title">IDENTITAS PEKERJAAN</p>
                    </div>
                    <div className='job-card-detail-container'>
                        <div className='job-card-detail-left'>
                            <p className='job-card-detail-label'>Work Order</p>
                            <p className='job-card-detail-text'>{jobIdentity.WoNumber ? jobIdentity.WoNumber : 'N/A'}</p>
                            <p className='job-card-detail-label'>Job Type</p>
                            <p className='job-card-detail-text'>{jobIdentity.JobType ? jobIdentity.JobType : 'N/A'}</p>
                            <p className='job-card-detail-label'>Job Description</p>
                            <p className='job-card-detail-text'>{jobIdentity.JobType ? jobIdentity.JobType : 'N/A'}</p>
                        </div>
                        <div className='job-card-detail-right'>
                            <p className='job-card-detail-label'>Branch/Site</p>
                            <p className='job-card-detail-text'>{jobIdentity.Plant ? jobIdentity.Plant : 'N/A'}</p>
                            <p className='job-card-detail-label'>Work Center</p>
                            <p className='job-card-detail-text'>{jobIdentity.WorkCenter ? jobIdentity.WorkCenter : 'N/A'}</p>
                            <p className='job-card-detail-label'>Customer Name</p>
                            <p className='job-card-detail-text'>{jobIdentity.Customer ? jobIdentity.Customer : 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}