import React from 'react';
import {Card} from '@material-ui/core';
import './UnitIdentity.scss';
import {convertDateTime} from 'utils/dateTime.helper'

export default class UnitIdentity extends React.PureComponent {
    render(){
      const {unitIdentity} = this.props;
        return (
            <Card className="unit-card">
        <div className="color-line" />
        <div className="unit-card-content">
          <p className="unit-card-title">IDENTITAS UNIT</p>
          <div className="unit-card-detail-container">
            <div className="unit-card-detail-left">
              <p className="unit-card-detail-label">Unit Model</p>
              <p className="unit-card-detail-text">{unitIdentity.UnitModel ? unitIdentity.UnitModel : 'N/A'}</p>
              <p className="unit-card-detail-label">Unit Code</p>
              <p className="unit-card-detail-text">{unitIdentity.UnitCode ? unitIdentity.UnitCode : 'N/A'}</p>
              <p className="unit-card-detail-label">Unit Serial Number</p>
              <p className="unit-card-detail-text">{unitIdentity.UnitSerialNumber ? unitIdentity.UnitSerialNumber : 'N/A'}</p>
            </div>
            <div className="unit-card-detail-right">
              <p className="unit-card-detail-label">Engine Model</p>
              <p className="unit-card-detail-text">{unitIdentity.EngineModel ? unitIdentity.EngineModel : 'N/A'}</p>
              <p className="unit-card-detail-label">Engine Serial Number</p>
              <p className="unit-card-detail-text">{unitIdentity.EngineSerialNumber ? unitIdentity.EngineSerialNumber : 'N/A'}</p>
              <p className="unit-card-detail-label">{unitIdentity.SMRLastValueDate ? `SMR Pada ${convertDateTime(unitIdentity.SMRLastValueDate,true).format('dddd, DD MMM YYYY')}` : `SMR Pada` }</p>
              <p className="unit-card-detail-text">{unitIdentity.LastSMR ? unitIdentity.LastSMR : 0}</p>
            </div>
          </div>
        </div>
      </Card>
        )
    }
}