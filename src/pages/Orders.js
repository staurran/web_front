import { Card, message, Typography } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import ManagerOrderControls from "../components/ManagerOrderControls"
import {useSelector} from "react-redux";
import {selectToken} from "../slices/user";

export default function Orders() {
    const token = useSelector(selectToken)
    const [orders, setOrders] = useState([
        {
            id_order: 14,
            Date: "912-06-2022",
            status: "Рассмотрение",
            Description: "",
            goods: []
        },
        {
            id_order: 15,
            Date: "912-06-2022",
            status: "Рассмотрение",
            goods: []
        }
    ])

    useEffect(() => {
        axios("/order", {
            headers: {
                Authorization: `bearer ${token}`
            }
        })
            .then(({ data }) => {
                setOrders(data)
                console.log(data)
            })
            .catch(() => {
                message.error("Не удалось получить заказы")
            })
    }, [])

    return (
        <Container>
            {orders.map((order) => (
                <Card
                    style={{ marginTop: 20 }}
                    key={order.id_order}
                    title={`${order.id_order} - ${order.status}`}
                    extra={
                        <ManagerOrderControls
                            order={order}
                            setOrders={setOrders}
                        />
                    }
                >
                    {order.goods.map((good) => (
                        <GoodContainer>
                            <Typography.Title>{good.type}</Typography.Title>
                            {good.quantity}
                        </GoodContainer>
                    ))}
                </Card>
            ))}
        </Container>
    )
}

const Container = styled.div`
    padding: 20px;
`

const GoodContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
