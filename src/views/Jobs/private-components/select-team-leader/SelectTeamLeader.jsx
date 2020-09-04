import React from 'react';
import {
    Button, 
    RadioGroup, 
    FormControlLabel, 
    Radio,
} from '@material-ui/core';
import {AssignLeader} from 'assets/images'
import {CloseButton} from 'components'
import { SelectedJobs } from '..';
import './SelectTeamLeader.scss';

export default class SelectTeamLeader extends React.PureComponent{
    _renderSelectedJobs = () => {
        return(
            <div className='assign-leader-left-pane'>
            <SelectedJobs 
            jobList={this.props.jobList || []}
            />
        </div>
        )
        
    }
    _renderTitle = () => {
        return (
            <div className='select-teamleader-header'>
                <img className='assign-leader-image' alt='assign leader icon' src={AssignLeader}/>
                <p className='assign-leader-title'>Penugasan Pekerjaan</p>
                <div className='assign-leader-underline'/>
            </div>
        )
    }
    _renderSelectLeader = () => {
        return(
            <div className='assign-leader-right-pane'>
            <div className='assign-leader-item-label'>Select Leader</div>
            <div className='assign-leader-item'>
                <RadioGroup aria-label='Gender' name='gender1'>
                    {
                        this.props.mechanicList.map((user,index) => {
                        const mechanicProfile = `${user.Username} - ${user.FirstName} ${user.LastName}`;
                        return (
                            <FormControlLabel
                                classes={{ root: 'assign-leader-list-item', label: 'assign-leader-list-item-label' }}
                                label={mechanicProfile}
                                onChange={() => this.props.onClick(user)}
                                key={index}
                                value={index.toString()}
                                control={<Radio size="small" classes={{ root: 'radio-checked', checked: 'radio-checked' }} />}
                        />
                        )
                        })
                    }
                </RadioGroup>
            </div>
        </div>
        )
    }
    _renderButton = () => {
        const {mechanicLeader}=this.props;
        return(
            <div className='buttons-row'>
                <Button 
                    classes={{ root: 'btn-cancel' }} 
                    onClick={this.props.onCancel}
                >
                Batal
                </Button>
                <Button 
                    disabled={Object.keys(mechanicLeader).length < 1} 
                    classes={{ root: 'btn-assign' }} 
                    onClick={() => this.props.onAssign()}
                >
                Tugaskan
                </Button>
            </div>
        )
    }
    _renderMobileView = () => {
        return (
            <>
            <CloseButton onClose={this.props.onCancel}/>
            <div className='assign-leader-col'>
                {this._renderTitle()}
                {this._renderSelectedJobs()}
                {this._renderSelectLeader()}
            </div>
            {this._renderButton()}
            </>
        )

    }
    render(){
        if (this.props.displayMode === 'mobile'){
            return (
                <div className='select-teamleader-modal'>
                    {this._renderMobileView()}
                </div>
            )
        }
        return(
            <div className='select-teamleader-modal'>
                <CloseButton onClose={this.props.onCancel}/>
                <div className='select-teamleader-info'>
                    {this._renderSelectedJobs()}
                    <div className='assign-leader-col'>
                    {this._renderTitle()}
                    {this._renderSelectLeader()}
                    </div>
                </div>
                {this._renderButton()}
            </div>
        )
    }
}