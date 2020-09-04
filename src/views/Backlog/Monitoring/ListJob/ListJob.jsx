import React from "react";
import { MENU } from "constants/menu";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { DropdownComponent, SearchInput } from "components";
import { Table, TableRow, TableCell, TableHead, TableBody, Button, Card, CardContent, Modal, DialogContent } from "@material-ui/core";
import DetailJobs from "../DetailJobs/DetailJobs";
import { IconFilter } from "assets/icons";

export default class ListJob extends React.PureComponent {
  constructor(props) {
    super(props)
  
    this.state = {
      isFilterShow:false,
      isShowDetails:false,
      displayFilter:{
        PriorityCode:'All Priority',
        StatusFilter:'All Status',
        ResponsibilitiesFilter:'All Responsibility'
      },
      backlogParams:{
        WorkCenter: this.props.workCenter,
        UnitModel: this.props.unitModel,
        UnitCode: this.props.unitCode,
        SearchValue: '',
        Query: {
          PageNumber: 1,
          PageSize: 10,
          Sort: [],
          Filter: []
        }
      }
    }
  }
    
  handleClickDetails = async (key,field) => {
    const {token} = this.props;
    switch (key) {
      case 'openDetails':
        await this.props.fetchDetailBmsMonitoring(field.Id,token);
        this.setState({
          isShowDetails:true
        })    
        break;
      case 'closeDetails':
        this.setState({
          isShowDetails:false
        })
        break;
      default:
        break;
    }
    
  }
  
  _searchParameter = (value) => {
    const {backlogParams} = this.state;
    this.setState({
      backlogParams:{
        ...backlogParams,
        SearchValue:value
      }
    })
  }
  _selectFilter = (key, value) => {
    let { backlogParams, displayFilter } = this.state;
    console.log('value',value)
    displayFilter = {
      ...displayFilter,
      [key]: value
    };
    const defaultName = ['All Priority','All Responsibility','All Status']
    const Filter = Object.keys(displayFilter).reduce((temp,element) => {
      if(!defaultName.includes(displayFilter[element])){
        temp.push({
          Field: element,
          Operator: "eq",
          Logic: "and",
          Value: displayFilter[element]
        })
      }
      return temp
    }, []);
    this.setState({
      backlogParams: {
        ...backlogParams,
        Query:{
          ...backlogParams.Query,
          Filter
        }
      },
      displayFilter
    });
  };

  _renderBreadCrumbs = () => {
    const {workCenter,unitModel,unitCode} = this.props;
    return (
      <div className="sub-app-bar">
        <Link className="link" to={MENU.DASHBOARD}>
          Home
        </Link>
        <KeyboardArrowRight className="arrow-right" />
        <Link className="link" to={MENU.BACKLOG_MONITORING}>
          Backlog Monitoring
        </Link>
        <KeyboardArrowRight className="arrow-right" />
        <Link
          className="link"
          to={`${MENU.BACKLOG_MONITORING}${workCenter}`}
        >
          {workCenter}
        </Link>
        <KeyboardArrowRight className="arrow-right" />
        <Link
          className="link"
          to={`${MENU.BACKLOG_MONITORING}${workCenter}/${unitModel}`}
        >
          {unitModel}
        </Link>
        <KeyboardArrowRight className="arrow-right" />
        <p className='not-link'>{unitCode}</p>
      </div>
    );
  };
  _renderTitlePages = () => {
    return <p className='title-page'>Backlog Monitoring List</p>
  }
  
  _renderSearchInput = () => {
    return(
      <SearchInput 
        webInfo='Search by unit code,unit model,or work order' 
        onSearch={this._searchParameter}
        displayMode={this.props.displayMode}
      />
    )
  }
  _renderFilterDropdown = () => {
    const {PrioritiesFilter,StatusFilter,ResponsibilitiesFilter} = this.props.bmsAchievementList;
    
    console.log('PrioritiesFilter',PrioritiesFilter)
    return(
      <div className='dropdowns-container'>
        <div className='dropdown-container'>
          <DropdownComponent
            displayMode={this.props.display}
            data={PrioritiesFilter}
            itemKey='Desc'
            selected={this.state.displayFilter.PriorityCode || ""}
            onSelectAction={value => this._selectFilter("PriorityCode", value)}
          />
        </div>
        <div className='dropdown-container'>
          <DropdownComponent
            displayMode={this.props.display}
            data={ResponsibilitiesFilter}
            itemKey='Desc'
            selected={this.state.displayFilter.ResponsibilitiesFilter || ""}
            onSelectAction={value => this._selectFilter("ResponsibilitiesFilter", value)}
          />
        </div>
        <div className='dropdown-container'>
          <DropdownComponent
            displayMode={this.props.display}
            data={StatusFilter}
            itemKey='Status'
            selected={this.state.displayFilter.StatusFilter || ""}
            onSelectAction={value => this._selectFilter("StatusFilter", value)}
          />
        </div>
        {this.props.displayMode === 'web' &&
        <div className='search-container'>
        {this._renderSearchInput()}
        </div>
        }
      </div>
    )
  }
  _renderCardListJob = () => {
    return(
      <Card className='job-list-mobile-card' >
                <CardContent className='job-list-mobile-content' onClick={() => this.handleClickDetails('openDetails')}>
                    {/* For onClick open detail */}
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>WORK ORDER</div>
                                <div className='job-list-detail'>{ '-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>NOTIFICATION</div>
                                <div className='job-list-detail'>{ '-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>AGING</div>
                                <div className='job-list-detail'>{ '-'}</div>
                            </div>
                        </div>
                        <div className='yellow-line'/>
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>PROBLEM</div>
                                <div className='job-list-detail'>{'-'}</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>RESPONSIBILITY</div>
                                <div className='job-list-detail'>{ '-'}</div>
                            </div>
                        </div>
                        <div className='job-list-row'>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>WORK ZONE</div>
                                <div className='job-list-detail'>-</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>SUGGESTED ACTION</div>
                                <div className='job-list-detail'>{  '-'}</div>
                            </div>
                        </div>
                        <div className='job-list-row'>
                        <div className='job-list-detail-container'>
                                <div className='job-list-label'>PRIORITY</div>
                                <div className='job-list-detail'>-</div>
                            </div>
                            <div className='job-list-detail-container'>
                                <div className='job-list-label'>STATUS</div>
                                <div className='job-list-detail'>{  '-'}</div>
                        </div>
                        </div>
                </CardContent>
            </Card>
    )
  }
  _renderTable = () => {
    const {bmsAchievementList} = this.props;
    return(
      <div className="jobs-list-container">
        <Table className='table'>
          <TableHead className='table-head'>
            <TableRow className='table-row'>
              <TableCell className='table-cell' align='center'>WORK ORDER</TableCell>
              <TableCell className='table-cell' align='center'>NOTIFICATION</TableCell>
              <TableCell className='table-cell' align='center'>AGING</TableCell>
              <TableCell className='table-cell' align='center'>PROBLEM</TableCell>
              <TableCell className='table-cell' align='center'>RESPONSIBILTY</TableCell>
              <TableCell className='table-cell' align='center'>WORK ZONE</TableCell>
              <TableCell className='table-cell' align='center'>SUGGESTED ACTION</TableCell>
              <TableCell className='table-cell' align='center'>PRIORITY</TableCell>
              <TableCell className='table-cell' align='center'>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>
          {
            bmsAchievementList.Data && bmsAchievementList.Data.map((field) => (
              <TableRow className='table-row' onClick={() => this.handleClickDetails('openDetails',field)}>
                <TableCell className='table-cell' align='center'>{field.WoNumber || '-'}</TableCell>
                <TableCell className='table-cell' align='center'>{field.NotificationNumber || '-'}</TableCell>
                <TableCell className='table-cell' align='center'>{field.Aging}</TableCell>
                <TableCell className='table-cell' align='center'>{field.ProblemDesc}</TableCell>
                <TableCell className='table-cell' align='center'>{field.Responsibility ? field.Responsibility.Desc : '-'}</TableCell>
                <TableCell className='table-cell' align='center'>{field.WorkZone ? field.WorkZone.Zone : '-'}</TableCell>
                <TableCell className='table-cell' align='center'>{field.SuggestedAction ? field.SuggestedAction.Desc : '-'}</TableCell>
                <TableCell className='table-cell' align='center'>{field.Priority ? field.Priority.Code : '-' }</TableCell>
                <TableCell className='table-cell' align='center'>{field.Status}</TableCell>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
      </div>
    )
  }
  renderModalDetails = () => {
    return (
    <>
    <Modal
      className='modal-container'
      open={this.state.isShowDetails}
      onClose={() => this.handleClickDetails('closeDetails')}
    >
      <DialogContent className='modal-content'>
        <DetailJobs
          detailBms={this.props.bmsAchievementDetail}
          onClose={() => this.handleClickDetails('closeDetails')}
          masterDataBacklog={this.props.masterDataBacklog}
          submitBacklogMonitoring={this.props.submitBacklogMonitoring}
          approveBacklogMonitoring={this.props.approveBacklogMonitoring}
          isLoading={this.props.isLoading}
          responseWebSubmit={this.props.responseWebSubmit}
        />
      </DialogContent>
      </Modal>
    </>
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
    const nextPage = this.props.bmsAchievementList.HasNextPage;
    const prevPage = this.props.bmsAchievementList.HasPreviousPage;
    const currentPage = this.props.bmsAchievementList.PageNumber;
    const {TotalPages} = this.props.bmsAchievementList;
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
  componentDidMount() {
    const {token} = this.props;
    const {backlogParams} = this.state;
    this.props.fetchAchievementUnitCode(backlogParams,token);
    this.props.fetchMasterDataBacklog(token);
  }
  componentDidUpdate = (prevState,prevProps) => {
    const {token} = this.props;
    const {backlogParams} = this.state;
    if(backlogParams !== prevProps.backlogParams){
      this.props.fetchAchievementUnitCode(backlogParams,token);
    }
  }
  render() {
    console.log('LIST',this.state.backlogParams);
    console.log('LIST BACKLOG',this.props);
    if(this.props.displayMode === 'mobile'){
      return (
        <>
        {this._renderBreadCrumbs()}
        <div className='content'>
          <div className='line'/>
          <div className='filters-container'>
            <div className='search-container'>
              <div className='search-bar'>
                {this._renderSearchInput()}
              </div>
              <div className={this.state.isFilterShow ? 'filter-icon-container-choosed' : 'filter-icon-container'}>
                <Button onClick={() => this.setState({isFilterShow:!this.state.isFilterShow})}>
                  <img className='filter-icon' alt='icon filter' src={IconFilter}/>
                </Button>
              </div>
            </div>
            {this.state.isFilterShow && this._renderFilterDropdown()}
          </div>
          <div className='table-container'>
            {this._renderCardListJob()}
          </div>
          {this.renderModalDetails()}
        </div>
        </>
      )
    }
    if(this.props.displayMode === 'tab'){
      return (
        <>
        {this._renderBreadCrumbs()}
        <div className="content">
        {this._renderTitlePages()}
        <div className='line'/>
        <div className='filters-container'>
          <div className='search-container'>
              {this._renderSearchInput()}
              <Button 
                className='filter-btn'
                onClick={() => this.setState({isFilterShow:!this.state.isFilterShow})}
              >
                <img className='filter-icon' alt='icon-filter' src={IconFilter}/>
              </Button>
          </div>
          {this.state.isFilterShow && this._renderFilterDropdown()}          
        </div>
        <div className='table-container'>
          {this._renderTable()}
        </div>
        {this.renderModalDetails()}
        </div>
        </>

      )
    }
    return (
      <>
      {this._renderBreadCrumbs()}
      <div className="content">
        {this._renderTitlePages()}
        <div className="table-container">
            <div className='filters-container'>
            {this._renderFilterDropdown()}
            </div>
          {this._renderTable()}
        </div>
        <div className="bottom-row">
          {this._renderPagination()}
        </div>
        {this.renderModalDetails()}
      </div>
      </>
    );
  }
}
