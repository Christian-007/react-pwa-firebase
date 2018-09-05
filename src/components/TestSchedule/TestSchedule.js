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
      // this.setState({ schedules: snapshot.val() });
      // Object.values(snapshot.val()).map(daySlot => {
      //   console.log('starttime user: ' + daySlot.starttime);
        // Object.values(snapshot.val()[daySlot]).map(slot => {
        //   if (slot.calendars !== undefined) {
        //     console.log(slot.calendars['24July2018']); // if this is undefined, then there is no schedule for this slot
        //   }
        //   console.log(slot.calendars);
        // });
      // });
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
          </div>
        </div>
      </div>
    )
  }
}

export default TestSchedule;