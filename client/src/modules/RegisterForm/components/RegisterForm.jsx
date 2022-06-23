import React from 'react';
import {Form, Input} from "antd";
import {Block, Button} from "../../../components";
import {Link, useNavigate} from 'react-router-dom'
import {InfoCircleTwoTone, MailOutlined, UserOutlined} from "@ant-design/icons";
import {Formik} from "formik";

import {validateField} from "../../../utils/helpers";
import '../../../pages/Auth/Auth.scss'
import validateFunc from "../../../utils/validate";
import {userActions} from "../../../redux/actions";
import {useDispatch} from "react-redux";

const RegisterForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    return (
        <div>
            <Formik
                initialValues={{email: '', password: '', fullname: '', password_repeat: ''}}
                enableReinitialize={true}
                validate={values => {
                    const errors = {};
                    validateFunc({isAuth: false, values, errors})
                    console.log(errors)
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    userActions.fetchUserRegistration(values)(dispatch).then((data) => {
                        if (data !== 'error') {
                            navigate("/im");
                        }
                        setSubmitting(false)
                    })
                }}
            >
                {(props) => {
                    const {
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isValid
                    } = props;


                    const success = false
                    return (
                        <section className="auth">
                            <div className="auth__content">
                                <div className="auth__top">
                                    <h2>Регистрация</h2>
                                    <p>Для входа в чат, вам нужно зарегистрироваться</p>
                                </div>
                                <Block>
                                    {!success ?
                                        <Form
                                            name="basic"
                                            initialValues={{
                                                remember: true,
                                            }}
                                            autoComplete="off"
                                            onSubmit={handleSubmit}
                                        >

                                            <Form.Item
                                                name="EMail"
                                                validateStatus={validateField('email', touched, errors)}
                                                hasFeedback
                                                help={!touched.email ? "" : errors.email}
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
                                                name="name"
                                                validateStatus={validateField('fullname', touched, errors)}
                                                hasFeedback
                                                help={!touched.fullname ? "" : errors.fullname}
                                            >
                                                <Input
                                                    id="fullname"
                                                    size="large"
                                                    placeholder="Ваше имя"
                                                    uffix={<UserOutlined/>}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                name="pass"
                                                validateStatus={validateField('password', touched, errors)}
                                                hasFeedback
                                                help={!touched.password ? "" : errors.password}
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
                                                name="pass_repeat"
                                                validateStatus={validateField('password_repeat', touched, errors)}
                                                hasFeedback
                                                help={!touched.password_repeat ? "" : errors.password_repeat}
                                            >
                                                <Input.Password
                                                    id="password_repeat"
                                                    size="large"
                                                    placeholder="Повторить пароль"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                            >
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    size="large"
                                                    onClick={handleSubmit}
                                                    disabled={isValid ? false : true}
                                                >
                                                    Зарегистрироваться
                                                </Button>
                                            </Form.Item>

                                            <Link className="auth__register-link" to="/login">Войти в аккаунт</Link>
                                        </Form>
                                        :
                                        <div className="auth__success-block">
                                            <InfoCircleTwoTone style={{fontSize: '50px'}}/>
                                            <h2>Подтвердите свой аккаунт</h2>
                                            <p>На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.</p>
                                        </div>
                                    }
                                </Block>
                            </div>
                        </section>

                    );
                }}
            </Formik>
        </div>
    )
};

export default RegisterForm;