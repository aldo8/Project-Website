import React from 'react';
import './SelectedJobs.scss';

export default class SelectedJobs extends React.PureComponent {
    render() {
        return (
            // Translate Text
            <div className='selected-jobs'>
                <div className='selected-jobs-title'>Selected Item</div>
                <div className='selected-jobs-list'>
                    {
                        this.props.jobList && this.props.jobList.map((field,index) => 
                        (
                            <div className='selected-jobs-detail-container' key={index}>
                                <div className='selected-jobs-detail'>
                                    <div className='selected-jobs-label'>Unit Model</div>
                                    <div className='selected-jobs-info'>{field.UnitModel}</div>
                                </div>
                                <div className='selected-jobs-detail'>
                                    <div className='selected-jobs-label'>Unit Code</div>
                                    <div className='selected-jobs-info'>{field.UnitCode}</div>
                                </div>
                                <div className='selected-jobs-detail'>
                                    <div className='selected-jobs-label'>Tipe Pekerjaan</div>
                                    <div className='selected-jobs-info'>{field.JobType}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}