export const getHeader = () => {
    const h = new Headers();
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

export const location = 'localhost:8000';


export const getSubjects = async()=> {
    console.log("searching");
    return fetch(`http://${location}/api/teacher_subjects/`,{
        method: "GET",
        headers: getHeader()
    }).catch(error=>handleAPIError(error))
}

export const putExam = async( subjectId, courseId, departmentId, marks, yearOfStudy)=>{
    return fetch(`http://${location}/api/exam/`,{
        method: "POST",
        headers: getHeader(),
        body: JSON.stringify({
            subject: subjectId,
            course: courseId,
            department: departmentId,
            'total_marks': marks,
            'year_of_study': yearOfStudy
        })
    }).catch(error=>handleAPIError(error))
}

export const getAllSubjects = async()=>{
    return fetch(`http://${location}/api/subjects/`,{
        method: "GET",
        headers: getHeader(),
    }).catch(error=>handleAPIError(error))
}

export const addSubjectToTeacher = async( subjectId, userId)=>{
    return fetch(`http://${location}/api/add_subject_for_teacher/`,{
        method: "POST",
        headers: getHeader(),
        body: JSON.stringify({
            subject: subjectId,
            user:userId
        })
    }).catch(error=>handleAPIError(error))
}

export function handleAPIError(error){
    console.error(error)
}

export function handleAPIStatus(res){
    if(res.ok){
        console.log(res.json())
        if(res.status === 401){
            //authentication probem
            localStorage.clear();
            window.location.reload()
        }
        if(res.status === 404){
            return {
                message : "Couldnt find anything",
            }
        }
    }
    return {
        message : "ok"
    }
}


export default { getSubjects, putExam, getAllSubjects, addSubjectToTeacher, location, getHeader, handleAPIError, handleAPIStatus}