import React from 'react';
import {TeamOutlined, FormOutlined, EllipsisOutlined} from "@ant-design/icons";
import {Button} from 'antd';
import {Status, ChatInput} from "../../components";
import { Dialogs, Messages } from '../../containers'
import './Home.scss';


const Home = () => (
    <section className="home">
        <div className="chat">
            <div className="chat__sidebar">
                <div className="chat__sidebar-header">
                    <div>
                        <TeamOutlined />
                        <span>Список диалогов</span>
                    </div>
                    <Button type="text" shape="circle" icon={<FormOutlined/>}/>
                </div>
                <div className="chat__sidebar-search">

                </div>
                <div className="chat__dialogs">
                    {<Dialogs
                    />}
                </div>
            </div>
            <div className="chat__dialog">
                <div className="chat__dialog-header">
                    <div></div>
                    <div className="chat__dialog-header-center">
                    </div>
                    <div></div>
                </div>
                    <Messages />
                <div className="chat__dialog-input">
                    <ChatInput />
                </div>
            </div>
        </div>
    </section>
)

export default Home;