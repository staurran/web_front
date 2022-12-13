import { Button, Form, Input, message } from "antd"
import { useForm } from "antd/es/form/Form"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setTokenAction, setUserInfoAction } from "../slices/user"

export default function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form] = useForm()

    const onFinish = () => {
        const { password, password_repeat } = form.getFieldsValue()

        if (password !== password_repeat) {
            message.error("Пароли не равны")
            return
        }

        axios
            .post("/api/register", form.getFieldsValue())
            .then(({ data }) => {
                const userInfo = {
                    username: form.getFieldValue("username"),
                    role: data.role
                }

                localStorage.setItem("token", data.token)
                localStorage.setItem("userInfo", JSON.stringify(userInfo))

                dispatch(setTokenAction(data.token))
                dispatch(setUserInfoAction(userInfo))
                message.success("Пользователь зарегистрирован")
                navigate("/")
            })
            .catch(() => {
                message.error("Не удалось зарегистрировать пользователя")
            })
    }

    const onFinishFailed = () => {}

    return (
        <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
        >
            <Form.Item
                label="Логин"
                name="username"
                rules={[{ required: true, message: "Заполните поле" }]}
            >
                <Input size="large" />
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[{ required: true, message: "Заполните поле" }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Повторите пароль"
                name="password_repeat"
                rules={[{ required: true, message: "Заполните поле" }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Зарегистрироваться
                </Button>
            </Form.Item>
        </Form>
    )
}
