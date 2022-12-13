import { useSelector } from "react-redux"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { selectToken, selectUserInfo } from "../slices/user"
import { isManager } from "../utils"
import styled from "styled-components"
import { Button, Form, Input, message, Modal, Select } from "antd"
import { useEffect, useState } from "react"
import { useForm } from "antd/es/form/Form"
import axios from "axios"

export default function ManagerOrderControls(props) {
    const token = useSelector(selectToken)
    const { role } = useSelector(selectUserInfo) || {}
    const { order } = props
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [statuses, setStatuses] = useState([])
    const [form] = useForm()

    const manager = isManager(role)

    useEffect(() => {
        axios("/order-status", {
            headers: {
                authorization: `bearer ${token}`
            }
        }).then(({ data }) => {
            setStatuses(data)
        })
    }, [])

    const editOrder = async (e) => {
        setEditModalOpen(true)
    }

    const closeModal = (e) => {
        setEditModalOpen(false)
    }

    const updateOrder = async () => {
        const statusId = form.getFieldValue("status")

        try {
            await axios.put(
                `/order/${order.Id_order}/${statusId}`,
                {},
                {
                    headers: {
                        authorization: `bearer ${token}`
                    }
                }
            )

            message.success("Статус обновлен")

            const orders = (await axios("/orders")).data

            props.setOrders(orders)
        } catch (e) {
            message.error("Не удалось обновить статус")
        }
    }

    return manager ? (
        <Container>
            <EditOutlined onClick={editOrder} />
            <Modal
                open={editModalOpen}
                closable={true}
                onCancel={closeModal}
                footer={null}
            >
                <Form form={form}>
                    <Form.Item
                        name="status"
                        label="Статус"
                        rules={[{ required: true, message: "Заполните поле" }]}
                        style={{ marginTop: 20 }}
                    >
                        <Select>
                            {statuses.map((status) => (
                                <Select.Option value={status.Id_status}>
                                    {status.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Button onClick={updateOrder} type="primary">
                        Обновить
                    </Button>
                </Form>
            </Modal>
        </Container>
    ) : null
}

const Container = styled.div`
    top: 20px;
    right: 20px;
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
