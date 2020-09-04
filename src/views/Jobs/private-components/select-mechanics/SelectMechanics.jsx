import React from 'react';
import {
    Button,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    CircularProgress
} from '@material-ui/core';
import {SelectedJobs} from '..';
import {CloseButton} from 'components';
import './SelectMechanics.scss';
import {
    MechanicPartner, 
    MechanicUt
    } from 'assets/images'


export default class SelectMechanics extends React.Component {
    constructor(props) {
    super(props);
        this.state={
            isSelectedJobShow:false,
            isMechanicUT:false,
            isMechanicPartner:false,
        };
    }

    _renderPrimaryText = (user) => {
        const nrp = user.Username || 'N/A';
        const nama = `${user.FirstName} ${user.LastName}` || 'N/A';
        return `${nrp} - ${nama}`;
    }

    _renderSecondaryText = (user) => {
        let info = 'Belum ditugaskan';
        if (user.Jobs & user.Jobs.length > 0 && user.Jobs.some((job) => job.jumlah !==0)){
            info = `Sudah ditugaskan ${user.Jobs.map((job) => (`${job.jumlah} ${job.jobType}`))}`;
        };
        return info;
    }
    _renderMechanicUT = () => {
        const {listMechanic} = this.props
        return (
            <div className="select-mechanic-ut-container">
                <img className='mechanic-ut-img' alt='mechanic ut' src={MechanicUt}/>
                {/* Translate Text */}
                <p className="select-mechanic-title">Pilih Mechanic UT</p>
                <div className="ut-underline" />
                <div className="mechanic-list-container">
                    <List>
                        {listMechanic.data && listMechanic.data.map((user,index) => {
                            if(user.MechanicUT){
                                return (
                                    <ListItem className='mechanic-list' key={index}>
                                        <Checkbox 
                                            classes={{root:'checkbox'}}
                                            onClick={() => this.props.onClick(user)} 
                                        />
                                        <ListItemText 
                                            primary={this._renderPrimaryText(user)}
                                            secondary={this._renderSecondaryText(user)}
                                            classes={{primary:'primary-label',secondary:'secondary-label'}}
                                        />
                                    </ListItem>
                                );
                            }
                            return null
                        })
                        }
                    </List>
                </div>
            </div>
        )
    }
    _renderMechanicPartner = () => {
        const {listMechanic} = this.props
        return (
            <div className="select-mechanic-partner-container">
                <img className='mechanic-partner-img' alt='Mechanic partner' src={MechanicPartner}/>
                {/* Translate Text */}
                <p className='select-mechanic-title'>Pilih Mechanic Partner</p>
                <div className='partner-underline'/>
                <div className='mechanic-list-container'>
                    <List>
                    {listMechanic.data && listMechanic.data.map((user) => {
                            if(user.MechanicUT === false){
                                return (
                        <ListItem className='mechanic-list'>
                            <Checkbox 
                                onClick={() => this.props.onClick(user)}
                                classes={{root:'checkbox'}}
                            />
                            <ListItemText 
                                primary={this._renderPrimaryText(user)}
                                secondary={this._renderSecondaryText(user)}
                                classes={{primary:'primary-label',secondary:'secondary-label'}}
                            />
                        </ListItem>
                                );
                            }
                            return null;
                        })
                    }

                    </List>
                </div>
            </div>
        )
    }
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
    _renderButton = () => {
        const isDisabled = this.props.mechanicList.length < 1;
        return (
            <div className='buttons-row'>
                <Button
                    className='btn-cancel'
                    onClick={this.props.onCancel}
                >
                {/* Translate Text */}
                    Batal
                </Button>
                <Button
                    className='btn-assign'
                    disabled={isDisabled}
                    onClick={this.props.onAssign}
                >
                {/* Translate Text */}
                    Tugaskan
                </Button>
            </div>
        )
    }

    // Render for responsive tablet
    _renderTabView = () => {
        return (
        <div className="assign-mechanic-modal">
            <CloseButton onClose={this.props.onCancel} />
            <div className='selected-jobs-segment'>
                <SelectedJobs jobList={this.props.jobList || []} />
            </div>
            <div className="assign-mechanic-container">
            {this._renderMechanicUT()}
            <div className="vertical-line" />
            {this._renderMechanicPartner()}
            </div>
            {this._renderButton()}
        </div>
        )
    }

    // Render for responsive mobile
    _renderMobileView = () => {
        return (
            <div className='assign-mechanic-modal'>
                <CloseButton
                    onClose={this.props.onCancel}
                />
                <div className="assignment-titles">
                    <div 
                        onClick={() => this.setState({ isMechanicPartner: false, isMechanicUT: false, isSelectedJobsShown: true })} 
                        className={this.state.isSelectedJobsShown ? 'assignment-title-choosen' : 'assignment-title'}
                    >
                        Selected Jobs
                    </div>
                    <div 
                        onClick={() => this.setState({ isMechanicPartner: false, isMechanicUT: true, isSelectedJobsShown: false })} 
                        className={this.state.isMechanicUT ? 'assignment-title-choosen' : 'assignment-title'}
                    >
                        Mechanic UT
                    </div>
                    <div 
                        onClick={() => this.setState({ isMechanicPartner: true, isMechanicUT: false, isSelectedJobsShown: false })} 
                        className={this.state.isMechanicPartner ? 'assignment-title-choosen' : 'assignment-title'}
                    >
                        Mechanic Partner
                    </div>
                </div>
                {/* Condition for render mechanic UT and mechanic Partner  */}
                <div className='selected-jobs-segment'>
                    <SelectedJobs jobList={this.props.jobList || []}/>
                </div>
                {this._renderButton()}
            </div>
        )
    }
    render(){
        const {displayMode} = this.props;
        if (displayMode === 'tab'){
            return(
            this._renderTabView()
            )
        }
        if (displayMode === 'mobile'){
            return(
            this._renderMobileView()
            )
        }
        return (
            <>
            {this._renderLoadingScreen()}
            <div className='assign-mechanic-modal'>
                <CloseButton
                    onClose={this.props.onCancel}
                />
                <div className='assign-mechanic-container'>
                    <div className='selected-jobs-segment'>
                        <SelectedJobs 
                            jobList={this.props.jobList || []}
                        />
                    </div>
                    <div className='left-segment'>
                        {this._renderMechanicUT()}
                    </div>
                    <div className='right-segment'>
                        {this._renderMechanicPartner()}
                    </div>
                </div>
                {this._renderButton()}
            </div>
            </>
        );
    }
}