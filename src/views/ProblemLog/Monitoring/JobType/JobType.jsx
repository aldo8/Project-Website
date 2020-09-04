import React from 'react';
import { Link } from 'react-router-dom';
import {KeyboardArrowRight} from '@material-ui/icons';
import {Button, Grid, CircularProgress} from '@material-ui/core';
import { MENU } from 'constants/menu';
import CardProblemLog from 'components/CardProblemLog/CardProblemLog';
import styles from './JobType.module.scss';

export default class JobType extends React.PureComponent{
    constructor(props) {
        super(props)
    
        this.state = {
             isBtnFilter:false,
        }
    }
    
    _renderBreadCrumbs = () => {
        return (
            <div className='sub-app-bar'>
                <Link className='link' to={MENU.DASHBOARD}>Home</Link>
                <KeyboardArrowRight className='arrow-right'/>
                <Link className='link' to={MENU.PROBLEMLOG_MONITORING}>Work Center</Link>
                <KeyboardArrowRight className='arrow-right'/>
                <p className='not-link'>{'Job Type'}</p>
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
    _openListMonitoring = (field) => {
        const {workCenterCode} = this.props;
        this.props.push(`${MENU.PROBLEMLOG_MONITORING}/${workCenterCode}/${field.JobType}/list-monitoring`)
    }
    _renderCard = (key) => {
        const {listAchievement} = this.props;
        const titleCard = [
            "Problem Log Open",
            "High",
            "Medium",
            "Low",
            "Responsibility",
            "UT",
            "Customer",
            "Vendor"
        ]
        return(
            <Grid
                item={true}
                container 
                spacing={1}
            >
                {/* Mapping data work center */}
                <Grid
                    item xs={key}
                    className={styles['jobtype-problemlog-container']}
                >
                    {listAchievement && listAchievement.map((field) => (
                    <CardProblemLog
                        onClick={() => this._openListMonitoring(field)}
                        data={field}
                        title={field.JobType}
                        subTitle={titleCard}
                        leftValue={field.Ut}
                        midValue={field.Customer}
                        rightValue={field.Vendor}
                    />
                    ))}
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
        console.log('JOBBBB',this.props)
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