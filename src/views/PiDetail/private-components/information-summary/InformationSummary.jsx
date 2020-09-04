/* eslint-disable no-fallthrough */
import React from 'react';
import { 
    ExpansionPanel, 
    ExpansionPanelDetails, 
    ExpansionPanelSummary, 
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { StagingGreen,PI,BES,ProblemLog,BMS} from 'assets/icons';
import './InformationSummary.scss';
import BacklogEntrySheetList from '../backlog-entry-sheet-list/BacklogEntrySheetList';
import ProblemLogList from 'views/ProblemLog/Approval/ProblemLogList';


export default class InformationSummary extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            isShowBacklog:false,
            isShowProblemLog:false,
        }
    }
    // Handle Click
    _handleClickIcon = (key) => {
        switch (key) {
            case 'ProblemLog':
                this.setState({
                    isShowBacklog:false,
                    isShowProblemLog:true,
                })
                break;
            case 'EntrySheet':
                this.setState({
                    isShowProblemLog:false,
                    isShowBacklog:true
                });
                this.props.onClickBacklogDetail(key)
                break;
            case 'MonitoringSheet':
                this.setState({
                    isShowBacklog:true,
                    isShowProblemLog:false,
                })
                this.props.onClickBacklogDetail(key)
                break;
            default:
            return null;
        }
    }
    _renderTitle = () => {
        return <p className='summary-info-title'>Information Summary</p>
    }
    _renderPI = () => {
        const {checksheetPi} = this.props;
        return (
            <div className='summary-info-item-container'>
                <div className='summary-info-item-container'>
                    <p className='summary-info-item-title'>Periodic Inspection</p>
                    <div className='summary-info-item'>
                        <div 
                            className='summary-info-item-icon-container'
                            onClick={this.props.onClickPiForm} 
                            
                        >
                            <img className='summary-info-item-icon' alt='PI Icon' src={PI}/>
                            {/* Condition if isExpanded is true */}
                            <img className='summary-info-item-icon-checked' alt='checked' src={StagingGreen}/>
                        </div>
                        <div className='summary-info-item-detail-container'>
                            <p>
                            <label className='green'>{`${checksheetPi.GoodCondition || 0} Item`}</label> In Good Condition
                            </p>
                            <p>
                            <label className='red'>{`${checksheetPi.BadCondition || 0} Item`}</label> In  Bad Condition
                            </p>
                            <p>
                            <label className='yellow'>{`${checksheetPi.UncheckCondition || 0} Item`}</label> In  Uncheck Condition
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _renderBES = () => {
        const {countBacklog} = this.props;
        return(
                <div className='summary-info-item-container'>
                    <p className='summary-info-item-title'>Backlog Entry Sheet</p>
                    <div className='summary-info-item'>
                    {/* Open table list backlog when onClick */}
                        <div 
                            className='summary-info-item-icon-container' 
                            onClick={() => this._handleClickIcon('EntrySheet') }
                        >
                            <img className='summary-info-item-icon' alt='BES Icon' src={BES}/>
                            {/* Condition if isExpanded is true */}
                            <img className='summary-info-item-icon-checked2' alt='checked' src={StagingGreen}/>
                        </div>
                        <div className='summary-info-item-detail-container'>
                            <p>
                                <label className='red'>{`${countBacklog.BacklogEntryPriority1 || 0} New`}</label> Priority 1 Backlog
                            </p>
                            <p>
                                <label className='yellow'>{`${countBacklog.BacklogEntryPriority2 || 0} New`}</label> Priority 2 Backlog
                            </p>
                            <p>
                                <label className='green'>{`${countBacklog.BacklogEntryPriority3 || 0} New`}</label> Priority 3 Backlog
                            </p>
                            <p>
                                <label className='grey'>{`${countBacklog.BacklogEntryPriority4 || 0} New`}</label> Priority 4 Backlog
                            </p>
                        </div>
                    </div>
                </div>
        )
    }
    _renderBMS = () => {
        const {countBacklog} = this.props;
        return(
            <div className='summary-info-item-container'>
                <p className='summary-info-item-title'>Backlog Monitoring Sheet</p>
                <div className='summary-info-item'>
                    <div 
                        className='summary-info-item-icon-container'
                        onClick={() => this._handleClickIcon('MonitoringSheet')}
                    >
                        <img className='summary-info-item-icon' alt='BMS Icon' src={BMS}/>
                        {/* Condition if isExpanded is true */}
                        <img className='summary-info-item-icon-checked3' alt='checked' src={StagingGreen}/>
                    </div>
                    <div className='summary-info-item-detail-container'>
                        <p>
                            <label className='green'>{countBacklog.BacklogMonitoringUpdate || 0} </label> Data Update
                        </p>
                    </div>
                </div>

            </div>
        )
    }

    _renderProblemLog = () => {
        const {countBySpv} = this.props;
        return(
            <div className='summary-info-item-container'>
                <p className='summary-info-item-title'>Problem Log</p>
                <div className='summary-info-item'>
                    <div 
                        className='summary-info-item-icon-container'
                        onClick={() => this._handleClickIcon('ProblemLog')}
                    >
                        <img className='summary-info-item-icon' alt='BMS Icon' src={ProblemLog}/>
                        {/* Condition if isExpanded is true */}
                        <img className='summary-info-item-icon-checked4' alt='checked' src={StagingGreen}/>
                    </div>
                    <div className='summary-info-item-detail-container'>
                        <p>
                            <label className='red'>{`${countBySpv && countBySpv.High ? countBySpv.High : 0 } New`}</label> High Impact
                        </p>
                        <p>
                            <label className='yellow'>{`${countBySpv && countBySpv.Medium ? countBySpv.Medium : 0} New`}</label> Medium Impact
                        </p>
                        <p>
                            <label className='green'>{`${countBySpv && countBySpv.Low ? countBySpv.Low : 0} New`}</label> Low Impact
                        </p>

                    </div>
                </div>

            </div>
        )
    }
    _renderPanelInfoSummary = () => {
        return (
            <ExpansionPanel defaultExpanded classes={{root:'summary-info-expand'}}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore className='expand-icon'/>}
                    classes={{
                        expanded:'summary-info-header-icon',
                        root:'summary-info-header-expanded',
                        content:'summary-info-header-expanded'
                    }}
                >
                {this._renderTitle()}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{root:'summary-info-expanded'}}>
                    <div className='summary-info-detail'>
                        {this._renderPI()}
                        {this._renderBES()}
                        {this._renderBMS()}
                        {this._renderProblemLog()}
                    </div>
                    {this._renderListTableBES()}
                    {this._renderListTableProblemLog()}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
    _renderListTableBES = () => {
        return (
            this.state.isShowBacklog && 
            <BacklogEntrySheetList
                {...this.props}
                updateParams={this.props.updateParameterBacklog}
                showBMS={this.state.isShowBms}
                showBES={this.state.isShowBes}
            />
        )
    }
    _renderListTableProblemLog = () => {
        console.log('LIDY',this.props)
        return (
            this.state.isShowProblemLog &&
            <ProblemLogList
                {...this.props}
                updateProblemLog={this.props.updateParameterProblem}
                listBySpv={this.props.listBySpv}
                onClick ={this.props.onClickProblemLog}
            />
                
        )
    }
    render(){
        console.log('KEN',this.props)
        console.log('SHIN',this.state)
        return(
            <div className='summary-info-container'>
                {this._renderPanelInfoSummary()}
            </div>
        )
    }
}