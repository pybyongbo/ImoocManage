import React from 'react';
import { Card, Button, Icon, Tabs, message } from 'antd';
import './ui.less';
const { TabPane } = Tabs;
export default class Tabpans extends React.Component {
    newTabIndex=0;
    handlecallback = (key)=>{
        message.info("Hi,你选择了页签:"+key)
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    onChange = activeKey => {
        this.setState({ activeKey });
      };
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: `Content of new Tab ${activeKey}`, key: activeKey });
        this.setState({ panes, activeKey });
      };
    
      remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      };
    componentWillMount(){
        const panes = [
            {
                title:'Tab 1',
                content:'Tab 1的内容',
                key:'1'
            },
            {
                title:'Tab 2',
                content:'Tab 2的内容',
                key:'2'
            },
            {
                title:'Tab 3',
                content:'Tab 3的内容',
                key:'3'
            }
        ]
        this.setState({
            activeKey:panes[0].key,
            panes
        })
    }

    render() {
        return (
            <div>
                <Card title="Tab页标签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handlecallback}>
                        <TabPane tab="Tab 1" key="1">
                           欢迎学习React课程
                        </TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>
                            欢迎学习React课程
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                           React是一门非常受欢迎的mv*框架
                        </TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handlecallback}>
                        <TabPane tab={<span><Icon type="plus"/>Tab1</span>} key="1">
                           欢迎学习React课程
                        </TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab2</span>} key="2">
                            欢迎学习React课程
                        </TabPane>
                        <TabPane tab={<span><Icon type="delete"/>Tab3</span>} key="3">
                           React是一门非常受欢迎的mv*框架
                        </TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab带图的页签" className="card-wrap">
                     <Tabs 
                     defaultActiveKey="1"
                     onChange={this.onChange} 
                     type="editable-card"
                     onEdit={this.onEdit}
                     >
                         {
                             this.state.panes.map((panel)=>{
                                return <TabPane
                                    tab={panel.title}
                                    key={panel.key}
                                   
                                > {panel.content}</TabPane>
                             })
                         }
                     </Tabs>
                </Card>
            </div>
        )
    }

}