import React, { Component } from 'react';
import { database, auth } from '../../modules/firebase/firebase';
import moment from 'moment';
import { daysTable } from './LookupTableDays';
import './Style.css'
import TimeSchedule from './TimeSchedule';

class TestSchedule extends Component {
  state = {
    schedules: {},
    user: {},
    displayedSchedule: [],
    paginationData: [],
    isLastQuery: false,
    currentData: '',
  }

  componentDidMount() {
    database.ref('/teachers/t12345').once('value').then(snapshot => {
      console.log(snapshot.val());
    });

    // console.log('Moment day: ', moment().day());
    // console.log('Days table: ', daysTable[moment().day()]);
    database.ref().child('/testSchedules/t12345/'+daysTable[moment().day()]).once('value').then(snapshot => {
      let userSchedule = snapshot.val();
      console.log('user schedule: ', userSchedule);
      database.ref('/calendars/t12345/20180903').once('value').then(snapshot => {
        let calendarSchedule = snapshot.val();
        console.log('calendar schedule: ', calendarSchedule);
        userSchedule.map(item => {
          let scheduleItem = item;
          let isBooked = calendarSchedule.some(schedule => {
            return schedule.starttime === scheduleItem.starttime;
          });

          console.log('isBooked', isBooked);
          if (isBooked) {
            this.setState(prevState => {
              return {
                ...prevState,
                displayedSchedule:[
                  ...prevState.displayedSchedule,
                  {
                    starttime: scheduleItem.starttime,
                    endtime: scheduleItem.endtime,
                    booked: 'true'
                  }
                ]
              }
            }, () => {
              console.log(this.state.displayedSchedule);
            });
          } else {
            this.setState(prevState => {
              return {
                ...prevState,
                displayedSchedule:[
                  ...prevState.displayedSchedule,
                  {
                    starttime: scheduleItem.starttime,
                    endtime: scheduleItem.endtime,
                    booked: 'false'
                  }
                ]
              }
            }, () => {
              console.log(this.state.displayedSchedule);
            });
          }
        });
      });
    });
  }

  renderTime = () => {
    const scheduleObject = Object.values(this.state.schedules);
    console.log('scheduleObject', scheduleObject);

    const dateInt = moment().format("YYYYMMDD");
    
    return scheduleObject.map((item, index) => {
      if (item.calendars == undefined || item.calendars[dateInt] == undefined) // show available time
        return (<p key={index}>{item.starttime}</p>)
    })
  }

  clickParent = (itemIndex) => {
    this.setState({selectedItem: itemIndex }, () => {console.log(this.state)});
  }

  checkLastQuery = (arrayItems) => {
    let currentItem;
    if (arrayItems.length === 3) {
      currentItem = arrayItems.pop();
      this.setState(prevState => ({
        ...prevState,
        paginationData: [
          ...prevState.paginationData,
          ...arrayItems
        ],
        currentData: currentItem
      }), () => {
        console.log('this.state', this.state);
      });
    } else {
      console.log('last query!!!');
      currentItem = arrayItems[arrayItems.length-1];
      this.setState(prevState => ({
        ...prevState,
        paginationData: [
          ...prevState.paginationData,
          ...arrayItems
        ],
        currentData: currentItem,
        isLastQuery: true,
      }), () => {
        console.log('this.state', this.state);
      });
    }
  }

  renderTest = () => {
    database.ref('/testSchedules/t12345').orderByKey().limitToFirst(3).once('value').then(snapshot => {
      let itemKeys = Object.keys(snapshot.val());
      this.checkLastQuery(itemKeys);
      console.log('renderTest', itemKeys);
    });
  }

  renderAnotherTest = () => {
    database.ref('/testSchedules/t12345').orderByKey().limitToFirst(3).startAt(this.state.currentData).once('value').then(snapshot => {
      let itemKeys = Object.keys(snapshot.val());
      this.checkLastQuery(itemKeys);
    });
  }

  renderDisplay = () => {
    return this.state.paginationData.map((item,index) => {
      return (
        <div key={index}>
          <p>{item}</p>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="componentWrapper" id="testSchedule">
        <div className="container">
          <h1>Schedule Appointment</h1>
          <div className="schedule-wrapper">
            <h2>{daysTable[moment().day()] + ', ' + moment().format("D MMM YYYY")}</h2>
            <p>Available Time:</p>
            <div className="row">
              {this.state.displayedSchedule.map((item,index) => {
                return (
                  <TimeSchedule 
                    key={index}
                    clickParent={this.clickParent}
                    selectedItem={this.state.selectedItem}
                    index={index}
                    item={item} 
                  />
                )
              })}
            </div>
            {this.renderDisplay()}
            <button onClick={this.renderTest}>Test Pagination</button>
            {
              this.state.isLastQuery ?
              (
                <p>That's about it</p>
              )
              :
              (
                <button onClick={this.renderAnotherTest}>Load Another</button>
              )
            }
            
          </div>
        </div>
      </div>
    )
  }
}

export default TestSchedule;