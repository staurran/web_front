import { NavLink, useNavigate } from "react-router-dom"
import { Button, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import {
    selectToken,
    selectUserInfo,
    setTokenAction,
    setUserInfoAction
} from "../slices/user"
import styled from "styled-components"
import BasketIcon from "./BasketIcon"
import { selectBasketGoods } from "../slices/basket"

export default function Header() {
    const dispatch = useDispatch()
    const token = useSelector(selectToken)
    const userInfo = useSelector(selectUserInfo)
    const basketGoods = useSelector(selectBasketGoods)
    console.log(token, userInfo)

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userInfo")
        dispatch(setTokenAction(""))
        dispatch(setUserInfoAction({}))
    }

    return (
        <Container>
            {token ? (
                <>
                    <NavLink
                        style={{ marginRight: 10, color: "white" }}
                        to="/orders"
                    >
                        Заказы
                    </NavLink>
                    <NavLink to="/basket">
                        <BasketCounterWithIcon>
                            <BasketIcon />
                            {basketGoods.length}
                        </BasketCounterWithIcon>
                    </NavLink>
                    <NavLink to="/auth" onClick={logout}>
                        <Button>Выйти</Button>
                    </NavLink>
                    <Typography.Text>{userInfo.username}</Typography.Text>
                </>
            ) : (
                <>
                    <NavLink to="/auth">
                        <Button>Войти</Button>
                    </NavLink>
                </>
            )}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    svg {
        width: 30px;
    }

    .ant-typography {
        color: white;
        font-weight: bold;
        margin-left: 20px;
        font-size: 16px;
    }
`

const BasketCounterWithIcon = styled.div`
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 20px;
    cursor: pointer;
    color: red;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
    transition: 0.3s;

    svg {
        margin-right: 3px;
        transition: 0.3s;
        fill: red;
    }

    &:hover {
        background: red;
        color: white;

        svg {
            fill: white;
        }
    }
`
