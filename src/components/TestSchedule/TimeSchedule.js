import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import classnames from 'classnames';

export default class TimeSchedule extends Component {
  render() {
    let isClicked = (this.props.selectedItem === this.props.index)
    return (
      <div className="col-xs-6 col-md-3" style={{marginBottom: 12}} key={this.props.index}>
        <button className={classnames("schedule-card", {"schedule-clicked": isClicked})} onClick={() => this.props.clickParent(this.props.index)}>
          <div className="time-wrapper">
            {isClicked ? 
              (<Ionicon icon="md-checkmark-circle" className="star-icon" fontSize="20px" color="green"/>)
              :
              ''
            }
            <div>
              <p className={classnames("time-text", { 'time-clicked': isClicked })}>
                {this.props.item.starttime} - {this.props.item.endtime}
              </p>
            </div>
          </div>
        </button>
      </div>
    )
  }
}