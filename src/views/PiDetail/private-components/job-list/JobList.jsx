import React from 'react';
import {
    ExpansionPanel, 
    ExpansionPanelDetails, 
    ExpansionPanelSummary,
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow, 
    Card, 
    CardContent,
  } from '@material-ui/core';
  import { ExpandMore } from '@material-ui/icons';
  import {SearchInput} from 'components'
  import './JobList.scss'

export default class JobList extends React.PureComponent {

    _renderJobList = () => {
      const {listBacklog} = this.props;
      console.log('listBacklog',listBacklog)
        return (
        <div className="table-container">
            <Table classes={{ root: 'table' }}>
                <TableHead className="table-head" classes={{ root: 'table-head' }}>
                    <TableRow classes={{ root: 'table-row' }}>
                        <TableCell style={{ padding: '0.5vw' }} />
                        <TableCell align="left" className="table-cell">WORK ORDER</TableCell>
                        <TableCell align="left" className="table-cell">AGING</TableCell>
                        <TableCell align="left" className="table-cell">PROBLEM</TableCell>
                        <TableCell align="left" className="table-cell">RESPONSIBILITY</TableCell>
                        <TableCell align="left" className="table-cell">WORK ZONE</TableCell>
                        <TableCell align="left" className="table-cell">SUGGESTED ACTION</TableCell>
                        <TableCell align="left" className="table-cell">PRIORITY</TableCell>
                        <TableCell align="left" className="table-cell">STATUS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody classes={{ root: 'table-body' }}>
            {
              listBacklog.Data && listBacklog.Data.map((field) => (
                <TableRow  
                      classes={{ root: 'table-row' }} 
                      onClick={() => this.props.onClick(field)}
                      key={field.workOrderId}
                    >
                        <TableCell style={{ padding: '0.5vw' }} />
                        <TableCell className='table-cell' align='left'>{field.WoNumber}</TableCell>
                        <TableCell className='table-cell' align='left'>{field.Aging}</TableCell>
                        <TableCell className='table-cell' align='left'>{`${field.ObjectSpecificPart && field.ObjectSpecificPart.Desc} ${field.Damage && field.Damage.Desc}`}</TableCell>
                        <TableCell className='table-cell' align='left'>{field.Responsibility ? field.Responsibility.Desc : '-'}</TableCell>
                        <TableCell className='table-cell' align='left'>{field.WorkZone ? `Zone ${field.WorkZone.Zone}` : '-'}</TableCell>
                        <TableCell className='table-cell' align='left'>{field.SuggestedAction ? field.SuggestedAction.Desc : '-'}</TableCell>
                        <TableCell className='table-cell' align='left'>{field.Priority ? field.Priority.Desc : '-'}</TableCell>
                        <TableCell className='table-cell' align='left'>{field.Status || '-'}</TableCell>
                    </TableRow>
              ))
            }
                </TableBody>
            </Table>
        </div>
        )
    }
    _renderJobListMobile = () => {
      const {listBacklog} = this.props;
        return(
            <>
            {
              listBacklog.listBacklog && listBacklog.listBacklog.map((field) => (
                <Card 
                className="backlog-job-list-mobile-card" 
                onClick={() => this.props.onClick()}
              >
              <CardContent className="job-list-mobile-content">
                <div className="job-list-row">
                  <div className="job-list-detail-container">
                    <div className="job-list-label">Work Order</div>
                    <div className="job-list-detail">{field.WoNumber || '-'}</div>
                  </div>
                  <div className="job-list-detail-container">
                    <div className="job-list-label">Work Zone</div>
                    <div className="job-list-detail">{field.WorkZone ? `Zone ${field.WorkZone.Zone}` : '-'}</div>
                  </div>
                  <div className="job-list-detail-container">
                    <div className="job-list-label">Status</div>
                    <div className="job-list-detail">{field.Status}</div>
                  </div>
                </div>
                <div className="yellow-line" />
                <div className="job-list-row">
                  <div className="job-list-detail-container">
                    <div className="job-list-label">Problem</div>
                    <div className="job-list-detail">{`${field.ObjectSpecificPart && field.ObjectSpecificPart.Desc} ${field.Damage && field.Damage.Desc}`}</div>
                  </div>
                </div>
                <div className="job-list-row">
                  <div className="job-list-detail-container">
                    <div className="job-list-label">Responsibility</div>
                    <div className="job-list-detail">{field.Responsibility ? field.Responsibility.Desc : '-'}</div>
                  </div>
                  <div className="job-list-detail-container">
                    <div className="job-list-label">Aging</div>
                    <div className="job-list-detail">{field.Aging}</div>
                  </div>
                </div>
                <div className="job-list-row">
                  <div className="job-list-detail-container">
                    <div className="job-list-label">Suggested Action</div>
                    <div className="job-list-detail">{field.SuggestedAction ? field.SuggestedAction.Desc : '-'}</div>
                  </div>
                  <div className="job-list-detail-container">
                    <div className="job-list-label">Priority</div>
                    <div className="job-list-detail">{field.Priority ? field.Priority.Desc : '-'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))
            }
            </>
        )
    }
    _renderPanelJobList = () => {
        return (
        <ExpansionPanel defaultExpanded classes={{ root: 'job-list-expand' }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore className="expand-icon" />}
          classes={{
            expanded: 'job-list-header-icon',
            root: 'job-list-header-expanded',
            content: 'job-list-header-expanded',
          }}
        >
          <p className="job-list-title">Job List</p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: 'job-list-detail' }}>
          <div className="buttons-row">
            <div className="btn-active">BACKLOG</div>
            <div className="btn-inactive">PCAR</div>
            <div className="btn-inactive">MA</div>
            {
              this.props.displayMode !== 'mobile'
              && (
                <div className="search-input-container">
                  <SearchInput 
                    {...this.props}
                    onSearch={this.props.searchbacklogParams} 
                    webInfo="Search by unit code, unit model or priority" 
                 />
                </div>
              )
            }
          </div>
          { this.props.displayMode !== 'mobile' ? this._renderJobList() : this._renderJobListMobile()}
          {/* Render pagination here */}
        </ExpansionPanelDetails>
      </ExpansionPanel>
        )
    }

    render(){
      console.log('listjob backlog:',this.props)
        return (
        <div className="job-list-container">
            {this._renderPanelJobList()}
        </div>
        )
    }
}