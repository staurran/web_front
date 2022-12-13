import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectToken } from "../slices/user"
import { Segmented } from "antd"
import styled from "styled-components"
import { useState } from "react"
import Signin from "../components/Signin"
import Signup from "../components/Signup"

export default function Auth() {
    const token = useSelector(selectToken)
    const [isSignin, setIsSignin] = useState(false)

    const changeSegment = (value) => {
        if (value === "Вход") setIsSignin(true)
        else setIsSignin(false)
    }

    if (token) return <Navigate to="/" />

    return (
        <Container>
            <Segmented
                options={["Регистрация", "Вход"]}
                onChange={changeSegment}
            />
            <FormContainer>{isSignin ? <Signin /> : <Signup />}</FormContainer>
        </Container>
    )
}

const Container = styled.div`
    padding: 20px;

    .ant-segmented {
        margin-bottom: 30px;
    }
`

const FormContainer = styled.div`
    .ant-form-item-label {
        width: 150px;
        text-align: right;
    }

    .ant-btn {
        margin-left: 150px;
    }
`
