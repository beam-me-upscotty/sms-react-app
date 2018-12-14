import {location, handleAPIError} from '../../Api'

export const getHeader = () => {
    const h = new Headers();
    console.log('wow')
    h.append('Content-Type','application/json')
    const session = {
        username: localStorage.getItem('user'),
        token: localStorage.getItem('token')
    }

    if(session.username && session.token){
        console.log('wow')
        h.append('Authorization','Token '+session.token);
    }else{
        window.location.reload()
    }
    console.log(h)
    return h;
}


export const getChildren = async(parentUserId)=> {
    console.log("searching");
    return fetch(`http://${location}/api/parent/${parentUserId}/`,{
        method: "GET",
        headers: getHeader()
    }).catch(err=>handleAPIError(err))
}

export const loadMarksFor = async(studentId)=> {
    console.log("searching");
    return fetch(`http://${location}/api/exam_marks/${studentId}/`,{
        method: "GET",
        headers: getHeader()
    }).catch(err=>handleAPIError(err))
}


export const loadAttendanceFor = async(studentId)=> {
    console.log("searching");
    return fetch(`http://${location}/api/attendance/${studentId}/`,{
        method: "GET",
        headers: getHeader()
    }).catch(err=>handleAPIError(err))
}

export default { getChildren, loadMarksFor, loadAttendanceFor }