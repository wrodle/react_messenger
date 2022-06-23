import React from 'react';
import {Form, Input} from "antd";
import {Block, Button} from "../../../components";
import {Link} from 'react-router-dom'
import {MailOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import '../../../pages/Auth/Auth.scss'

import {userActions} from '../../../redux/actions'

import { Formik } from 'formik';
import {useDispatch} from "react-redux";

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    return (
        <div>
            <Formik
                initialValues={{email: '', password: ''}}

                enableReinitialize={true}

                onSubmit={(values, {setSubmitting}) => {
                    userActions.fetchUserLogin(values)(dispatch).then((data) => {
                        if (data !== 'error') {
                            navigate("/im");
                        }
                        setSubmitting(false)
                    })
                }}
            >
                {(props) => {
                    const {
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isValid
                    } = props;

                    return (
                        <section className="auth">
                            <div className="auth__content">
                                <div className="auth__top">
                                    <h2>Войти в аккаунт</h2>
                                    <p>Пожалуйста, войдите всвой аккаунт</p>
                                </div>
                                <Block>
                                    <Form
                                        name="basic"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        autoComplete="off"
                                        onSubmit={handleSubmit}
                                    >
                                        <Form.Item
                                            name="EMail "
                                        >
                                            <Input
                                                id="email"
                                                size="large"
                                                placeholder="E-Mail"
                                                suffix={<MailOutlined/>}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                        >
                                            <Input.Password
                                                id="password"
                                                size="large"
                                                placeholder="Пароль"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                        >
                                            <Button disabled={isValid ? false : true} type="primary"
                                                    onClick={handleSubmit} size="large">
                                                Войти в аккаунт
                                            </Button>
                                        </Form.Item>
                                        <Link className="auth__register-link" to="/register">Зарегистрироваться</Link>
                                    </Form>
                                </Block>
                            </div>
                        </section>
                    );
                }}
            </Formik>
        </div>
    )
};

export default LoginForm;