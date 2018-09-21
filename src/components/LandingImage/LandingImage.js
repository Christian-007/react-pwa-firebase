import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import './HomeStyling.css';
import { database } from '../../modules/firebase/firebase';

class Home extends Component {
  state = {
    schedules: {
      Monday: [
        {
          starttime: "09.00",
          endtime: "10.30"
        },
        {
          starttime: "12.00",
          endtime: "13.30"
        },
        {
          starttime: "14.00",
          endtime: "15.30"
        }
      ],
      Tuesday: [
        {
          starttime: "09.00",
          endtime: "10.30"
        },
        {
          starttime: "12.00",
          endtime: "13.30"
        }
      ],
      Wednesday: [
        {
          starttime: "09.00",
          endtime: "10.30"
        },
        {
          starttime: "12.00",
          endtime: "13.30"
        }
      ],
      Thursday: [
        {
          starttime: "09.00",
          endtime: "10.30"
        },
        {
          starttime: "12.00",
          endtime: "13.30"
        }
      ],
      Friday: [
        {
          starttime: "09.00",
          endtime: "10.30"
        },
        {
          starttime: "12.00",
          endtime: "13.30"
        }
      ],
      Saturday: [
        {
          starttime: "09.00",
          endtime: "10.30"
        },
        {
          starttime: "12.00",
          endtime: "13.30"
        }
      ]
    }
  }

  componentDidMount() {

    // window.dataLayer.push({
    //   'event': 'testPage'
    // });
    
    // Save to firebase db (with PUSH)
    // Object.keys(this.state.schedules).map(dayName => {
    //   console.log(dayName);
    //   for (let slot of this.state.schedules[dayName]) {
    //     console.log('array ', slot);
    //     database.ref().child('testSchedules/t12345/'+dayName).push(slot, (error) => {
    //       if (error) {
    //         console.log('error occurred', error);
    //       } else {
    //         console.log('success');
    //       }
    //     });
    //   }
    // });

    // Save schedules to firebase db (with SET)
    // database.ref().child('testSchedules/t12345').set(this.state.schedules, (error) => {
    //   if (error) {
    //     console.log('error occurred', error);
    //   } else {
    //     console.log('success');
    //   }
    // });
    
    // database.ref('/teachers/t12345').once('value').then(snapshot => {
    //   console.log(snapshot.val());
    // });

    // database.ref('/testSchedules/t12345').once('value').then(snapshot => {
    //   Object.keys(snapshot.val()).map(daySlot => {
    //     console.log(daySlot);
    //     Object.values(snapshot.val()[daySlot]).map(slot => {
    //       if (slot.calendars !== undefined) {
    //         console.log(slot.calendars['24July2018']); // if this is undefined, then there is no schedule for this slot
    //       }
    //       // console.log(slot.calendars);
    //     });
    //   });
    // });
  }

  render() {
    return (
      // <div>
      //   <img className="img-responsive" src={require("../../assets/images/Horizon-Zero-Dawn-review.jpg")} />
      // </div>
      <CSSTransition
      in
      classNames="fade"
      appear={true}
      timeout={1000}>
        <div className="bgImg">
        </div>
      </CSSTransition>
    )
  }
}

export default Home;
