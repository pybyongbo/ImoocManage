import React from "react";
import { Card, Table, message, Modal, Button } from "antd";
import axios from "./../../axios/index";
import Utils from './../../utils/util';
export default class BasicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource2: [],
            selectedRows: []
        }
    }
    params = {
        page: 1
    }
    componentDidMount() {
        const dataSource = [
            {
                id: '0',
                userName: 'Jack',
                sex: '0',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '1',
                userName: 'Tome',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            }
        ]

        this.setState({
            dataSource
        });
        this.request();
    }

    //动态获取mook数据方法
    request = () => {
        let _this = this;
        axios.ajax({
            url: '/table/list',
            method: 'get',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            console.log(res);
            if (res.code == 0) {
                this.setState({
                    dataSource2: res.result.list,
                    // selectedRows:null,
                    // selectedRowKeys:[]
                    pagination: Utils.pagination(res, (current) => {
                        //to-do
                        _this.params.page = current;
                        this.request();
                    })
                })
            } else {
                message.error(res.msg);
            }
        })
    }

    onRowClick = (record, index) => {
        let selectKey = [(index + 1)];
        let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
            '6': '骑行',
            '7': '桌球',
            '8': '麦霸',
        }
        Modal.info({
            title: '信息',
            content: `用户id:${record.id},
            用户名:${record.userName},
            用户爱好:${config[record.interest]}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })

    }
    //多选删除
    handleDelete = () => {

        let rows = this.state.selectedRows;
        console.log(this.state.selectedRows);
        let ids = [];
        if (rows.length > 0) {
            rows.map((item) => {
                ids.push(item.id);
            })
        } else {
            message.warning('请先选择你要删除的数据');
            return;
        }

        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗?id=${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功');
                this.request();
                this.setState({
                    selectedRows: null,
                    selectedRowKeys: []
                })

            }
        })

    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸',
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ]
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }

        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                let ids = [];
                selectedRows.map((item) => {
                    ids.push(item.id)
                })
                this.setState({
                    selectedRowKeys,
                    selectedRows,
                    selectedIds: ids
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">

                    <Table
                        rowKey="id"
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    >

                    </Table>

                </Card>

                <Card title="动态数据渲染表格--Mock">

                    <Table
                        rowKey="id"
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    >

                    </Table>

                </Card>

                <Card title="Mock-单选">
                    <Table
                        rowKey="id"
                        bordered
                        rowSelection={rowSelection}
                        onRow={
                            (record, index) => {
                                return {
                                    onClick: () => { this.onRowClick(record, index) },
                                }
                            }
                        }
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    >
                    </Table>
                </Card>

                <Card title="Mock-多选">
                    <div style={{ marginBottom: 20 }}>
                        <Button type="danger" onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        rowKey="id"
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    >
                    </Table>
                </Card>


                <Card title="Mock-表格分页">
                    <Table
                        rowKey="id"
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    >
                    </Table>
                </Card>
            </div>
        )
    }

}
