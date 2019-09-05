import React from 'react';
import Child from './Child';
import { Button } from 'antd';
import './index.less'
// import 'antd/dist/antd.css'
export default class Life extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    // state = {
    //     count:0
    // }

    handClick() {
        this.setState({
            count: this.state.count - 1
        })
    }

    handAdd = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return <div className="content">
            <p>React生命周期介绍</p>
            <Button type="primary" block>text</Button>
            <button onClick={this.handAdd} style={{ marginRight: '20px' }}>加1</button>
            <button onClick={this.handClick.bind(this)}>减1</button>
            <p>{this.state.count}</p>
            <Child name={this.state.count}></Child>
        </div>
    }

}