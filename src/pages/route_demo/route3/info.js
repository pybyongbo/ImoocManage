import React from 'react';
import { Link } from 'react-router-dom';
export default class Info extends React.Component {
    render() {
        return (
            <div>
                这里是设置动态路由功能;
                <br/>
                动态路由的值是:<strong>{this.props.match.params.value}</strong>
            </div>
        )
    }
}