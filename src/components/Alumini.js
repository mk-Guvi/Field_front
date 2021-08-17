import React,{useState,useEffect,Fragment} from 'react'
import { AcceptDate, getAluminiDetail, isAuthenticated,RejectDate } from './helper'
import Navbar from './Navbar'

function Alumini() {
    const {user,token}=isAuthenticated()
    const [alumini,setAlumini]=useState([])
    const [loading,setLoading]=useState(false)

 

    const loadallDetailsSurvey=()=>{
        
    getAluminiDetail(user._id,token)
        .then((data) => {
          if (data.error) {
            console.log("err")
          } else {
              
          setAlumini([...alumini,data])
        
          
          }
        })
        .catch((e) => console.log(e))
      }



    useEffect(() => {
        loadallDetailsSurvey()
        // return () => {
        //     cleanup
        // }
    },[])
    
    
    const accepted=()=>{

        if(alumini.length!==0){
          if(alumini[0].acceptedDates.length!==0){
            return(
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
  
                  {     alumini.map((eachData,index)=>{
                    return(<Fragment key={index}>
                    
                    {eachData.acceptedDates.map((eachDate,i)=>{
                        
        
                        return(
                        <tr key={i}>
                          <th scope="row">{i+1}</th>
                        <td >{Object.keys(eachDate)}</td>
                        <td > {Object.keys(Object.values(eachDate)[0])}</td>
                        <td >{Object.values(eachDate)[0][Object.keys(Object.values(eachDate)[0])]}</td>
                        
            
                        </tr>
                        )
                        
                    })}
                    </Fragment>)
        
                })}
                  
            
                </tbody>
              </table>
              
        
</>
            )
                
        }
        return <h2 className="btn ml-2 btn-dark">No Accepted Dates</h2>
    }
        }
        
     const acceptedDate=async()=>{
setLoading(!loading)
await AcceptDate(user._id,token)
window.location.reload()
     }


     const rejectDate=async()=>{
       setLoading(!loading)
       
       await RejectDate(user._id,token)
        
    window.location.reload()
      





     }
    const pending=()=>{

      if(alumini.length!==0){
        if(alumini[0].pendingDates.length!==0){
          return(
       <>
      
              <table className="table">
              <thead className="thead-dark">
                <tr >
                  <th scope="col">S.No</th>
                  <th scope="col">Student Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Accept</th>
                  <th scope="col">Reject</th>

                </tr>
              </thead>
              <tbody>

                {     alumini.map((eachData,index)=>{
                  return(<Fragment key={index}>
                  
                  {eachData.pendingDates.map((eachDate,i)=>{
                      
      
                      return(
                      <tr key={i}>
                        <th scope="row">{i+1}</th>
                      <td >{Object.keys(eachDate)}</td>
                      <td > {Object.keys(Object.values(eachDate)[0])}</td>
                      <td >{Object.values(eachDate)[0][Object.keys(Object.values(eachDate)[0])]}</td>
                      <td >
                      {loading ? (
        <div className="spinner-border text-primary" role="status">
        
      </div>
        ) : (
           <span className="btn btn-primary" onClick={acceptedDate}>Accept</span>
        )}
                       </td>
                     <td >
                     {loading ? (
        <div className="spinner-border text-primary" role="status">
        
      </div>
        ) : (
          <span className="btn btn-danger" onClick={rejectDate}>Reject</span>
        )}
                    </td>
             
                      </tr>
                      )
                      
                  })}
                  </Fragment>)
      
              })}
                
          
              </tbody>
            </table>
            
      
</>
          )
              
      }
      return <h2 className="btn ml-2 btn-dark">No Pending Dates</h2>
  }
    }
    
    return (
        <div>
            <Navbar/>
            <div className="ml-2 navbar-brand"><h1 className="btn btn-primary">
  AcceptedDates 
</h1></div>
<br/>
        {accepted()}   
        <br/>
        <div className="ml-2 navbar-brand"><h1 className="btn btn-primary">
  PendingDates 
</h1></div>   
<br/>      
        {pending()}
        </div>
    )
}

export default Alumini
