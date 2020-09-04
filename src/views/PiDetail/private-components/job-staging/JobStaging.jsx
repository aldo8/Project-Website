import React from 'react';
import moment, { ISO_8601 } from 'moment';
import { 
    ExpansionPanel, 
    ExpansionPanelDetails, 
    ExpansionPanelSummary 
} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';
import './JobStaging.scss'
import {
    StagingLineGreen,
    StagingLineYellow,
    StagingGreen,
    StagingYellow
} from 'assets/icons'
export default class JobStaging extends React.PureComponent {
    
    //Render Component 
    _renderJobStagingDetail = () => {
        const jobStaging = this.props.stagingInfo.filter(((item) => item.Type === 'JOB'));
        const sortJobStaging = jobStaging.sort((a,b) => a.Sequence - b.Sequence);
            return (
                sortJobStaging.map((field) => (
                    <div className='staging-detail-container' key={field.Sequence}>
                    <div className='staging-group'>
                        <img className='staging-icon' alt='staging' src={!field.Enddate ? StagingYellow : StagingGreen}/>
                        <p className='staging-group-title'>{field.Title}</p>
                        {field.Sequence === 3 && <a href="#/" className="staging-group-detail" onClick={this.props.onClick}>See Detail</a>}
                        {
                            field.Sequence !== 3 && this.props.displayMode === 'web' && 
                            <p className='staging-group-timestamp'>{field.Enddate ? `${moment.utc(field.Enddate, ISO_8601).local().format('DD.MM.YYYY HH:mm')}` : ''}</p>
                        }
                    </div>
                    {field.Sequence === 2 && <img className="staging-line1" alt='line1' src={!field.Enddate ? StagingLineYellow : StagingLineGreen}/>}
                    {field.Sequence === 3 && <img className="staging-line2" alt='line2' src={!field.Enddate ? StagingLineYellow : StagingLineGreen}/>}
                    {field.Sequence === 4 && <img className="staging-line3" alt='line3' src={!field.Enddate ? StagingLineYellow : StagingLineGreen}/>}
                    {field.Sequence === 5 && <img className="staging-line4" alt='line4' src={!field.Enddate ? StagingLineYellow : StagingLineGreen}/>}
                </div>
                ))
            );
    }
    _renderPanelStaging = () => {
        return(
        <ExpansionPanel
            defaultExpanded
            classes={{ root: 'staging-expand' }}
        >
            <ExpansionPanelSummary
                expandIcon={<ExpandMore className="expand-icon" />}
                classes={{
                    expanded: 'staging-header-icon',
                    root: 'staging-header-expanded',
                    content: 'staging-header-expanded',
                    }}
            >
                <p className='staging-title'>Job Staging</p>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{ root: 'staging-detail' }}>
                {this._renderJobStagingDetail()}
            </ExpansionPanelDetails>
        </ExpansionPanel>
        )
    }
    render(){
        return(
            <div className='staging-container'>
                {this._renderPanelStaging()}
            </div>
        )
    }
}