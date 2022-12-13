import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectToken } from "../slices/user"

export default function AuthCheck(props) {
    const token = useSelector(selectToken)
    console.log(token)

    return token ? props.children : <Navigate to="/auth" />
}
