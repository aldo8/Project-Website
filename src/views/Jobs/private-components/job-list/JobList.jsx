import React from 'react';
import {
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow,
    Checkbox,
    Card,
    CardContent,
} from '@material-ui/core';
import {JobListHeader} from 'components';
import './JobList.scss';
import  {MENU}  from 'constants/menu';
import { convertDateTime } from 'utils/dateTime.helper';
export default class JobList extends React.Component {
    _openDetail = async (column) => {
        this.props.selectedJob(column);
        this.props.push(`${MENU.DETAIL_PI}${column.Id || ''}`);
    }
    _isCheckBoxAvailable = () => {

    }
    _renderResponsiveMobile = () => {
        const {listJobAssignment} = this.props;
        return (
            <>
            {
                listJobAssignment && listJobAssignment.map((field) => (
            <Card className='job-list-mobile-card' >
                <CardContent className='job-list-mobile-content'>
                    <Checkbox 
                        className='check-box-mobile' 
                        classes={{ checked: 'checkbox-checked' }}
                        checked={this.props.jobList.some((job) => job.WoNumber === field.WoNumber)}
                        onClick={() => this.props.onChoosed(field)}
                        disabled={this._isCheckBoxAvailable(field)}
                    />
                    <div onClick={() => this._openDetail(field)}>
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>UNIT MODEL</div>
                                <div className='job-list-detail'>{field.UnitModel || '-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>UNIT CODE</div>
                                <div className='job-list-detail'>{field.UnitCode || '-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>WORK ORDER</div>
                                <div className='job-list-detail'>{field.WoNumber || '-'}</div>
                            </div>
                        </div>
                        <div className='yellow-line'/>
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>JOB TYPE</div>
                                <div className='job-list-detail'>{field.JobType || '-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>PLAN EXECUTION</div>
                                <div className='job-list-detail'>{convertDateTime(field.PlanExecutionDate).format('DD MMMM YYYY') || '-'}</div>
                            </div>
                        </div>
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>CUSTOMER</div>
                                <div className='job-list-detail'>{field.CustomerName || '-'}</div>
                            </div>
                        </div>
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>BACKLOG OPEN</div>
                                <div className='job-list-detail'>{field.OpenBacklog || 0}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>STATUS</div>
                                <div className='job-list-detail'>{field.Status || '-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>STAGING</div>
                                <div className='job-list-detail'>{field.Staging || '-'}</div>
                            </div>
                        </div>
                        </div>
                </CardContent>
            </Card>
            ))}
            </>
        )
    }
    render(){
        console.log('displayCheckBox',this.props.displayCheckBox)
        const {listJobAssignment} = this.props
        if(this.props.displayMode === 'mobile'){
            return this._renderResponsiveMobile()
        }
        return(
            <Table classes={{root:'table'}}>
                <TableHead className='table-head' classes={{root:'table-head'}}>
                    <TableRow>
                        <TableCell padding="checkbox"/>
                        <JobListHeader
                            name="UNIT MODEL"
                            onClick={() => this.props.onSortBy('UnitModel')}
                        />
                        <JobListHeader
                            name="UNIT CODE"
                            onClick={() => this.props.onSortBy('UnitCode')}
                        />
                        <JobListHeader
                            name="JOB TYPE"
                            onClick={() => this.props.onSortBy('JobType')}
                        />
                        <JobListHeader
                            name="WORK ORDER"
                            onClick={() => this.props.onSortBy('WorkOrder')}
                        />
                        <JobListHeader
                            name="CUSTOMER"
                            onClick={() => this.props.onSortBy('Customer')}
                        />
                        <JobListHeader
                            name="BACKLOG OPEN"
                            onClick={() => this.props.onSortBy('OpenBacklog')}
                        />
                        <JobListHeader
                            name="PLAN EXECUTION"
                            onClick={() => this.props.onSortBy('PlanExecutionDate')}
                        />
                        <JobListHeader
                            name="STATUS"
                            onClick={() => this.props.onSortBy('WoStatus')}
                        />
                        <JobListHeader
                            name="STAGING"
                            onClick={() => this.props.onSortBy('Staging')}
                        />
                    </TableRow>
                </TableHead>
                <TableBody classes={{root:'table-body'}}>
                {listJobAssignment && listJobAssignment.map((column) => (
                    <TableRow
                        key={column.Id}
                        classes={{root:'table-row'}}
                    >
                        <TableCell padding='checkbox'>
                        {
                            this.props.displayCheckBox  &&
                            <Checkbox
                                classes={{ checked: 'checkbox-checked' }} 
                                checked={this.props.jobList.some((job) => job.WoNumber === column.WoNumber)}
                                onClick={() => this.props.onChoosed(column)}
                                disabled={this._isCheckBoxAvailable(column)}
                            />
                        }
                        </TableCell>
                        <TableCell onClick={() => this._openDetail(column)} align='left' className='table-cell'>{column.UnitModel || '-'}</TableCell>
                        <TableCell onClick={() => this._openDetail(column)} align='left' className='table-cell'>{column.UnitCode || '-'}</TableCell>
                        <TableCell onClick={() => this._openDetail(column)} align='left' className='table-cell'>{column.JobType || '-'}</TableCell>
                        <TableCell onClick={() => this._openDetail(column)} align='left' className='table-cell'>{column.WoNumber || '-'}</TableCell>
                        <TableCell onClick={() => this._openDetail(column)} align='left' className='table-cell'>{column.CustomerName || '-'}</TableCell>
                        <TableCell onClick={() => this._openDetail(column)} align='left' className='table-cell'>{column.OpenBacklog}</TableCell>
                        <TableCell onClick={() => this._openDetail(column)} align='left' className='table-cell'>{convertDateTime(column.PlanExecutionDate).format('DD MMMM YYYY')}</TableCell>
                        <TableCell onClick={() => this._openDetail(column)} align='left' className='table-cell'>{column.Status}</TableCell>
                        <TableCell onClick={() => this._openDetail(column)} align='left' className='table-cell'>{column.Staging}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        )
    }
}
