import React from 'react';
import { Link } from 'react-router-dom';
import { MENU } from 'constants/menu';
import { Grid, Button, CircularProgress, } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import { Cards } from 'components';
import './UnitModel.scss';

export default class UnitModel extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            isBtnFilter:false,
        }
    }
    _renderBreadCrumbs = () => {
        const {workCenter} = this.props
        return(
            <div className='sub-app-bar'>
                <Link className='link' to={MENU.DASHBOARD}>Home</Link>
                <KeyboardArrowRight className='arrow-right'/>
                <Link className='link' to={MENU.BACKLOG_MONITORING}>Backlog Monitoring</Link>
                <KeyboardArrowRight className='arrow-right'/>
                <p className='not-link'>{workCenter}</p>
            </div>
        )
    }
    _renderButton =()=> {
        return (
            <div className='header-rows'>
                <Button
                    className={this.state.isBtnFilter ? 'btn-filter-active' : 'btn-filter'}
                >
                    Backlog Achievement
                </Button>
                <Button
                    className={this.state.isBtnFilter ? 'btn-filter-active' : 'btn-filter'}
                >
                    Backlog Open
                </Button>
            </div>
        )
    }
    _renderMode = () => {
        switch (this.props.displayMode) {
            case 'tab':
                return this._renderCardUnitModel(6);
            case 'mobile':
                return this._renderCardUnitModel(12);
            default:
                return this._renderCardUnitModel(4);
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
    _renderCardUnitModel = (key) => {
        const {unitModelAchievement,workCenter} = this.props;
        console.log('key',this.props)
        return (

            <Grid container>
            {/* Data mapping here */}
            {
                unitModelAchievement.map((achievement) => (
                    <Grid
                    xs={key}
                    className='problemlog-container'
                    >
                    <Cards
                        achievement={achievement}
                        onClick={() => this.props.push(`${MENU.BACKLOG_MONITORING}${workCenter}/${achievement.Code}`)}
                    />
                    </Grid>
            ))
            }
            </Grid>
        )
    }
    componentDidMount = () => {
        const {workCenter,token} = this.props;
        this.props.fetchAchievementWorkCenter(workCenter,token)
    }
   render(){
       return(
        <div className="animated fadeIn">
            {this._renderLoadingScreen()}
           {this._renderBreadCrumbs()}
           <div className='content'>
               {this._renderButton()}
               {this._renderMode()}
            </div>
        </div>
       )
   }
}