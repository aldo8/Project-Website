import React from 'react';
import {
    Card,
    CardContent
    } from '@material-ui/core';
import './JobsSummary.scss';


export default class JobsSummary extends React.Component {
    _renderUnassign = () => {
        return (
            <div className='todo'>
                <div className="column-title">
                    <p>Belum Ditugaskan</p>
                </div>
                    <p className='todo-total'>
                    {this.props.data.total < 10 ? `0${this.props.data.todo}` : this.props.data.todo}
                    </p>
            </div>
        )
    }
    _renderHandOver = () => {
        return(
            <div className='handover'>
                <div className='column-title'>
                    <p>Handover</p>
                </div>
                <p className='handover-total'>
                {this.props.data.handover < 10 ? `0${this.props.data.handover}`: this.props.data.handover}
                </p>
            </div>
        )
    }
    _renderTotal = () => {
        return (
            <div className='total'>
            <p className='card-content-title'>{this.props.data.title}</p>
            <p className='card-content-total'>{this.props.data.total === 0 ? '00' :this.props.data.total}</p>
            </div>
        );
    }
    _renderJobSummaryMobile = () => {
        return (
            <Card className='card-container'>
                <CardContent className='card-content'>
                    {this._renderTotal()}
                    <div className='vertical-line'/>
                    <div className="card-content-detail-col">
                    {this._renderUnassign()}
                    {this._renderHandOver()}
                    </div>
                </CardContent>
            </Card>
        )
    }
    render(){
        const {displayMode} = this.props;
        if(displayMode === 'mobile') {
            return (
                this._renderJobSummaryMobile()
            )
        }
        return(
            <Card className='card-container'>
                <CardContent className='card-content'>
                {this._renderTotal()}
                <div className="card-content-detail-row">
                {this._renderUnassign()}
                <div className="divider-container">
                <div className="vertical-line" />
                </div>
                {this._renderHandOver()}
                </div>
                </CardContent>
            </Card>
        )
    }
}