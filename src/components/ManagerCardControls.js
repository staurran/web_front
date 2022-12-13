import { useSelector } from "react-redux"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { selectToken, selectUserInfo } from "../slices/user"
import { isManager } from "../utils"
import styled from "styled-components"
import { Button, Form, Input, message, Modal, Popconfirm } from "antd"
import { useState } from "react"
import { useForm } from "antd/es/form/Form"
import axios from "axios"

export default function ManagerCardControls(props) {
    const token = useSelector(selectToken)
    const { role } = useSelector(selectUserInfo) || {}
    const { good } = props
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [form] = useForm()

    const manager = isManager(role)

    const deleteGood = async (e) => {
        try {
            await axios.delete(`/goods/${good.id}`, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })

            message.success("Товар удален")
        } catch (e) {
            message.error("Товар не удалось удалить")
        } finally {
            const goods = (await axios("/goods")).data
            const newGoods = goods.map((good) => ({
                ...good,
                id: good.Id_good
            }))

            props.setGoods(newGoods)
            props.setSearchedGoods(newGoods)
        }
    }

    const editGood = async (e) => {
        setEditModalOpen(true)
    }

    const updateGood = async (e) => {
        console.log("update good", form.getFieldValue("price"), token)
        try {
            await axios.put(
                `/goods/${good.id}`,
                {
                    price: +form.getFieldValue("price")
                },
                {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }
            )

            message.success("Цена обновлена")
        } catch (e) {
            message.error("Цену не удалось обновить")
        }
    }

    const closeModal = (e) => {
        setEditModalOpen(false)
    }

    return manager ? (
        <Container>
            <EditOutlined onClick={editGood} />
            <Popconfirm
                onConfirm={deleteGood}
                title="Точно удалить?"
                okText="Да"
                cancelText={"Нет"}
            >
                <DeleteOutlined />
            </Popconfirm>
            <Modal
                open={editModalOpen}
                closable={true}
                onCancel={closeModal}
                footer={null}
            >
                <Form form={form}>
                    <Form.Item
                        name="price"
                        label="Цена"
                        rules={[{ required: true, message: "Заполните поле" }]}
                        style={{ marginTop: 20 }}
                    >
                        <Input />
                    </Form.Item>
                    <Button onClick={updateGood} type="primary">
                        Обновить
                    </Button>
                </Form>
            </Modal>
        </Container>
    ) : null
}

const Container = styled.div`
    top: 10px;
    right: 10px;
    position: absolute;
    display: flex;

    .anticon-edit {
        margin-right: 10px;
    }

    svg {
        width: 20px;
        height: 20px;
    }
`
