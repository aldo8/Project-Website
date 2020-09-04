import React from "react";
import { CloseButton } from "components";
import './BacklogJobsDetails.scss';
import { convertToLocale } from "utils/dateTime.helper";

export default class BacklogJobsDetails extends React.PureComponent {
  render() {
    console.log('xyz',this.props);
    const {detailBacklog} = this.props;
    return (
      <div className="backlog-detail-modal">
        <CloseButton onClose={this.props.onClick} />
        <div className="backlog-detail-header">
          <div className="backlog-detail-header-item">
            <p className="backlog-detail-header-item-label">Created Date</p>
            <p className="backlog-detail-header-item-value">{detailBacklog.MCreatedDate ? convertToLocale(detailBacklog.MCreatedDate,true) : '-' }</p>
          </div>
          <div className="backlog-detail-header-item">
            <p className="backlog-detail-header-item-label">Created By</p>
            <p className="backlog-detail-header-item-value">{detailBacklog.MCreatedBy ? detailBacklog.MCreatedBy : "-"}</p>
          </div>
          <div className="backlog-detail-header-item">
            <p className="backlog-detail-header-item-label">Approved By</p>
            <p className="backlog-detail-header-item-value">{detailBacklog.SupervisorApprovedBy ? detailBacklog.SupervisorApprovedBy :  "-"}</p>
          </div>
        </div>
        <div className="backlog-detail-table-header">
          <p className="backlog-detail-table-title-number">Part Number</p>
          <p className="backlog-detail-table-title-desc">Part Description</p>
          <p className="backlog-detail-table-title-qty">Qty</p>
        </div>
        <div className="backlog-detail-table-content">
          {/* Mapping data backlog by jobs  */}
          {
            detailBacklog.PartRequirements && detailBacklog.PartRequirements.map((field) => (
              <div className="backlog-detail-table-row">
            <p className="backlog-detail-table-cell-number">
              {field.PartNumber}
            </p>
            <p className="backlog-detail-table-cell-desc">
              {field.PartDescription}
            </p>
            <p className="backlog-detail-table-cell-qty">
            {field.Quantity}
            </p>
          </div>
            ))
          }
          
        </div>
        <div className="images-row">
        {detailBacklog.Images && detailBacklog.Images.map((index) => (
          <div className="img-container">
            <img className="img-tractor" alt="tractor 1" src={index}/>
          </div>
        ))}
          
        </div>
      </div>
    );
  }
}
