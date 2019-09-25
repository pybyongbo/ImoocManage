import React from 'react';
import { Card, Button, Icon, Alert, notification } from 'antd';
import './ui.less';
export default class Loadings extends React.Component {
    openNotification = (type,direction) =>{

        if(direction) {
            notification.config({
                placement:direction
            })
        }
        notification[type]({
            message:'发工资啦~',
            description:'上个月考勤22天,迟到8天,实发工资8900,请笑纳!'
        })
    }
    render() {
     
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error')}>Error</Button>
                </Card>

                <Card title="通知提醒框位置控制" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success','topLeft')}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info','topRight')}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning','bottomLeft')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error','bottomRight')}>Error</Button>
                </Card>
            </div>
        )
    }
}