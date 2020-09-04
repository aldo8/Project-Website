import React from 'react';
import {Card,Input, TextField} from '@material-ui/core';
import './JobTimeIdentity.scss';
import { convertToLocale,convertDateTime } from 'utils/dateTime.helper';
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

export default class JobTimeIdentity extends React.PureComponent {
    render(){
        console.log('JOBTIME',this.props)
        const {jobTime,unitIdentity,jobTimeError} = this.props;
        return(
            <Card className="job-time-card">
                <div className="color-line" />
                <div className="job-card-content">
                <div className="job-card-title-row">
                    <p className="job-card-title">WAKTU PEKERJAAN</p>
                    {
                        unitIdentity.Status === 'need approval'
                        && (
                        <div onClick={() => this.props.handleSubmitJobTime()} className="job-card-badge-container">
                            <p className="job-card-badge">Simpan</p>
                        </div>
                        )
                    }
                </div>
                <div className='job-card-detail-container'>
                    <div className='job-card-detail-left'>
                        <p className='job-card-detail-label'>Down Time Start Date</p>
                        <p className='job-card-detail-text'>{jobTime.MalfStartTime ? convertToLocale(jobTime.MalfStartTime,true) : '-'}</p>
                        <p className='job-card-detail-label'>Down Time Start Hour</p>
                        <p className='job-card-detail-text'>{jobTime.MalfStartTime ? convertToLocale(jobTime.MalfStartTime,false) : '-'}</p>
                    </div>
                    <div className='job-card-detail-right'>
                        <div className='date-container'>
                            <p className='job-card-detail-label'>Down Time End Date</p>
                        </div>
                        {
                            unitIdentity.Status === 'need approval' ?
                                <KeyboardDatePicker
                                    format='yyyy-MM-dd'
                                    KeyboardButtonProps={{size:'small'}} 
                                    InputProps={{
                                        disableUnderline:true,
                                        classes: {
                                            root:'job-card-detail-text',
                                            }
                                        }} 
                                    value={jobTime.MalfEndTime ? convertToLocale(jobTime.MalfEndTime,true) : ''} 
                                    onChange={this.handleDateChange} 
                                />
                                :
                        <p className='job-card-detail-text'>{jobTime.MalfEndTime ? convertToLocale(jobTime.MalfEndTime,true) : '-'}</p>
                        }
                        <div className='date-container'>
                            <p className='job-card-detail-label'>Down Time End Hour</p>
                        </div>
                        {
                            unitIdentity.Status === 'need approval' ?
                                <KeyboardTimePicker
                                    ampm={false}
                                    KeyboardButtonProps={{size:'small'}} 
                                    InputProps={{
                                        disableUnderline:true,
                                        classes: {
                                            root:'job-card-detail-text'
                                            }
                                        }} 
                                    value={jobTime.MalfEndTime ? convertDateTime(jobTime.MalfEndTime,true) : '-'} 
                                    onChange={this.handleDateChange} 
                                />
                                :
                        <p className='job-card-detail-text'>{jobTime.MalfEndTime ? convertToLocale(jobTime.MalfEndTime,false) : '-'}</p>
                        }
                        </div>
                </div>
                <div className="job-card-detail-container">
                    <div className="job-card-detail-buttom">
                        <p className="job-card-detail-label">SMR</p>
                        {unitIdentity.Status !== 'need approval' ? 
                        <p className="job-card-detail-text"> {jobTime.SMR || '-'} </p>
                        :
                        <TextField FormHelperTextProps={{classes:{root:'helperText',error:'job-card-detail-error-input'}}} InputProps={{classes:{root:"job-card-detail-input"}}} value={jobTime.SMR} onChange={event => this.props.handleChangeJobTime('SMR',event)} error={jobTimeError.SMR} helperText={jobTimeError.SMR}/>

                        }
                        
                    </div>
                    <div className="job-card-detail-buttom">
                        <p className="job-card-detail-label">KM</p>
                        {unitIdentity.Status !== 'need approval' ? 
                        <p className="job-card-detail-text"> {jobTime.KM || '-'} </p>
                        :
                        <TextField FormHelperTextProps={{classes:{root:'helperText',error:'job-card-detail-error-input'}}} InputProps={{classes:{root:"job-card-detail-input"}}} value={jobTime.KM} onChange={event => this.props.handleChangeJobTime('KM',event)} error={jobTimeError.KM} helperText={jobTimeError.KM}/>
                        }
                    </div>
                    <div className="job-card-detail-buttom">
                        <p className="job-card-detail-label">HM Travel</p>
                        {unitIdentity.Status !== 'need approval' ? 
                        <p className="job-card-detail-text"> {jobTime.HM || '-'} </p>
                        :
                        <TextField FormHelperTextProps={{classes:{root:'helperText',error:'job-card-detail-error-input'}}} InputProps={{classes:{root:"job-card-detail-input"}}} value={jobTime.HM} onChange={event => this.props.handleChangeJobTime('HM',event)} error={jobTimeError.HM} helperText={jobTimeError.HM}/>
                        }
                    </div>
                    <div className="job-card-detail-buttom">
                        <p className="job-card-detail-label">Location</p>
                        {unitIdentity.Status !== 'need approval' ? 
                        <p className="job-card-detail-text"> {jobTime.Location || '-'} </p>
                        :
                        <Input className="job-card-detail-input" value={jobTime.Location} onChange={event => this.props.handleChangeJobTime('Location',event)}/>
                        }
                    </div>
                </div>
                </div>
            </Card>
        )
    }
}