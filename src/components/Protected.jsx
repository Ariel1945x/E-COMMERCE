import { Outlet, Navigate } from "react-router-dom"

const Protected = () => {

    const data = localStorage.getItem("token")

    if(data){
        return <Outlet />
    } else {
        return <Navigate to={"/login"} />
    }
}

export default Protected