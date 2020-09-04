import React from 'react';
import { Link } from 'react-router-dom';
import {KeyboardArrowRight} from '@material-ui/icons'
import { MENU } from 'constants/menu';
import { Button, Grid, CircularProgress } from '@material-ui/core';
import CardProblemLog from 'components/CardProblemLog/CardProblemLog';
import styles from './WorkCenterProblemLog.module.scss';

export default class WorkCenterProblemLog extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
             isBtnFilter:false
        }
    }
    componentDidMount = () => {
        const {token} = this.props;
        this.props.fetchWorkCenterPercentage(token)
    }
    _renderBreadCrumbs = () => {
        return (
            <div className='sub-app-bar'>
                <Link className='link' to={MENU.DASHBOARD}>Home</Link>
                <KeyboardArrowRight className='arrow-right'/>
                <p className='not-link'>{'Work Center'}</p>
            </div>
        )
    }
    _renderButton = () => {
        return(
            <div className='header-rows'>
                <Button
                    className={this.state.isBtnFilter ? 'btn-filter-active' : 'btn-filter'}
                >
                    Problemlog Achievement
                </Button>
                <Button
                    className={this.state.isBtnFilter ? 'btn-filter-active' : 'btn-filter'}
                >
                    Problemlog Open
                </Button>
            </div>
        )
    }
    _openJobType = (field) => {
        const {token} = this.props
        this.props.fetchAchievementPercentage(field.WorkCenterCode,token)
        this.props.push(`${MENU.PROBLEMLOG_MONITORING}/${field.WorkCenterCode}`)
    }
    _renderCard = (key) => {
        const {listWorkCenter} = this.props;
        const titleCard = [
            "Problem Log Open",
            "High",
            "Medium",
            "Low",
            "Problem Log Aging",
            "0-15(days)",
            "16-30(days)",
            "> 30 (days)"
        ]

        return (
            <Grid
                item={true}
                container 
                spacing={1}
            >
                    <Grid
                        item xs={key}
                        className={styles['workcenter-container']}
                    >
                        {
                            listWorkCenter && listWorkCenter.map((field) => (
                            <CardProblemLog
                            onClick={() => this._openJobType(field)}
                            data={field}
                            title={field.WorkCenterName}
                            subTitle={titleCard}
                            leftValue={field.Aging1}
                            midValue={field.Aging2}
                            rightValue={field.Aging3}
                            />
                            ))
                        }
                    </Grid>
            </Grid>
        )
    }
    
    renderMode = () => {
        switch (this.props.displayMode) {
            case 'tab':
                return this._renderCard('6');
            case 'mobile':
                return this._renderCard('12');
            default:
                return this._renderCard('4');
        }
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
    render(){
        console.log('workcetner',this.props)
        return(
            <>
            {this._renderBreadCrumbs()}
            <div className='content'>
                {this._renderLoadingScreen()}
                {this._renderButton()}
                {this.renderMode()}
            </div>
            </>
        )
    }
}