import { message, Card, Row, Col, Input, Button } from "antd"
import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import ManagerCardControls from "../components/ManagerCardControls"
import { useSelector } from "react-redux"
import { selectToken } from "../slices/user"

export default function Home() {
    const [goods, setGoods] = useState([])
    const [searchedGoods, setSearchedGoods] = useState(goods)

    useEffect(() => {
        axios("/goods")
            .then(({ data }) => {
                const newGoods = data.map((good) => ({
                    ...good,
                    id: good.Id_good
                }))
                console.log("goods", data)
                setGoods(newGoods)
                setSearchedGoods(newGoods)
            })
            .catch(() => {
                message.error("Не удалось загрузить товары")
            })
    }, [])

    const search = (e) => {
        const value = e.target.value.trim()

        if (!value) {
            setSearchedGoods(goods)
            return
        }

        const filteredGoods = goods.filter((good) =>
            new RegExp(value, "i").test(good.type)
        )

        setSearchedGoods(filteredGoods)
    }

    return (
        <div>
            <StyledSearch onChange={search} />

            <CardList>
                {searchedGoods.map((good) => (
                    <Card
                        key={good.id}
                        extra={
                            <ManagerCardControls
                                good={good}
                                setGoods={setGoods}
                                setSearchedGoods={setSearchedGoods}
                            />
                        }
                        hoverable={true}
                        style={{ width: 240 }}
                        cover={<img src={good.image} />}
                    >
                        <Card.Meta
                            title={good.type}
                            description={good.company}
                        />
                        <NavLink to={`/goods/${good.id}`}>
                            <Button style={{ marginTop: 20 }}>Перейти</Button>
                        </NavLink>
                    </Card>
                ))}
            </CardList>
        </div>
    )
}

const StyledSearch = styled(Input.Search)`
    padding: 20px;

    input {
        height: 32px;
    }
`

const CardList = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`
