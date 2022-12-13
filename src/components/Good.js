import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { Typography, Button, message } from "antd"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addGoodAction, selectBasketGoods } from "../slices/basket"

export default function Good() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [good, setGood] = useState(null)
    const basketGoods = useSelector(selectBasketGoods)

    console.log(basketGoods, id)
    const inBasket = basketGoods.find((bgood) => bgood.id == id)

    useEffect(() => {
        axios(`/goods/${id}`)
            .then(({ data }) => {
                setGood({ ...data, id: data.Id_good })
            })
            .catch(() => {
                message.error("Не удалось загрузить товар")
            })
    }, [])

    const addGood = () => {
        dispatch(addGoodAction({ ...good, quantity: 1 }))
    }

    return good ? (
        <GoodContainer>
            <GoodBg image={good.image} />
            <Typography.Title level={2} style={{ position: "relative" }}>
                {good.type} - {good.company}
            </Typography.Title>
            <Typography.Text style={{ position: "relative" }}>
                {good.description}
            </Typography.Text>
            <InBasket>
                <Typography.Text strong>{good.price}₽</Typography.Text>
                <Button onClick={addGood} disabled={inBasket}>
                    В корзину
                </Button>
            </InBasket>
        </GoodContainer>
    ) : null
}

const GoodBg = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(${(props) => props.image});
    background-size: cover;
    opacity: 0.5;
`

const GoodContainer = styled.div`
    position: relative;
    padding: 20px;
    height: 100%;
`

const InBasket = styled.div`
    position: relative;
    margin-top: 15px;

    .ant-btn {
        margin-left: 20px;
    }
`
