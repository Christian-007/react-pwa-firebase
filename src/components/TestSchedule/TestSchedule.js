import React, { Component } from 'react';
import { database } from '../../modules/firebase/firebase';
import moment from 'moment';
import { daysTable } from './LookupTableDays';
import './Style.css'
import TimeSchedule from './TimeSchedule';
import _ from 'lodash';

class TestSchedule extends Component {
  state = {
    schedules: {},
    user: {},
    displayedSchedule: [],
    paginationData: [],
    isLastQuery: false,
    currentData: '',
  }

  /*componentDidMount() {
    database.ref('/teachers/t12345').once('value').then(snapshot => {
      console.log(snapshot.val());
    });

    const dayName = daysTable[moment().day()];
    database.ref().child('/testSchedules/t12345/'+dayName).once('value').then(snapshot => {
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
  }*/

  renderTime = () => {
    const scheduleObject = Object.values(this.state.schedules);
    console.log('scheduleObject', scheduleObject);

    const dateInt = moment().format("YYYYMMDD");
    
    return scheduleObject.map((item, index) => {
      if (item.calendars === undefined || item.calendars[dateInt] === undefined) { // show available time
        return (<p key={index}>{item.starttime}</p>)
      } else {
        return null;
      }
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

  firebaseQueryTest = () => {
    const rootRef = database.ref();

    // 1. Select a user by UID
    const oneRef = rootRef.child('teachers').child('t12345');
    oneRef.once('value').then(snapshot => {
      console.log('1. Select a user by UID: ', snapshot.val());
    });

    // 2a. Find a user by location
    const twoRef = rootRef.child('teachers').orderByChild('location').equalTo('Indonesia');
    twoRef.once('value').then(snapshot => {
      console.log('2a. Find a user by location: ', snapshot.val());
    });

    // 2b. Find a user by location
    const twoBRef = rootRef.child('teachers').orderByChild('subjects');
    twoBRef.once('value').then(snapshot => {
      console.log('2b. Find a user by subjects: ', snapshot.val());
    });

    // 3. LIMIT 10 User
    const threeRef = rootRef.child('teachers').limitToFirst(10);
    threeRef.once('value').then(snapshot => {
      console.log('3. LIMIT 10 User: ', snapshot.val());
    });

    // 4. Get all users names that start with 'C'
    const fourRef = rootRef.child('teachers').orderByChild('name').startAt('C').endAt('C\uf8ff');
    fourRef.once('value').then(snapshot => {
      console.log(`4. Get all users names that start with 'C':`, snapshot.val());
    });

    // 5. Get all users who live in Indonesia and name Christian Ing
    const fiveRef = rootRef.child('teachers').orderByChild('location_name').equalTo('Indonesia_Christian Ing');
    fiveRef.once('value').then(snapshot => {
      console.log('5. Get all users who live in Indonesia and name Christian Ing:', snapshot.val());
    });

    // Get all users with subjects of Math and English
    // this.getUsersByTags();

    const tagArray = ['Math', 'English'];
    this.loadTagsData(tagArray, this.loadUserData, (res) => {
      console.log('parallel done...');
      console.log(res);
    })
  }

  getUsersByTags = async () => {
    // const tagArray = ['Math', 'English'];
    // let resultArray = [], arrayKeys = [];
    
    // await Promise.all(tagArray.map(async (tag) => {
    //   const resulting = await this.loopTags(tag);
    //   resultArray.push(resulting);
    //   arrayKeys.push(Object.keys(resulting));
    // }));   
    
    // const unionArray =  _.union(_.flatten(arrayKeys));
    // this.getTeachersData(resultArray, unionArray);
  }

  // get data from '/teachers/{id}' based on '/tags/{tagName}' response
  loadUserData = (userId, callback) => {
    Promise.all(
      userId.map(id => {
        return database.ref().child('teachers').child(id).once('value')
        .then(snapshot => {
          return snapshot.val();
        })
      })
    ).then(r => callback(r));
  }

  // get data from '/tags/{tagName}'
  loadTagsData = (tagNames, detailLoader, callback) => {
    Promise.all(
      tagNames.map(tag => {
        return database.ref().child('tags').child('tag'+tag).once('value')
        .then(snap => {
          return Object.keys(snap.val());
        })
      })
    ).then(res => {
      const unionArray =  _.union(_.flatten(res));
      detailLoader(unionArray, response => {
        if (callback) callback(response);
      })      
    });
  }

  loopTags = (tag) => {
    let sixRef = database.ref().child('tags/tag'+tag);
    return new Promise(resolve => {
      sixRef.once('value').then(snapshot => {
        console.log(snapshot.val());
        resolve(snapshot.val());
      });  
    });
  }

  renderTest = () => {
    database.ref('/testSchedules/t12345').orderByKey().limitToFirst(3).once('value').then(snapshot => {
      let itemKeys = Object.keys(snapshot.val());
      this.checkLastQuery(itemKeys);
      console.log('renderTest', snapshot.val());
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
            <button onClick={this.firebaseQueryTest}>Test Query</button>
          </div>
        </div>
      </div>
    )
  }
}

export default TestSchedule;