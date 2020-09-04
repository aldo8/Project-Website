import React from 'react';
import { Button, Grid, CircularProgress,} from '@material-ui/core';
import './WorkCenter.scss';
import {Cards} from 'components'
import { MENU } from 'constants/menu';
import { Link } from 'react-router-dom';
import { KeyboardArrowRight } from '@material-ui/icons';

export default class WorkCenter extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isBtnFilter:false,
        }
    }
    _renderBreadCrumbs = () => {
        return(
            <div className='sub-app-bar'>
                <Link className='link' to={MENU.DASHBOARD}>Home</Link>
                <KeyboardArrowRight className='arrow-right'/>
                <p className='not-link'>{'Backlog Monitoring'}</p>
            </div>
        )
    }
    _renderButton = () => {
        return (
            <div className='header-rows'>
                <Button className='btn-filter'>
                    Backlog Achievement
                </Button>
                <Button className='btn-filter'>
                    Backlog Open
                </Button>
            </div>
        )
    }
    _renderCard = () => {
        const {achievementBms} = this.props;
        console.log('achievement',this.props)
        return(
            <Grid>
                {/* Mapping data work center */}
                {
                    achievementBms.map((achievement) => (
                        <Grid
                            item xs={12}
                            className='problemlog-container'
                        >
                        <Cards
                            achievement={achievement}
                            onClick={() => this.props.push(`${MENU.BACKLOG_MONITORING}${achievement.Code}`)}
                        />
                    </Grid>
                    ))
                }
            </Grid>
        )
    }
    _renderMode = () => {
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
    
    componentDidMount = () => {
        const {token} = this.props;
        this.props.fetchBmsAchievement(token);
    }
    render(){
        console.log('KLASDFKA',this.props)

        return(
            <>
            {this._renderLoadingScreen()}
            {this._renderBreadCrumbs()}
            <main className='content'>
                {/* Insert Loading here */}
                {this._renderButton()}
                {this._renderMode()}
            </main>
            </>
        )
    }
}
