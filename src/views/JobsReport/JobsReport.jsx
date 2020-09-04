import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel, 
    Tooltip,
    CircularProgress,
    // CircularProgress,
    // Button,
    // Card,
    // CardContent,
    } from "@material-ui/core";
import {
    DropdownComponent, 
    SearchInput,
    ConfirmationModal
    } from 'components'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import {Download} from 'assets/icons/'
import stylesReport from './JobsReport.module.scss';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { convertToLocale } from 'utils/dateTime.helper';
import moment from 'moment';

class JobsReportHeader extends React.Component {
    render(){
      return (
        <TableCell align="center" className={stylesReport["table-cell1"]}>
          <Tooltip
          title="Sort"
          placement="bottom-end"
          >
            <TableSortLabel
                active={this.props.isActive}
                IconComponent={this.props.isAscending ? KeyboardArrowUp : KeyboardArrowDown}
                onClick={this.props.onClick} 
            >
                {this.props.name}
          </TableSortLabel>
          </Tooltip>
        </TableCell>
      );
    }
  }

class JobsReport extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isFilterShow:false,
            isShowError:false,
            parameterReport:{
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
        };
    }

    // Component Life Cycle
    componentDidMount = () => {
        const {token} = this.props;
        const {parameterReport} = this.state;
        this.props.fetchJobReport(parameterReport,token);
    }
    componentDidUpdate = (prevProps,prevState) => {
      console.log('prevProps',prevProps)
      console.log('prevState',prevState)
        const { token } = this.props;
        const { parameterReport } = this.state;
        if (this.state.parameterReport !== prevState.parameterReport) {
          this.props.fetchJobReport(parameterReport, token);
        }
        if (prevProps.isLoading && !this.props.isLoading && this.props.downloadReportBacklog.status === 200){
            this._handleFileDownloadBacklog()
        }
        if (prevProps.isLoading && !this.props.isLoading && this.props.downloadReportProblemLog.status === 200){
          console.log('afasdf',this.props)
          this._handleFileDownloadProblemLog()
        } 
        if (prevProps.isLoading && !this.props.isLoading && this.props.downloadReportPI.status === 200){
          this._handleFileDownloadPI()
        }
      };

    // Handling function
    _handleFileDownloadBacklog = () => {
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      const todayDate = moment(new Date()).format('DD-MM-YYYY');
      let fileName =  "BackLog-"+this.unitCode+"-"+todayDate+".pdf";
      let blob = new Blob([this.props.downloadReportBacklog.data], { type: "application/pdf" }),
      url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    }
    _handleFileDownloadProblemLog = () => {
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      const todayDate = moment(new Date()).format('DD-MM-YYYY');
      let fileName =  "ProblemLog-"+this.unitCode+"-"+todayDate+".pdf";
      let blob = new Blob([this.props.downloadReportProblemLog.data], { type: "application/pdf" }),
      url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    }
    _handleFileDownloadPI = () => {
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      const todayDate = moment(new Date()).format('DD-MM-YYYY');
      let fileName =  "PeriodicInspection-"+this.unitCode+"-"+todayDate+".pdf";
      let blob = new Blob([this.props.downloadReportProblemLog.data], { type: "application/pdf" }),
      url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url); 
    }
    _updateParameter = (field,value) => {
        const {parameterReport} = this.state
        this.setState({
            parameterReport: {
              ...parameterReport,
              Query: {
                ...parameterReport.Query,
                [field]: value
              }
            }
          });
    }

    _selectFilter = (key, value) => {
      let { parameterReport, displayFilter } = this.state;
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
        parameterReport: {
          ...parameterReport,
          Query:{
            ...parameterReport.Query,
            Filter
          }
        },
        displayFilter
      });
    };
    _renderModalNotification = () => {
      return (
        <ConfirmationModal
          open={this.state.isShowError}
          onClose={() => this.setState({isShowError:false})}
          isSuccess={false}
          message={'Your job have No Backlog'}
        />
      )
    }
    _renderPagination = () => {
        const web = this.props.displayMode === "web";
        const nextPage = this.props.listOfJobReport.HasNextPage;
        const prevPage = this.props.listOfJobReport.HasPreviousPage;
        const PageNumber = this.props.listOfJobReport.PageNumber;
        const { TotalPages } = this.props.listOfJobReport;
        return (
          <div className={stylesReport["pagination"]}>
            <div className={stylesReport["paging"]}>
              {prevPage && (
                <div
                  className={stylesReport["next-page"]}
                  onClick={() => this._updateParameter("PageNumber", PageNumber - 1)}
                >
                  <KeyboardArrowLeft className={stylesReport["arrow-icon"]} />
                </div>
              )}
              {web && PageNumber - 3 > 0 && (
                <div
                  className={stylesReport["page-inactive"]}
                  onClick={() => this._updateParameter("PageNumber", PageNumber - 3)}
                >
                  {PageNumber - 3}
                </div>
              )}
              {web && PageNumber - 2 > 0 && (
                <div
                  className={stylesReport["page-inactive"]}
                  onClick={() => this._updateParameter("PageNumber", PageNumber - 2)}
                >
                  {PageNumber - 2}
                </div>
              )}
              {PageNumber - 1 > 0 && (
                <div
                  className={stylesReport["page-inactive"]}
                  onClick={() => this._updateParameter("PageNumber", PageNumber - 1)}
                >
                  {PageNumber - 1}
                </div>
              )}
              <div
                className={stylesReport["page-active"]}
                onClick={() => this._updateParameter("PageNumber", PageNumber)}
              >
                {PageNumber}
              </div>
              {PageNumber + 1 <= TotalPages && (
                <div
                  className={stylesReport["page-inactive"]}
                  onClick={() => this._updateParameter("PageNumber", PageNumber + 1)}
                >
                  {PageNumber + 1}
                </div>
              )}
              {web && PageNumber + 2 < TotalPages && (
                <div
                  className={stylesReport["page-inactive"]}
                  onClick={() => this._updateParameter("PageNumber", PageNumber + 2)}
                >
                  {PageNumber + 2}
                </div>
              )}
              {web && PageNumber + 3 < TotalPages && (
                <div
                  className={stylesReport["page-inactive"]}
                  onClick={() => this._updateParameter("PageNumber", PageNumber + 3)}
                >
                  {PageNumber + 3}
                </div>
              )}
              {nextPage && (
                <div
                  className={stylesReport["next-page"]}
                  onClick={() => this._updateParameter("PageNumber", PageNumber + 1)}
                >
                  <KeyboardArrowRight className={stylesReport["arrow-icon"]} />
                </div>
              )}
            </div>
          </div>
        );
      };
    
    _sortingData = (field) => {
        const { parameterReport } = this.state;
        let {Sort} = parameterReport.Query
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
          parameterReport: {
            ...parameterReport,
            Query:{
              ...parameterReport.Query,
              Sort:Sort
            }
          }
        })
        
    };

    _searchParameter = (value) => {
      const {parameterReport} = this.state;
    this.setState({
      parameterReport:{
        ...parameterReport,
        SearchValue:value
      }
    })
    }
    _handleDownloadReport = async (key,field) => {
      console.log('fieldReport:',key)
      this.unitCode = field.UnitCode
      const reportParameter = {
        WoId:field.Id,
        TimeZone:moment().format('Z')
      }
      const {token} = this.props;
      switch (key) {
        case 'backlog':                    
          await this.props.fetchReportBacklog(reportParameter,token)
          if(this.props.downloadReportBacklog !== 200){
            this.setState({isShowError:true})
          }
          break;
        case 'periodicInspection':
          this.props.fetchReportPI(reportParameter,token)
          break;
        case 'problemLog':
          this.props.fetchReportProblemLog(reportParameter,token)
          break;
        default:
          break;
      }
    }
    _
    // Render Component
    _renderSearchInput = () => {
        return (
            <SearchInput
                {...this.props}
                webInfo='Search by unit model or unit code'
                onSearch={this._searchParameter}
            />
        )
    }
    _renderFilter = () => {
      const { JobTypes, UnitModels, Customers } = this.props.listOfJobReport;
        return (
        <div className={stylesReport['dropdowns-container']}>
            <div className={stylesReport["dropdown-container"]}>
                <DropdownComponent
                  displayMode={this.props.displayMode}
                  data={JobTypes}
                  selected={this.state.displayFilter.JobType || ""}
                  onSelectAction={value => this._selectFilter("JobType", value)}
                />
            </div>
            <div className={stylesReport["dropdown-container"]}>
                <DropdownComponent
                  displayMode={this.props.displayMode}
                  data={UnitModels}
                  selected={this.state.displayFilter.UnitModel || ""}
                  onSelectAction={value => this._selectFilter("UnitModel", value)}
                />
            </div>
            <div className={stylesReport["dropdown-container"]}>
                <DropdownComponent
                  displayMode={this.props.displayMode}
                  data={Customers}
                  selected={this.state.displayFilter.Customer || ""}
                  onSelectAction={value => this._selectFilter("Customer", value)}
                />
            </div>
            {this.props.displayMode === "web" && (
                <div className={stylesReport["search-container"]}>
                {this._renderSearchInput()}
            </div>
            )}
        </div>
        )
    }
    _renderTitlePage = () => {
        return(
        <h1 className='title'>Reporting</h1>
        )
    }

    _renderJobReport = () => {
        const {Data} = this.props.listOfJobReport;
        return(
            <div className={stylesReport['jobs-report-list-container']}>
                <Table classes={{root:stylesReport['table1']}}>
                    <TableHead className={stylesReport['table-head1']} classes={{root:stylesReport['table-head1']}}>
                        <TableRow className={stylesReport['table-head-row1']}>
                            <TableCell align="center" className={stylesReport['padding-cell1']}/>
                            <JobsReportHeader
                                name="UNIT MODEL"
                                onClick={() => this._sortingData('UnitModel')}
                            />
                            <JobsReportHeader
                                name="UNIT CODE"
                                onClick={() => this._sortingData('UnitCode')}
                            />
                            <JobsReportHeader
                                name="JOB TYPE"
                                onClick={() => this._sortingData('JobType')}
                            />
                            <JobsReportHeader
                                name="WORK ORDER"
                                onClick={() => this._sortingData('WoNumber')}
                            />
                            <JobsReportHeader
                                name="CUSTOMER"
                                onClick={() => this._sortingData('CustomerName')}
                            />
                            <JobsReportHeader
                                name="DATE EXECUTION"
                                onClick={() => this._sortingData('PlanExecutionDate')}
                            />
                            <JobsReportHeader
                                name="DOWNLOAD"
                            />
                        </TableRow>
                    </TableHead>
                    <TableBody classes={{root:stylesReport['table-body1']}}>
                    {Data && Data.map((field,index) => (
                        <TableRow classes={{ root: stylesReport["table-row1"]}} key={index}>
                            <TableCell className={stylesReport["padding-cell1"] }/>
                            <TableCell align='center' className={stylesReport['table-cell1']}>{field.UnitModel}</TableCell>
                            <TableCell align='center' className={stylesReport['table-cell1']}>{field.UnitCode}</TableCell>
                            <TableCell align='center' className={stylesReport['table-cell1']}>{field.JobType}</TableCell>
                            <TableCell align='center' className={stylesReport['table-cell1']}>{field.WoNumber}</TableCell>
                            <TableCell align='center' className={stylesReport['table-cell1']}>{field.CustomerName}</TableCell>
                            <TableCell align='center' className={stylesReport['table-cell1']}>{convertToLocale(field.PlanExecutionDate,true)}</TableCell>
                            <TableCell align='center' className={stylesReport['download-cell']}>
                                <div className={stylesReport['download-button']} onClick={() => this._handleDownloadReport('periodicInspection',field)}>
                                    <img src={Download} alt='icon' className={stylesReport['download-icon']}/>
                                    {'PI Report'}
                                </div>
                                <div className={stylesReport['download-button']} onClick={() => this._handleDownloadReport('backlog',field)}>
                                    <img src={Download} alt='icon' className={stylesReport['download-icon']}/>
                                    {'Backlog Report'}
                                </div>
                                <div className={stylesReport['download-button']} onClick={() => this._handleDownloadReport('problemLog',field)}>
                                    <img src={Download} alt='icon' className={stylesReport['download-icon']}/>
                                    {'ProblemLog Report'}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        )

    }
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
    render(){
        console.log('REPORT PROPS',this.props)
        // display mode = 'Web'
        return(
            <main className={stylesReport['content']}>
                {this._renderLoadingScreen()}
                {this._renderTitlePage()}
                <div className={stylesReport['table-container']}>
                    <div className={stylesReport['filters-container']}>
                    {this._renderFilter()}
                    </div>
                    <div className={stylesReport['jobs-report-list-container']}>
                        {this._renderJobReport()}
                    </div>
                    <div className={stylesReport['bottom-row']}>
                    {this._renderPagination()}
                </div>
                {/* {this._renderModalNotification()} */}
                </div>
            </main>
        )
    }
    
    
}

export default JobsReport;