import React, { useState, useEffect, Fragment } from "react";
import {
  getAcceptedDatesFromAlumini,
  getStudentDetail,
  isAuthenticated,
  sendDateRequest,
} from "./helper";
import Navbar from "./Navbar";

function Student() {
  const { user, token } = isAuthenticated();
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendButton, setsendButton] = useState(false);

  const [accepteddates, setAcceptedDates] = useState([]);

  //checking cuurent date with selected date
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  let currentDate = new Date();
  let CurrentDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  //checking the selected date available in selected dates of alumini
  const checkDates = () => {
    let givenSlotTime = window.slotTime;
    let givenSlotDate = window.slotDate;

    if(accepteddates.length!==0){
      let check= accepteddates.map((eachData, index) => {
        return eachData.acceptedDates.map((eachDate, i) => {
      
  
          if (
            Object.values(eachDate)[0][
              Object.keys(Object.values(eachDate)[0])
            ] === givenSlotTime &&
            Object.keys(Object.values(eachDate)[0])[0] === givenSlotDate
          ) {
            return true;
          } else {
            return false;
          }
        });
      });
      
  
      
      //  const isBelowThreshold = (currentValue) => currentValue ===true;
        
        let checkedDates = check.every((s)=>{
          
          return s[0]===true})


        
       return checkedDates
      
    }
    else{
      
      return false}

  };

  const loadallDetails = async () => {
    getAcceptedDatesFromAlumini(user._id, token)
      .then((data) => {
        if (data.error) {
          alert(data.error)
        } else {
          data.map((dates) => {
            setAcceptedDates([...accepteddates, dates]);
          });
        }
      })
      .catch((e) => alert(e));

    await getStudentDetail(user._id, token)
      .then((data) => {
        setStudent([...student, data]);
        if(data.slots&&data.AluminiId&&data._id){

          window.slot = data.slots;

          window.AluminiId = data.AluminiId;
          window.StudentId = data._id;
        }
       
      })
      .catch((e) => alert(e));
  };

  useEffect(() => {
    loadallDetails();

  }, []);

  //displyinng accepted details
  const accepted = () => {
    if (student.length !== 0) {
      if (student[0].acceptedDate.length !== 0) {
        return (
          <>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Student Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {student.length!==0 && student.map((eachData, index) => {
                  return (
                    <Fragment key={index}>
                      {eachData.acceptedDate.map((eachDate, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{Object.keys(eachDate)}</td>
                            <td> {Object.keys(Object.values(eachDate)[0])}</td>
                            <td>
                              {
                                Object.values(eachDate)[0][
                                  Object.keys(Object.values(eachDate)[0])
                                ]
                              }
                            </td>
                          </tr>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </>
        );
      }
      return <h2 className="btn btn-dark ml-2">No Accepted Dates</h2>;
    }
  };

//sending the dates 
  const onSend = async () => {
    setLoading(true)
    const b = new Date(`"${window.slotDate}"`),
      a = new Date(CurrentDate),
      difference = dateDiffInDays(a, b);

    if (difference <= 7) {
      alert("Select dates only that falls on next week from currentDate");
      setLoading(false)
    } else {
      
      if (checkDates() === true) {
        alert("Date and Time Already Selected");
        setLoading(false)
      }
      // if(result==""){}else{}
      else {

        if(window.slot >= 2){
          alert("Your slots Full");
          setLoading(false)
        }
        else{
          try {
            let PendingDate = {};
            PendingDate[window.slotDate] = window.slotTime;
            let sentReq = await sendDateRequest(
              user._id,
              PendingDate,
              window.AluminiId,
              window.StudentId,
              token
            );
            if(sentReq.message){
              alert(sentReq.message)
              window.location.reload()
            }
          else{alert(sentReq.error)
            setLoading(false)
            }
           
          } catch (e) {
            alert(e);
            setLoading(false)
          }
        }
       
      }
    }
  };

  //displaying pending dates
  const pending = () => {
    if (student.length !== 0) {
      if (student[0].pendingDate.length !== 0) {
        
        return (
          <>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Student Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {student.map((eachData, index) => {
                  return (
                    <Fragment key={index}>
                      {eachData.pendingDate.map((eachDate, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{Object.keys(eachDate)}</td>
                            <td> {Object.keys(Object.values(eachDate)[0])}</td>
                            <td>
                              {
                                Object.values(eachDate)[0][
                                  Object.keys(Object.values(eachDate)[0])
                                ]
                              }
                            </td>
                          </tr>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </>
        );
      }
      return <h2 className="btn btn-dark ml-2">No Pending Dates</h2>;
    }
  };

  const selectedSlotTime = (e) => {
    window.slotTime = e.target.value;
    setsendButton(true);
  };

  const selectedDate = (e) => {
    window.slotDate = e.target.value;
  };


  const sendDateReq = () => {
    return (
      <>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Student Name</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Send Request</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{user.name}</td>
              <td>
                <input type="date" required onChange={selectedDate} />
              </td>
              <td>
                {" "}
                <select
                  className="custom-select"
                  required
                  onChange={selectedSlotTime}
                >
                  <option defaultValue="Choose Slot Time">
                    Choose Slot Time
                  </option>
                  <option value="1pm-2pm">1pm-2pm</option>
                  <option value="4pm-5pm">4pm-5pm</option>
                  <option value="6pm-7pm">6pm-7pm</option>
                </select>
              </td>
              <td>
                {sendButton ? (
                  loading?( <div className="spinner-border text-primary" role="status"></div>):( <span
                    onClick={onSend}
                    className="btn btn-primary btn-s ml-3 w-15"
                  >
                    send
                  </span>)
                 
                ) : (
                  <span className="btn btn-warning btn-s ml-3 w-15">
                    select Time And Date{" "}
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };


  return (
    <div>
      <Navbar />
      <div className="ml-2 navbar-brand">
        <h1 className="btn btn-primary">Schedule_Slot</h1>
      </div>
      {sendDateReq()}
      <br />

      <div className="ml-2 navbar-brand">
        <h1 className="btn btn-primary">AcceptedDates</h1>
      </div>
      <br />
      {accepted()}
      <br />
      <div className="ml-2 navbar-brand">
        <h1 className="btn btn-primary">PendingDates</h1>
      </div>
      <br />
      {pending()}
      <br />
    </div>
  );
}

export default Student;
