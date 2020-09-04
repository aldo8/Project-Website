import React from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    // Card,
    // CardContent,
} from '@material-ui/core';
import { SearchInput } from 'components';
import './ProblemLogList.scss';
import { MENU } from 'constants/menu';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';

export default class ProblemLogList extends React.PureComponent {
    handleClickDetails = (field) => {
        this.props.selectedProblemLog(field)
        this.props.push(`${MENU.DETAIL_PROBLEMLOG}${field.WoId || ''}`);
    }
    _renderSearch = () => {
        return (
            <div className='search-input-container'>
                <SearchInput/>
            </div>
        )
    }
    _renderTable = () => {
        const {Data} = this.props.listBySpv;
        return (
            <Table classes={{root:'table'}}>
                <TableHead className='table-head' classes={{root:'table-head'}}>
                    <TableRow classes={{root:'table-row'}}>
                        <TableCell align='left' className='table-cell'>HM</TableCell>
                        <TableCell align='left' className='table-cell'>WORK ORDER</TableCell>
                        <TableCell align='left' className='table-cell'>AGING</TableCell>
                        <TableCell align='left' className='table-cell'>PROBLEM</TableCell>
                        <TableCell align='left' className='table-cell'>RESPONSIBILITY</TableCell>
                        <TableCell align='left' className='table-cell'>CATEGORY</TableCell>
                        <TableCell align='left' className='table-cell'>IMPACT</TableCell>
                        <TableCell align='left' className='table-cell'>PIC</TableCell>
                        <TableCell align='left' className='table-cell'>STATUS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody classes={{root:'table-body'}}>
                    {
                        Data.map((field) => (
                        <TableRow 
                        classes={{root:'table-row'}} 
                        onClick={() => this.handleClickDetails(field)}
                        >
                            <TableCell align='left' className='table-cell'>{field.HourMeter}</TableCell>
                            <TableCell align='left' className='table-cell'>{field.WoNumber}</TableCell>
                            <TableCell align='left' className='table-cell'>{field.Age}</TableCell>
                            <TableCell align='left' className='table-cell'>{field.ProblemTypeRemarks}</TableCell>
                            <TableCell align='left' className='table-cell'>{field.ResponseTypeName}</TableCell>
                            <TableCell align='left' className='table-cell'>{field.ProblemTypeName}</TableCell>
                            <TableCell align='left' className='table-cell'>{field.ImpactTypeName}</TableCell>
                            <TableCell align='left' className='table-cell'>{field.PicImprove}</TableCell>
                            <TableCell align='left' className='table-cell'>{field.Status}</TableCell>
                        </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        )
    }
    _renderPagination = () => {
        const web = this.props.displayMode === "web";
        const nextPage = this.props.listBySpv.HasNextPage;
        const prevPage = this.props.listBySpv.HasPreviousPage;
        const PageNumber = this.props.listBySpv.PageNumber;
        const { TotalPages } = this.props.listBySpv;
        return (
          <div className="pagination">
            <div className="paging">
              {prevPage && (
                <div
                  className="next-page"
                  onClick={() => this.props.updateProblemLog("PageNumber", PageNumber - 1)}
                >
                  <KeyboardArrowLeft className="arrow-icon" />
                </div>
              )}
              {web && PageNumber - 3 > 0 && (
                <div
                  className="page-inactive"
                  onClick={() => this.props.updateProblemLog("PageNumber", PageNumber - 3)}
                >
                  {PageNumber - 3}
                </div>
              )}
              {web && PageNumber - 2 > 0 && (
                <div
                  className="page-inactive"
                  onClick={() => this.props.updateProblemLog("PageNumber", PageNumber - 2)}
                >
                  {PageNumber - 2}
                </div>
              )}
              {PageNumber - 1 > 0 && (
                <div
                  className="page-inactive"
                  onClick={() => this.props.updateProblemLog("PageNumber", PageNumber - 1)}
                >
                  {PageNumber - 1}
                </div>
              )}
              <div
                className="page-active"
                onClick={() => this.props.updateProblemLog("PageNumber", PageNumber)}
              >
                {PageNumber}
              </div>
              {PageNumber + 1 <= TotalPages && (
                <div
                  className="page-inactive"
                  onClick={() => this.props.updateProblemLog("PageNumber", PageNumber + 1)}
                >
                  {PageNumber + 1}
                </div>
              )}
              {web && PageNumber + 2 < TotalPages && (
                <div
                  className="page-inactive"
                  onClick={() => this.props.updateProblemLog("PageNumber", PageNumber + 2)}
                >
                  {PageNumber + 2}
                </div>
              )}
              {web && PageNumber + 3 < TotalPages && (
                <div
                  className="page-inactive"
                  onClick={() => this.props.updateProblemLog("PageNumber", PageNumber + 3)}
                >
                  {PageNumber + 3}
                </div>
              )}
              {nextPage && (
                <div
                  className="next-page"
                  onClick={() => this.props.updateProblemLog("PageNumber", PageNumber + 1)}
                >
                  <KeyboardArrowRight className="arrow-icon" />
                </div>
              )}
            </div>
          </div>
        );
    }
    render(){
        console.log('MNB',this.props)
        return(
            <div className='problem-log-container'>
                <div className='problem-log-header-container'>
                    <div className='problem-log-header-line'/>
                    <p>Problem Log</p>
                    {this._renderSearch()}
                </div>
                <div className='table-container'>
                    {/* create condition when data is show up */}
                    {this._renderTable()}
                </div>
                <div className="bottom-row">
                    {this._renderPagination()}
                </div>'
            </div>
        )
    }
}