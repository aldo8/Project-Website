import React from "react";
import {
  Button,
  Modal,
  DialogContent,
  CircularProgress
} from "@material-ui/core";
import "./JobsPage.scss";
import {
  JobsSummary,
  JobList,
  SelectMechanics,
  SelectTeamLeader
  // SelectTeamLeader,
} from "./private-components";
import {
  SearchInput,
  DropdownComponent,
  ConfirmationModal,
  ProceedConfirmation
} from "components/";
import { IconFilter } from "assets/icons";
import { 
  KeyboardArrowLeft, 
  KeyboardArrowRight 
} from "@material-ui/icons";

export default class JobsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parameter: {
        SearchValue: "",
        Query: {
          PageNumber: 1,
          PageSize: 10,
          Sort: [],
          Filter: []
        }
      },

      displayFilter: {
        JobType: "All Job",
        UnitModel: "All Unit Model",
        Customer: "All Customers"
      },
      jobList: [],
      mechanicList: [],
      mechanicLeader: {},
      selectedFilter: "",
      isFilterShow: false,
      isShowSelectMechanicsModal: false,
      isShowSelectLeaderModal: false,
      isShowAssignSucceed: false,
      isShowUnassignConfirmationModal: false
    };
  }
  componentDidMount = async () => {
    const { token} = this.props;
    const { parameter } = this.state;
    await this.props.fetchListJobAssignment(parameter, token);
  };
  componentDidUpdate = (prevState, prevProps) => {
    const { token } = this.props;
    const { parameter } = this.state;
    if (this.state.parameter !== prevProps.parameter) {
      this.props.fetchListJobAssignment(parameter, token);
    }
  };
  _renderLoadingScreen = () => {
    const { isLoading } = this.props;
    return (
      <>
        {isLoading && (
          <CircularProgress size={100} className="circular-progress" />
        )}
      </>
    );
  };
  // Render Menu on Jobs Page
  _renderMenu = () => {
    const { selectedFilter } = this.state;
    return (
      // Translate Text
      <div className="header-row">
        <Button
          className={
            selectedFilter === 'assigned'
              ? "btn-job-assignment-active"
              : "btn-job-assignment"
          }
          onClick={() => this.updateParameter("job assignment")}
        >
          {"Jobs Assignment"}
        </Button>
        <Button
          className={
            selectedFilter === 'in progress'
              ? "btn-job-assignment-active"
              : "btn-job-assignment"
          }
          onClick={() => this.updateParameter("job in progress")}
        >
          {"Jobs in Progress"}
        </Button>
        <Button
          className={
            selectedFilter === 'need approval'
              ? "btn-job-assignment-active"
              : "btn-job-assignment"
          }
          onClick={() => this.updateParameter("job approval")}
        >
          {"Jobs Approval"}
        </Button>
      </div>
    );
  };
  _renderTitle = () => (
    //   Translate Text
    <p className="title">Jobs Summary</p>
  );
  _renderSummary = () => {
    // displayMode for responsive mobile
    return (
      <div className="work-highlight-container">
        <JobsSummary
          displayMode={this.props.displayMode}
          data={{
            title: "Periodic Inspection",
            total: this.props.listJob.PeriodicInspectionTotal || 0,
            todo: this.props.listJob.PeriodicInspectionUnassign || 0,
            handover: this.props.listJob.PeriodicInspectionHandover || 0
          }}
        />
        <JobsSummary
          displayMode={this.props.displayMode}
          data={{
            title: "Periodic Service",
            total: this.props.listJob.PeriodicServiceTotal || 0,
            todo: this.props.listJob.PeriodicServiceUnassign || 0,
            handover: this.props.listJob.PeriodicServiceHandover || 0
          }}
        />
        <JobsSummary
          displayMode={this.props.displayMode}
          data={{
            title: "Unschedule Breakdown",
            total: this.props.listJob.UnscheduleBreakdownTotal || 0,
            todo: this.props.listJob.UnscheduleBreakdownUnassign || 0,
            handover: this.props.listJob.UnscheduleBreakdownHandover || 0
          }}
        />
      </div>
    );
  };
  _renderSearchInput = () => {
    return (
      <SearchInput
        webInfo="Search by unit code,unit model,or work order"
        onSearch={this._searchParameter}
        displayMode={this.props.displayMode}
      />
    );
  };
  _selectFilter = (key, value) => {
    let { parameter, displayFilter } = this.state;
    displayFilter = {
      ...displayFilter,
      [key]: value
    };
    const defaultName = ['All Job','All Unit Model','All Customers']
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
      parameter: {
        ...parameter,
        Query:{
          ...parameter.Query,
          Filter
        }
      },
      displayFilter
    });
  };

  _renderFilter = value => {
    const { JobTypes, UnitModels, Customers } = this.props.listJob;
    return (
      <div className="dropdowns-container">
        <div className="dropdown-container">
          <DropdownComponent
            displayMode={this.props.display}
            data={JobTypes}
            selected={this.state.displayFilter.JobType || ""}
            onSelectAction={value => this._selectFilter("JobType", value)}
          />
        </div>
        <div className="dropdown-container">
          <DropdownComponent
            displayMode={this.props.display}
            data={UnitModels}
            selected={this.state.displayFilter.UnitModel || ""}
            onSelectAction={value => this._selectFilter("UnitModel", value)}
          />
        </div>
        <div className="dropdown-container">
          <DropdownComponent
            displayMode={this.props.display}
            data={Customers}
            selected={this.state.displayFilter.Customer || ""}
            onSelectAction={value => this._selectFilter("Customer", value)}
          />
        </div>
        {this.props.displayMode === "web" && (
          <div className="search-container">{this._renderSearchInput()}</div>
        )}
      </div>
    );
  };

  // Function
  onAssignJobs = async () => {
    const { token,assignTrackingResponse } = this.props;
    const { mechanicLeader, mechanicList, jobList } = this.state;
    console.log('JobList:::::',JobList)
    const parameter = {
      Assignment: {
        Mechanics: mechanicList,
        Jobs: jobList,
        MechanicLeader: mechanicLeader
      }
    };
    let trackingParams = [];
    jobList.map((field) => {
      const {CustomerName,PlanExecutionDate,Plant,Status,Staging,OpenBacklog, ...obj} = field
      trackingParams = [...trackingParams,obj]
      console.log('filedilefial',obj)
      return obj
      
    })
    await this.props.assignTracking({Assignments:trackingParams},token);
    console.log('parameterTracking',trackingParams)
    
    console.log('assignTrackingResponse',assignTrackingResponse)
    if(assignTrackingResponse){
      this.props.assignJobMechanic(parameter, token);  
    }
    this.setState({
      isShowSelectLeaderModal: false,
      isShowSelectMechanicsModal: false,
      isShowAssignSucceed: true
    });
  };
  onLeaderChoosed = async leader => {
    const { mechanicLeader } = this.state;
    Object.assign(mechanicLeader, leader);
    await this.setState({
      mechanicLeader
    });
  };
  sortingData = field => {
    const { parameter } = this.state;
    let {Sort} = parameter.Query
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
      parameter: {
        ...parameter,
        Query:{
          ...parameter.Query,
          Sort:Sort
        }
      }
    })
    
  };
  _updateAssignment = row => {
    if (this.state.jobList.some(jobs => jobs.WoNumber === row.WoNumber)) {
      return this.unselectJob(row);
    }
    return this.selectJob(row);
  };
  selectJob = row => {
    const wo = { ...row };
    wo.WoId = wo.Id;
    delete wo.Id;
    const { jobList } = this.state;
    jobList.push(wo);
    this.setState({
      jobList
    });
    console.log('jobList',jobList)
  };
  unselectJob = row => {
    let { jobList } = this.state;
    jobList = jobList.filter(jobs => jobs.WoNumber !== row.WoNumber);
    this.setState({
      jobList
    });
  };
  onMechanicChoosed = user => {
    if (
      this.state.mechanicList.some(
        mechanic => mechanic.Username === user.Username
      )
    ) {
      return this.unselectMechanic(user);
    }
    return this.selectMechanic(user);
  };
  selectMechanic = user => {
    const { mechanicList } = this.state;
    mechanicList.push(user);
    this.setState({
      mechanicList
    });
  };
  unselectMechanic = user => {
    let { mechanicList } = this.state;
    mechanicList = mechanicList.filter(
      mechanic => mechanic.Username !== user.Username
    );
    this.setState({
      mechanicList
    });
  };
  onClickAssignMechanics = () => {
    this.setState({
      isShowSelectMechanicsModal: false,
      isShowSelectLeaderModal: true
    });
  };
  _renderJobList = () => {
    const { selectedFilter } = this.state;
    return (
      <div className="jobs-list-container">
        <JobList
          {...this.props}
          listJobAssignment={this.props.listJob.Data}
          push={this.props.push}
          displayCheckBox={
            selectedFilter === "assigned" || selectedFilter === "in progress"
          }
          onChoosed={this._updateAssignment}
          onSortBy={this.sortingData}
          jobList={this.state.jobList}
        />
      </div>
    );
  };
  _renderModals = () => {
    return (
      <>
        <Modal
          className="modal-container"
          open={this.state.isShowSelectMechanicsModal}
          onClose={() => this._handleClose("closeModalMechanic")}
        >
          <DialogContent className="modal-content">
            <SelectMechanics
              {...this.props}
              onClick={this.onMechanicChoosed}
              onCancel={() => this._handleClose("closeModalMechanic")}
              onAssign={this.onClickAssignMechanics}
              jobList={this.state.jobList}
              mechanicList={this.state.mechanicList}
            />
          </DialogContent>
        </Modal>
      </>
    );
  };

  _renderModalLeader = () => {
    return (
      <>
        <Modal
          className="modal-container"
          open={this.state.isShowSelectLeaderModal}
          onClose={() => this._handleClose("closeModalLeader")}
        >
          <DialogContent className="modal-content">
            <SelectTeamLeader
              jobList={this.state.jobList}
              mechanicList={this.state.mechanicList}
              mechanicLeader={this.state.mechanicLeader}
              onCancel={() => this._handleClose("closeModalLeader")}
              onClick={this.onLeaderChoosed}
              onAssign={this.onAssignJobs}
            />
          </DialogContent>
        </Modal>
      </>
    );
  };
  _renderModalSucceed = () => {
    const { assignJob, unassignJob } = this.props;
    console.log('assignJob',assignJob);
    console.log('unassignJob',unassignJob);
    const isAssignSucceed = assignJob.response === true;
    if (unassignJob.data) {
      return (
        <ConfirmationModal
            {...this.props}
            open={this.state.isShowAssignSucceed}
            onClose={() => this._handleClose("closeModalSucceed")}
            message='Jobs has been unassigned'
            isSuccess={unassignJob.data}
          />
      )
    }
    if(assignJob.response) {
      return (
            <ConfirmationModal
              {...this.props}
              open={this.state.isShowAssignSucceed}
              onClose={() => this._handleClose("closeModalSucceed")}
              message={`Jobs has been ${
                isAssignSucceed ? "assigned" : "unassigned"
              }`}
              isSuccess={assignJob.response}
            />
          )
      }
  };
  _renderModalUnassign = () => {
    const { isShowUnassignConfirmationModal } = this.state;
    return (
      <ProceedConfirmation
        open={isShowUnassignConfirmationModal}
        onClose={() => this._handleClose("closeModalUnassign")}
        message={"Do You Want To Proceed ?"}
        onProceed={() => this._handleProceedConfirm("unassignJob")}
      />
    );
  };
  // Render Button Jobs & Translate text
  _renderAssignBtn = () => {
    const { selectedFilter } = this.state;
    if (selectedFilter === "assigned") {
      return (
        <Button
          className="btn-assign"
          disabled={
            this.state.jobList.length < 1 ||
            this.state.jobList.some(job => job.Status === "assigned")
          }
          onClick={() => this._handleClickAssignBtn("assignJobs")}
        >
          Assign
        </Button>
      );
    }
  };
  _renderUnassignBtn = () => {
    const { selectedFilter, jobList } = this.state;
    if (selectedFilter === "assigned" || selectedFilter === "in progress") {
      return (
        <Button
          className="btn-unassign"
          disabled={
            jobList.length < 1 ||
            jobList.some(
              jobs => jobs.Status === "unassign" || jobs.Status === "handover"
            )
          }
          onClick={() => this._handleClickAssignBtn("unassignJobs")}
        >
          Unassign
        </Button>
      );
    }
  };
  _renderUncheckBtn = () => {
    const { selectedFilter } = this.state;
    if (selectedFilter === "assigned" || selectedFilter === "in progress") {
      return (
        <Button
          className="btn-unassign"
          onClick={() => this._handleClickAssignBtn("clearSelectedJob")}
          disabled={this.state.jobList.length < 1}
        >
          Uncheck All
        </Button>
      );
    }
  };
  //Handling Method
  _handleProceedConfirm = key => {
    const { jobList } = this.state;
    const { token } = this.props;
    let workOrderId = [];

    jobList.map(field => {
      if (field.WoId) workOrderId = [...workOrderId, field.WoId];
      return workOrderId;
    });
    switch (key) {
      case "unassignJob":
        this.props.unassignJobMechanic(workOrderId, token);
        this.setState({
          isShowUnassignConfirmationModal: false,
          isShowAssignSucceed:true
        });
        break;
      default:
        break;
    }
  };
  _handleClose = key => {
    const {
      isShowSelectMechanicsModal,
      isShowSelectLeaderModal,
      isShowAssignSucceed
    } = this.state;
    switch (key) {
      case "closeModalMechanic":
        return this.setState({
          isShowSelectMechanicsModal: !isShowSelectMechanicsModal,
          jobList: []
        });
      case "closeModalLeader":
        return this.setState({
          isShowSelectLeaderModal: !isShowSelectLeaderModal,
          mechanicList: []
        });
      case "closeModalSucceed":
        const { parameter } = this.state;
        const { token } = this.props;
        this.setState({
          isShowAssignSucceed: !isShowAssignSucceed,
          mechanicList: [],
          jobList: [],
          mechanicLeader: {}
        });
        return this.props.fetchListJobAssignment(parameter, token);
      case "closeModalUnassign":
        return this.setState({
          isShowUnassignConfirmationModal: false,
          jobList: []
        });
      default:
        break;
    }
  };
  _handleClickAssignBtn = key => {
    const { token } = this.props;
    switch (key) {
      case "assignJobs":
        this.props.fetchListofMechanic(token);
        return this.setState({
          isShowSelectMechanicsModal: true
        });
      case "unassignJobs":
        return this.setState({
          isShowUnassignConfirmationModal: true
        });

      case "clearSelectedJob":
        return this.setState({
          jobList: []
        });
      default:
        break;
    }
  };
  _searchParameter = (value) => {
    const {parameter} = this.state;
    this.setState({
      parameter:{
        ...parameter,
        SearchValue:value
      }
    })
  }
  updateParameter = (field, value) => {
    const { parameter } = this.state;

    switch (field) {
      case "job assignment":
        this.setState({
          parameter: {
            ...parameter,
            Query: {
              ...parameter.Query,
              PageNumber: 1,
              Filter: [
                {
                  Field: "WoStatus",
                  Operator: "eq",
                  value: "unassign",
                  Logic: "or"
                },
                {
                  Field: "WoStatus",
                  Operator: "eq",
                  value: "assigned",
                  Logic: "or"
                },
                {
                  Field: "WoStatus",
                  Operator: "eq",
                  value: "handover",
                  Logic: "or"
                },
                {
                  Field: "WoStatus",
                  Operator: "eq",
                  value: "wo release"
                }
              ]
            }
          },
          selectedFilter: "assigned"
        });
        break;
      case "job in progress":
        this.setState({
          parameter: {
            ...parameter,
            Query: {
              ...parameter.Query,
              PageNumber: 1,
              Filter: [
                {
                  Field: "WoStatus",
                  Operator: "eq",
                  Value: "in progress",
                  Logic:"or"
                }
              ]
            }
          },
          selectedFilter: "in progress"
        });
        break;
      case "job approval":
        this.setState({
          parameter: {
            ...parameter,
            Query: {
              ...parameter.Query,
              PageNumber: 1,
              Filter: [
                {
                  Field: "WoStatus",
                  Operator: "eq",
                  Value: "need approval"
                }
              ]
            }
          },
          selectedFilter: "need approval"
        });
        break;
      default:
        this.setState({
          parameter: {
            ...parameter,
            Query: {
              ...parameter.Query,
              [field]: value
            }
          }
        });
    }
  };
  _renderPagination = () => {
    const web = this.props.displayMode === "web";
    const nextPage = this.props.listJob.HasNextPage;
    const prevPage = this.props.listJob.HasPreviousPage;
    const PageNumber = this.props.listJob.PageNumber;
    const { TotalPages } = this.props.listJob;
    return (
      <div className="pagination">
        <div className="paging">
          {prevPage && (
            <div
              className="next-page"
              onClick={() => this.updateParameter("PageNumber", PageNumber - 1)}
            >
              <KeyboardArrowLeft className="arrow-icon" />
            </div>
          )}
          {web && PageNumber - 3 > 0 && (
            <div
              className="page-inactive"
              onClick={() => this.updateParameter("PageNumber", PageNumber - 3)}
            >
              {PageNumber - 3}
            </div>
          )}
          {web && PageNumber - 2 > 0 && (
            <div
              className="page-inactive"
              onClick={() => this.updateParameter("PageNumber", PageNumber - 2)}
            >
              {PageNumber - 2}
            </div>
          )}
          {PageNumber - 1 > 0 && (
            <div
              className="page-inactive"
              onClick={() => this.updateParameter("PageNumber", PageNumber - 1)}
            >
              {PageNumber - 1}
            </div>
          )}
          <div
            className="page-active"
            onClick={() => this.updateParameter("PageNumber", PageNumber)}
          >
            {PageNumber}
          </div>
          {PageNumber + 1 <= TotalPages && (
            <div
              className="page-inactive"
              onClick={() => this.updateParameter("PageNumber", PageNumber + 1)}
            >
              {PageNumber + 1}
            </div>
          )}
          {web && PageNumber + 2 < TotalPages && (
            <div
              className="page-inactive"
              onClick={() => this.updateParameter("PageNumber", PageNumber + 2)}
            >
              {PageNumber + 2}
            </div>
          )}
          {web && PageNumber + 3 < TotalPages && (
            <div
              className="page-inactive"
              onClick={() => this.updateParameter("PageNumber", PageNumber + 3)}
            >
              {PageNumber + 3}
            </div>
          )}
          {nextPage && (
            <div
              className="next-page"
              onClick={() => this.updateParameter("PageNumber", PageNumber + 1)}
            >
              <KeyboardArrowRight className="arrow-icon" />
            </div>
          )}
        </div>
      </div>
    );
  };
  render() {
    console.log('MODAL:',this.state)
    const { displayMode } = this.props;
    if (displayMode === "mobile") {
      return (
        <main className="content">
          {this._renderMenu()}
          {this._renderTitle()}
          {this._renderSummary()}
          <div className="line" />
          <div className="filters-container">
            <div className="search-container">
              <div className="search-bar">{this._renderSearchInput()}</div>
              <div
                className={
                  this.state.isFilterShow
                    ? "filter-icon-container-choosed"
                    : "filter-icon-container"
                }
              >
                <Button
                  onClick={() =>
                    this.setState({ isFilterShow: !this.state.isFilterShow })
                  }
                >
                  <img
                    className="filter-icon"
                    alt="icon-filter"
                    src={IconFilter}
                  />
                </Button>
              </div>
            </div>
            {this.state.isFilterShow && this._renderFilter()}
          </div>
            {this._renderJobList()}
          <div className="btn-column">
            {this._renderAssignBtn()}
            {this._renderUnassignBtn()}
            {this._renderUncheckBtn()}
          </div>
          {this._renderModals()}
          {this._renderModalLeader()}
        </main>
      );
    }
    if (displayMode === "tab") {
      return (
        <main className="content">
          {this._renderMenu()}
          {this._renderTitle()}
          {this._renderSummary()}
          <div className="line" />
          <div className="filters-container">
            <div className="search-container">
              {this._renderSearchInput()}
              <Button
                className="filter-btn"
                onClick={() =>
                  this.setState({ isFilterShow: !this.state.isFilterShow })
                }
              >
                <img
                  className="filter-icon"
                  alt="icon-filter"
                  src={IconFilter}
                />
              </Button>
            </div>
            {this.state.isFilterShow && this._renderFilter()}
          </div>
          <div className="table-container">
            {this._renderJobList()}
          </div>
          <div className="bottom-row">
            {this._renderAssignBtn()}
            {this._renderUnassignBtn()}
            {this._renderUncheckBtn()}
          </div>
          {this._renderModals()}
          {this._renderModalLeader()}
        </main>
      );
    }
    return (
      <main className="content">
        {this._renderLoadingScreen()}
        {this._renderMenu()}
        {this._renderTitle()}
        {this._renderSummary()}
        <div className="table-container">
          <div className="filters-container">{this._renderFilter()}</div>
          {this._renderJobList()}
        </div>
        <div className="bottom-row">
          {this._renderAssignBtn()}
          {this._renderUnassignBtn()}
          {this._renderUncheckBtn()}
          {this._renderPagination()}
        </div>
        {this._renderModals()}
        {this._renderModalLeader()}
        {this._renderModalSucceed()}
        {this._renderModalUnassign()}
      </main>
    );
  }
}
