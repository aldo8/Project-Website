import React from 'react';
import { Link } from 'react-router-dom';
import { KeyboardArrowRight, KeyboardArrowLeft} from '@material-ui/icons';
import { MENU } from 'constants/menu';
import SearchInput from 'components/SearchInput/SearchInput';
import {JobListHeader} from 'components';
import { TableHead, Table, TableBody, TableRow, TableCell, Card, CardContent, CircularProgress } from '@material-ui/core';
import './UnitCode.scss'

export default class UnitCode extends React.PureComponent{
    constructor(props) {
        super(props)
    
        this.state = {
             backlogParams:{
                 WorkCenter:this.props.workCenter,
                 UnitModel:this.props.unitModel,
                 SearchValue:'',
                 Query:{
                    PageNumber:1,
                    PageSize:2
                 },
                 Sort:[],
                 Filter:[]
             }
        }
    }
    // Handle On Click
    _onSortBy = field => {
        console.log('fieldX:',field)
    const { backlogParams } = this.state;
    let {Sort} = backlogParams
    
    console.log('fieldZ:',Sort)
    let selectedField = Sort.find((item) => item.Field === field)
    if(selectedField){
      selectedField.Direction = selectedField.Direction === 'asc' ? 'desc' : 'asc'
    }else{
      selectedField = {
        Field:field,
        Direction:'desc'
      }
    }
    Sort = Sort.filter((item) => item.Field !== field)
    Sort.push(selectedField)
    this.setState({
      backlogParams: {
        ...backlogParams,
        Query:{
          ...backlogParams.Query,
        },
        Sort:Sort
      }
    })
    };
    _renderBreadCrumbs = () => {
        const {WorkCenter,UnitModel} = this.props;
        return(
            <div className="sub-app-bar">
              <Link className="link" to={MENU.DASHBOARD}>
                Home
              </Link>
              <KeyboardArrowRight className="arrow-right" />
              <Link className="link" to={MENU.BACKLOG_MONITORING}>
                Backlog Monitoring
              </Link>
              <KeyboardArrowRight className="arrow-right" />
              <Link className="link" to={`${MENU.BACKLOG_MONITORING}${WorkCenter}`} >
                {WorkCenter}
              </Link>
              <KeyboardArrowRight className="arrow-right" />
              <p className="not-link">{UnitModel}</p>
            </div>
        )
    }
    
    _renderTitlePages = () => {
        return <p className='title-page'>Backlog Monitoring Unit Code</p>
    }
    
    renderSearch = () => {
        return(
                <SearchInput/>
        )
    }
    _renderCardUnitCode = () => {
        const {workCenter,unitModel} = this.props;
        console.log('vijay',this.props)
        return (
            <Card className='job-list-mobile-card' >
                <CardContent className='job-list-mobile-content' onClick={() => this.props.pushTo(`${MENU.BACKLOG_MONITORING}${workCenter}/${unitModel}`)}>
                    {/* For onClick open detail */}
                    <>
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>UNIT MODEL</div>
                                <div className='job-list-detail'>{ '-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>UNIT CODE</div>
                                <div className='job-list-detail'>{ '-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>BACKLOG ACHIEVEMENT</div>
                                <div className='job-list-detail'>{ '-'}</div>
                            </div>
                        </div>
                        <div className='yellow-line'/>
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>PRIORITY 1</div>
                                <div className='job-list-detail'>{'-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>PRIORITY 2</div>
                                <div className='job-list-detail'>{ '-'}</div>
                            </div>
                        </div>
                        <div className='job-list-row'/>
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>PRIORITY 3</div>
                                <div className='job-list-detail'>-</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>PRIORITY 4</div>
                                <div className='job-list-detail'>{  '-'}</div>
                            </div>
                        </div>
                    </>
                    
                </CardContent>
            </Card>
        )
    }
    _renderTable = () => {
        console.log('UNIT CODE',this.props)
        const {bmsAchievementUnitCode,workCenter,unitModel} = this.props
        return(
            <div className="jobs-list-container">
                <Table classes={{root:'table'}}>
                    <TableHead className='table-head' classes={{root:'table-head'}}>
                        <TableRow className='table-row'>
                        <JobListHeader
                            name="UNIT MODEL"
                            onClick={() => this._onSortBy('UnitModel')}
                        />
                        <JobListHeader
                            name="UNIT CODE"
                            onClick={() => this._onSortBy('UnitCode')}
                        />
                        <JobListHeader
                            name="BACKLOG ACHIEVEMENT"
                            onClick={() => this._onSortBy('Achievement')}
                        />
                        <JobListHeader
                            name="PRIORITY 1"
                            onClick={() => this._onSortBy('Priority1')}
                        />
                        <JobListHeader
                            name="PRIORITY 2"
                            onClick={() => this._onSortBy('Priority2')}
                        />
                        <JobListHeader
                            name="PRIORITY 3"
                            onClick={() => this._onSortBy('Priority3')}
                        />
                        <JobListHeader
                            name="PRIORITY 4"
                            onClick={() => this._onSortBy('Priority4')}
                        />
{/*                         
                            <TableCell className='table-cell' align='center'>UNIT MODEL</TableCell>
                            <TableCell className='table-cell' align='center'>UNIT CODE</TableCell>
                            <TableCell className='table-cell' align='center'>BACKLOG ACHIEVEMENT</TableCell>
                            <TableCell className='table-cell' align='center'>PRIORITY 1</TableCell>
                            <TableCell className='table-cell' align='center'>PRIORITY 2</TableCell>
                            <TableCell className='table-cell' align='center'>PRIORITY 3</TableCell>
                            <TableCell className='table-cell' align='center'>PRIORITY 4</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody classes={{root:'table-body'}}>
                    {
                        bmsAchievementUnitCode.Data && bmsAchievementUnitCode.Data.map((field) => (
                            <TableRow className='table-row' onClick={() => this.props.pushTo(`${MENU.BACKLOG_MONITORING}${workCenter}/${unitModel}/${field.UnitCode}`)}>
                                <TableCell className='table-cell' align='center'>{field.UnitModel}</TableCell>
                                <TableCell className='table-cell' align='center'>{field.UnitCode}</TableCell>
                                <TableCell className='table-cell' align='center'>{field.Achievement}</TableCell>
                                <TableCell className='table-cell' align='center'>{field.Priority1}</TableCell>
                                <TableCell className='table-cell' align='center'>{field.Priority2}</TableCell>
                                <TableCell className='table-cell' align='center'>{field.Priority3}</TableCell>
                                <TableCell className='table-cell' align='center'>{field.Priority4}</TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </div>
        )
    }
    updateParameter = (field,value) => {
        const {backlogParams} = this.state;
        if (field) {
            this.setState({
              backlogParams:{
                ...backlogParams,
                [field]:value
              }
            })
        }
      }
    _renderPagination = () => {
        const web = this.props.displayMode === 'web';
        const nextPage = this.props.bmsAchievementUnitCode.HasNextPage;
        const prevPage = this.props.bmsAchievementUnitCode.HasPreviousPage;
        const currentPage = this.props.bmsAchievementUnitCode.PageNumber;
        const {TotalPages} = this.props.bmsAchievementUnitCode;
        return(
          <div className='pagination'>
            <div className='paging'>
                {prevPage &&  <div className='next-page' onClick={() => this.updateParameter('currentPage', currentPage - 1)}><KeyboardArrowLeft className='arrow-icon'/></div>}
                {web && currentPage - 3 > 0 && <div className='page-inactive' onClick={() => this.updateParameter('currentPage',currentPage - 3)}>{currentPage - 3}</div>}
                {web && currentPage - 2 > 0 && <div className='page-inactive' onClick={() => this.updateParameter('currentPage',currentPage - 2)}>{currentPage - 2}</div>}
                {currentPage - 1 > 0 && <div className='page-inactive' onClick={() => this.updateParameter('currentPage',currentPage - 1)}>{currentPage - 1}</div>}
                <div className='page-active' onClick={() => this.updateParameter('currentPage',currentPage)}>{currentPage}</div>
                {currentPage + 1 <= TotalPages && <div className='page-inactive' onClick={() => this.updateParameter('currentPage',currentPage + 1)}>{currentPage + 1}</div>}
                {web && currentPage + 2 < TotalPages && <div className='page-inactive' onClick={() => this.updateParameter('currentPage',currentPage + 2)}>{currentPage + 2}</div>}
                {web && currentPage + 3 < TotalPages && <div className='page-inactive' onClick={() => this.updateParameter('currentPage',currentPage + 3)}>{currentPage + 3}</div>}
                {nextPage && <div className='next-page' onClick={() => this.updateParameter('currentPage',currentPage + 1)}><KeyboardArrowRight className='arrow-icon'/></div>}
                
            </div>
          </div>
        )
      }
    
    _renderLoadingScreen = () => {
        const {isLoading} = this.props;
        return (
            <>
            {
              isLoading && <CircularProgress size={100} className="circular-progress" />
            }
            </>
            )
    }
    componentDidMount = () => {
        const {token} = this.props;
        const {backlogParams} = this.state;

        this.props.fetchAchievementUnitModel(backlogParams,token)
    }
    componentDidUpdate = (prevState,prevProps) => {
        const {token} = this.props;
        const {backlogParams} = this.state;
        if(backlogParams !== prevProps.backlogParams){
            this.props.fetchAchievementUnitModel(backlogParams,token)
        }
    }
    render(){
        if (this.props.displayMode === 'mobile'){
            return(
                <>
                {this._renderBreadCrumbs()}
                <div className='content'>
                    <div className='line'/>
                    <div className='filters-container'>
                        <div className='search-container'>
                            <div className='search-bar'>
                                {this.renderSearch()}
                            </div>
                        </div>
                    </div>
                    <div className='table-container'>
                        {this._renderCardUnitCode()}
                    </div>
                </div>
                </>
            )
        }
        return(
            <div>
            {this._renderLoadingScreen()}
            {this._renderBreadCrumbs()}
            <div className='content'>
                {this._renderTitlePages()}
                <div className="table-container">
                {this.renderSearch()}
                {this._renderTable()}
                </div>
                <div className='bottom-row'>
                    {this._renderPagination()}
                </div>
            </div>
            </div>
        )
    }
}