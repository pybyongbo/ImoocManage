import React from 'react';
import { Card, Button, Modal } from 'antd';
import './ui.less';
export default class Buttons extends React.Component {

    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,
    }
    handleOpen = (type) => {
        this.setState({
            [type]: true,
        })
    }
    handleConfirm = (type) => {
        Modal[type]({
            title: '确认',
            content: '你确定你学会了React码?',
            onOK() {
                console.log('ok');
            },
            onCancel() {
                console.log('cancel');
            }
        });
    }
    render() {
        return (
            <div>
                <Card title="静态模态框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>

                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
                </Card>

                <Modal
                    title="React高级教程"
                    visible={this.state.showModal1}
                    onCancel={() => {
                        this.setState({
                            showModal1: false
                        })
                    }}
                >
                    <p>欢迎学习慕课网最新推出的React高级教程</p>
                </Modal>

                <Modal
                    title="React高级教程"
                    visible={this.state.showModal2}
                    okText="好的"
                    cancelText="算了"
                    onCancel={() => {
                        this.setState({
                            showModal2: false
                        })
                    }}
                >
                    <p>Modal弹框自定义页脚设置</p>
                </Modal>

                <Modal
                    title="React高级教程"
                    style={{ top: 20 }}
                    visible={this.state.showModal3}
                    onCancel={() => {
                        this.setState({
                            showModal3: false
                        })
                    }}
                >
                    <p>Modal弹框自定义距离顶部20px</p>
                </Modal>

                <Modal
                    title="React高级教程"
                    wrapClassName="vertical-center-modal"
                    centered
                    visible={this.state.showModal4}
                    onCancel={() => {
                        this.setState({
                            showModal4: false
                        })
                    }}
                >
                    <p>Modal弹框水平垂直居中显示</p>
                </Modal>
            </div>
        )
    }
}