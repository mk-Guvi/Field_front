import { API } from '../backend'

//user-its sent from frontend
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cors: true,
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json()
    })
    .catch((err) => console.log(err))
}

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cors: true,
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json()
    })
    .catch((err) => console.log(err))
}

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data))
    next()
  }
}
//next is just a method but we consider it as a middleware because it allwoes us to have a callback function which can perform any actions
export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt')
    next()
    return fetch(`${API}/signout`, {
      method: 'GET',
    })
      .then((res) => console.log('signout successful'))
      .catch((err) => console.log(err))
  }
}

export const isAuthenticated = () => {
  //if no jwt is found in window we return false
  if (typeof window === 'undefined') {
    return false
  }
  //if the jwt token is present in window then we directly dont return true rather we return jwt token itself and in frontend our component will again check it wether the jwt token is valid or not if valid returns true else returns false
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt')) //this will be considered as true as it has some values
  } else {
    return false
  }
}

export const isAlumini = () => {
  //if no jwt is found in window we return false
  if (typeof window === 'undefined') {
    return false
  }
  //if the jwt token is present in window then we directly dont return true rather we return jwt token itself and in frontend our component will again check it wether the jwt token is valid or not if valid returns true else returns false
  if (localStorage.getItem('jwt')) {
    if(JSON.parse(localStorage.getItem('jwt')).user.role===1){
      return true
    } //this will be considered as true as it has some values
  } else {
    return false
  }
}





export const AcceptDate=(userId,token)=>{
  return fetch(`${API}/alumini/acceptDate/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json(res)
    })
    .catch((e) => {console.log(e)})
}
export const RejectDate=(userId,token)=>{
  return fetch(`${API}/alumini/rejectDate/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json(res)
    })
    .catch((e) => {console.log(e)})
  
}

export const getAluminiDetail=(userId,token)=>{
  return fetch(`${API}/alumini/getDetails/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json(res)
    })
    .catch((e) => console.log(e))
}


export const getStudentDetail=(userId,token)=>{

 return fetch(`${API}/student/getDetails/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json(res)
    })
    .catch((e) => console.log(e))
}


export const sendDateRequest=(userId,pendingDate,AluminiId,studentId,token)=>{
 let reqBody={
    userId,
    pendingDate,
    AluminiId,
    studentId
  }
  
  return fetch(`${API}/student/sendDateRequest/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      cors:true
    },
    body: JSON.stringify(reqBody)

  })
    .then((res) => {
      return res.json(res)
    })
    .catch((e) => console.log(e))
  
}


export const getAcceptedDatesFromAlumini=(userId,token)=>{
  return fetch(`${API}/student/getSelectedDates/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json(res)
    })
    .catch((e) => console.log(e))

}