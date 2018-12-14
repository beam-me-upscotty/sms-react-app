import {location, handleAPIError} from '../../Api'

export function getHeader(){
    const h = new Headers();
    console.log('wow')
    h.append('Content-Type','application/json')
    const session = {
        username: localStorage.getItem('user'),
        token: localStorage.getItem('token')
    }

    if(session.username && session.token){
        h.append('Authorization','Token '+session.token);
    }else{
        window.location.reload()
    }
    console.log(h)
    return h;
}

export const getCurrentStudent = async()=> {
    console.log("searching")
    return fetch(`http://${location}/api/current_student/`,{
        method: "GET",
        headers: getHeader()
    }).catch(err=>handleAPIError(err))
}

export default { getCurrentStudent }