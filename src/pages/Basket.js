import { Button, Card, message, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons"
import styled from "styled-components"
import {
    decQuantityAction,
    incQuantityAction,
    removeGoodAction,
    selectBasketGoods
} from "../slices/basket"
import { selectToken } from "../slices/user"
import axios from "axios"

export default function Basket() {
    const dispatch = useDispatch()
    const basketGoods = useSelector(selectBasketGoods)
    const token = useSelector(selectToken)
    const total = basketGoods.reduce(
        (prev, cur) => prev + cur.quantity * cur.price,
        0
    )

    const decQuantity = (id) => {
        dispatch(decQuantityAction(id))
    }

    const incQuantity = (id) => {
        dispatch(incQuantityAction(id))
    }

    const removeFromBasket = (id) => {
        dispatch(removeGoodAction(id))
    }

    const makeOrder = async () => {
        const payload = {"baskets": basketGoods.map((item) => ({
            id: item.id,
            quantity: item.quantity
        }))}

        try {
            await axios.post("/basket", payload, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })

            message.success("Заказ оформлен")
            localStorage.removeItem('basket')
        } catch (e) {
            message.error("Не получилось оформить заказ")
        }
    }

    return (
        <Container>
            <CardList>
                {basketGoods.map((good) => (
                    <Card
                        style={{ width: 240 }}
                        cover={<img src={good.image} />}
                        actions={[
                            <QuantityContainer>
                                <Button
                                    onClick={decQuantity.bind(null, good.id)}
                                >
                                    <MinusOutlined />
                                </Button>
                                <QuantityCount>{good.quantity}</QuantityCount>
                                <Button
                                    onClick={incQuantity.bind(null, good.id)}
                                >
                                    <PlusOutlined />
                                </Button>
                            </QuantityContainer>,
                            <Button
                                onClick={removeFromBasket.bind(null, good.id)}
                            >
                                <DeleteOutlined />
                            </Button>
                        ]}
                    >
                        <Card.Meta
                            title={good.type}
                            description={good.company}
                        />
                    </Card>
                ))}
            </CardList>
            <Typography.Text style={{ fontSize: 20 }}>
                К оплате: {total}₽
            </Typography.Text>
            <Button
                type="primary"
                disabled={!basketGoods.length}
                style={{ display: "block", marginTop: 20 }}
                onClick={makeOrder}
            >
                Оформить
            </Button>
        </Container>
    )
}

const QuantityContainer = styled.div`
    display: flex;
    align-items: center;
`

const QuantityCount = styled.div`
    margin-left: 5px;
    margin-right: 5px;
`

const Container = styled.div`
    padding: 20px;
`

const CardList = styled.div`
    margin-bottom: 20px;

    .ant-card-actions {
        justify-content: space-between;
    }

    .ant-card-actions li {
        width: auto !important;
    }
`
