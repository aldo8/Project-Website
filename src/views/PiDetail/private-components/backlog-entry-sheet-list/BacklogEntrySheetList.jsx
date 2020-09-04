import React from 'react';
import { SearchInput } from 'components';
import { Table, TableHead, TableRow, TableCell, TableBody, Card, CardContent } from '@material-ui/core';
import './BacklogEntrySheetList.scss';
import { PencilYellow } from 'assets/icons';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

export default class BacklogEntrySheetList extends React.PureComponent {
    _renderSearch = () => {
        return (
            <div className='search-input-container'>
                <SearchInput/>
            </div>
        )
    }
    
    _renderPagination = () => {
        console.log(this.props)
        const web = this.props.displayMode === "web";
        const nextPage = this.props.listBacklog.HasNextPage;
        const prevPage = this.props.listBacklog.HasPreviousPage;
        const PageNumber = this.props.listBacklog.PageNumber;
        const { TotalPages } = this.props.listBacklog;
        return (
          <div className="pagination">
            <div className="paging">
              {prevPage && (
                <div
                  className="next-page"
                  onClick={() => this.props.updateParams("PageNumber", PageNumber - 1)}
                >
                  <KeyboardArrowLeft className="arrow-icon" />
                </div>
              )}
              {web && PageNumber - 3 > 0 && (
                <div
                  className="page-inactive"
                  onClick={() => this.props.updateParams("PageNumber", PageNumber - 3)}
                >
                  {PageNumber - 3}
                </div>
              )}
              {web && PageNumber - 2 > 0 && (
                <div
                  className="page-inactive"
                  onClick={() => this.props.updateParams("PageNumber", PageNumber - 2)}
                >
                  {PageNumber - 2}
                </div>
              )}
              {PageNumber - 1 > 0 && (
                <div
                  className="page-inactive"
                  onClick={() => this.props.updateParams("PageNumber", PageNumber - 1)}
                >
                  {PageNumber - 1}
                </div>
              )}
              <div
                className="page-active"
                onClick={() => this.props.updateParams("PageNumber", PageNumber)}
              >
                {PageNumber}
              </div>
              {PageNumber + 1 <= TotalPages && (
                <div
                  className="page-inactive"
                  onClick={() => this.props.updateParams("PageNumber", PageNumber + 1)}
                >
                  {PageNumber + 1}
                </div>
              )}
              {web && PageNumber + 2 < TotalPages && (
                <div
                  className="page-inactive"
                  onClick={() => this.props.updateParams("PageNumber", PageNumber + 2)}
                >
                  {PageNumber + 2}
                </div>
              )}
              {web && PageNumber + 3 < TotalPages && (
                <div
                  className="page-inactive"
                  onClick={() => this.props.updateParams("PageNumber", PageNumber + 3)}
                >
                  {PageNumber + 3}
                </div>
              )}
              {nextPage && (
                <div
                  className="next-page"
                  onClick={() => this.props.updateParams("PageNumber", PageNumber + 1)}
                >
                  <KeyboardArrowRight className="arrow-icon" />
                </div>
              )}
            </div>
          </div>
        );
      };
    _renderTableBESMobile = () => {
        const {listBacklog} = this.props;
        return (
            <>
            {
                listBacklog.Data && listBacklog.Data.map((field) => (
            <Card className='job-list-mobile-card' >
                <CardContent className='job-list-mobile-content'>
                    <div onClick={() => this.props.onClickBacklogList(field)}>
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>WORK ORDER</div>
                                <div className='job-list-detail'>{field.WoNumber || '-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>NOTIFICATION</div>
                                <div className='job-list-detail'>{field.NotificationNumber || '-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>AGING</div>
                                <div className='job-list-detail'>{field.Aging || 0}</div>
                            </div>
                        </div>
                        <div className='yellow-line'/>
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>STATUS</div>
                                <div className='job-list-detail'>{field.Status || '-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>RESPONSIBILITY</div>
                                <div className='job-list-detail'>{field.Responsibility ? field.Responsibility.Desc : '-'}</div>
                            </div>
                        </div>
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>WORK ZONE</div>
                                <div className='job-list-detail'>{field.WorkZone ? `Zone ${field.WorkZone.Zone}` : '-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>SUGGESTED ACTION</div>
                                <div className='job-list-detail'>{field.SuggestedAction ? field.SuggestedAction.Desc : '-'}</div>
                            </div>
                        </div>
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>PRIORITY</div>
                                <div className='job-list-detail'>{field.Priority ? field.Priority.Desc : '-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>PROBLEM</div>
                                <div className='job-list-detail'>{`${field.ObjectSpecificPart && field.ObjectSpecificPart.Desc} ${field.Damage && field.Damage.Desc}`}</div>
                            </div>
                        </div>
                        </div>
                </CardContent>
            </Card>
            ))}
            </>
        )
    }
    _renderTableBES = () => {
        console.log('backlogList',this.props)
        const {listBacklog} = this.props;
        if (this.props.displayMode ==='mobile'){
            return(
                this._renderTableBESMobile()
            )
        }
        return (
            <Table classes={{root:'table'}}>
                <TableHead classes={{root:'table-head'}} className='table-head'>
                    <TableRow classes={{root:'table-row'}}>
                        <TableCell className='table-cell' align='left'>WORK ORDER</TableCell>
                        <TableCell className='table-cell' align='left'>NOTIFICATION</TableCell>
                        <TableCell className='table-cell' align='left'>AGING</TableCell>
                        <TableCell className='table-cell' align='left'>PROBLEM</TableCell>
                        <TableCell className='table-cell' align='left'>RESPONSIBILITY</TableCell>
                        <TableCell className='table-cell' align='left'>WORK ZONE</TableCell>
                        <TableCell className='table-cell' align='left'>SUGGESTED ACTION</TableCell>
                        <TableCell className='table-cell' align='left'>PRIORITY</TableCell>
                        <TableCell className='table-cell' align='left'>STATUS</TableCell>
                        {
                            !this.props.backlogParams.ShowBES &&
                            <TableCell className='table-cell' align='left'/>
                        }
                    </TableRow>
                </TableHead>
                <TableBody classes={{root:'table-body'}}>
                {
                    listBacklog.Data && listBacklog.Data.map((field) => (
                        <TableRow classes={{root:'table-row'}} onClick={() => this.props.onClickBacklogList(field)}>
                            <TableCell className='table-cell' align='left'>{field.WoNumber}</TableCell>
                            <TableCell className='table-cell' align='left'>{field.NotificationNumber}</TableCell>
                            <TableCell className='table-cell' align='left'>{field.Aging}</TableCell>
                            <TableCell className='table-cell' align='left'>{`${field.ObjectSpecificPart && field.ObjectSpecificPart.Desc} ${field.Damage && field.Damage.Desc}`}</TableCell>
                            <TableCell className='table-cell' align='left'>{field.Responsibility ? field.Responsibility.Desc : '-'}</TableCell>
                            <TableCell className='table-cell' align='left'>{field.WorkZone ? `Zone ${field.WorkZone.Zone}` : '-'}</TableCell>
                            <TableCell className='table-cell' align='left'>{field.SuggestedAction ? field.SuggestedAction.Desc : '-'}</TableCell>
                            <TableCell className='table-cell' align='left'>{field.Priority ? field.Priority.Desc : '-'}</TableCell>
                            <TableCell className='table-cell' align='left'>{field.Status || '-'}</TableCell>
                            {
                            !this.props.backlogParams.ShowBES &&
                            <TableCell className='table-cell' align='left'>
                            {field.Status.toLowerCase() === 'closed' && <img className='edit-bms' alt='warning-icon' src={PencilYellow}/>}
                            </TableCell>
                        }
                        </TableRow>
                    ))
                }
                </TableBody>
            </Table>
        )
    }
    render(){
        console.log('listBacklog',this.props)
        return(
            <div className='bes-container'>
                <div className='bes-header-container'>
                    <div className='bes-header-line'/>
                    {/* Make condition for naming title table list */}
                    <p>{`Backlog ${this.props.backlogParams.ShowBES ? 'Entry':'Monitoring'} Sheet`}</p>
                    {
                        this.props.isExpanded && this._renderSearch()
                    }
                </div>
                <div className='table-container'>
                    {this._renderTableBES()}
                </div>
                <div className="bottom-row">
                    {this._renderPagination()}
                </div>
            </div>
        )
    }
}