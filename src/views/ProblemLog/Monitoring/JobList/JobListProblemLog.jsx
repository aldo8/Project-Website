import React from "react";
import { Link } from "react-router-dom";
import { KeyboardArrowRight } from "@material-ui/icons";
import { MENU } from "constants/menu";
import { DropdownComponent, SearchInput } from "components";
import TableListProblemLog from './private-component/TableProblemLog/TableProblemLog';
import { CircularProgress } from "@material-ui/core";

export default class JobListProblemLog extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      selectedListMonitor:{
        SearchValue:'',
        WorkCenterCode:this.props.workCenterCode,
        JobType:this.props.jobType,
        Query:{
            PageNumber: 1,
            PageSize: 10,
            Sort: [],
            Filter: []
        }
     }
    }
  }
  
  componentDidMount = () => {
    const {selectedListMonitor} = this.state
    const {token} = this.props;
    this.props.fetchListMonitoring(selectedListMonitor,token)
  }
  onSort = (field) => {
    const {selectedListMonitor} = this.state
    let {Sort} = this.state.selectedListMonitor.Query
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
      selectedListMonitor:{
        ...selectedListMonitor,
        Query:{
          ...selectedListMonitor.Query,
          Sort:Sort
        }
      }
    })
  }
  _renderBreadCrumbs = () => {
    return (
      <div className="sub-app-bar">
        <Link className="link" to={MENU.DASHBOARD}>
          Home
        </Link>
        <KeyboardArrowRight className="arrow-right" />
        <Link className="link" to={MENU.PROBLEMLOG_MONITORING}>
          Work Center
        </Link>
        <KeyboardArrowRight className="arrow-right" />
        <Link className="link" to={MENU.PROBLEMLOG_MONITORING_JOB_TYPE}>
          Job Type
        </Link>
        <KeyboardArrowRight className="arrow-right" />
        <p className="not-link">{"Job List"}</p>
      </div>
    );
  };
  _renderFilter = () => {
    return (
      <div className="dropdowns-container">
        <div className="dropdown-container">
          <DropdownComponent displayMode={this.props.display} />
        </div>
        <div className="dropdown-container">
          <DropdownComponent displayMode={this.props.display} />
        </div>
        <div className="dropdown-container">
          <DropdownComponent displayMode={this.props.display} />
        </div>
        {this.props.displayMode === "web" && (
          <div className="search-container">{this._renderSearchInput()}</div>
        )}
      </div>
    );
  };
  _renderSearchInput = () => {
      return(
        <SearchInput/>
      )
  }
  _openDetailProblemLog = (field) => {
    const {token,workCenterCode,jobType} = this.props;
    this.props.fetchDetailProblemLog(field.Id,token)
    this.props.push(`${MENU.PROBLEMLOG_MONITORING}/${workCenterCode}/${jobType}/${field.Id}`)
  }
  _renderTable = () => {
    const {listMonitor} = this.props;
    return (
        <div className="jobs-list-container">
            <TableListProblemLog
                onClick={this._openDetailProblemLog}
                data={listMonitor.Data}
            />
        </div>
    );
  };
  _renderLoadingScreen = () => {
    const {isLoading} = this.props
    return (
      <>
      {
        isLoading && <CircularProgress size={100} className="circular-progress" />
      }
      </>
      )
  }
  render() {
    console.log('LIST JOBBBBBBB',this.props)
    return (
      <>
        {this._renderBreadCrumbs()}
        <div className="content">
            <div className="table-container">
                {this._renderLoadingScreen()}
                <div className="filters-container">
                {this._renderFilter()}
                </div>
                {this._renderTable()}
            </div>
        </div>
      </>
    );
  }
}
