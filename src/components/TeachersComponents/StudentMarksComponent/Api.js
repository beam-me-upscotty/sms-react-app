import {location, handleAPIError} from '../../../Api'

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

export const getAllExams = async()=> {
    console.log("searching")
    return fetch(`http://${location}/api/exam/`,{
        method: "GET",
        headers: getHeader()
    }).catch(err=>handleAPIError(err))
}

export const getAllStudents = async()=> {
    console.log("searching");
    return fetch(`http://${location}/api/student/`,{
        method: "GET",
        headers: getHeader()
    }).catch(err=>handleAPIError(err))
}


export const enterMarksForStudent = async(exam, student, marks)=> {
    console.log("searching");
    return fetch(`http://${location}/api/exam_marks/`,{
        method: "POST",
        headers: getHeader(),
        body: JSON.stringify({
            student: student.id,
            exam: exam.id,
            marks_scored: marks
        })
    }).catch(error=>handleAPIError(error))
}

export default { getAllExams, getAllStudents, enterMarksForStudent }