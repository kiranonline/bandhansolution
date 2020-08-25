import React from 'react';
import "./loader.less";
import { Typography } from "antd";

export default function EntryLoader() {
    return (
        <div className="entry-loader-container">
            <img src={require("../../static/loader.gif")} className="entry-loader-brand-logo" alt="entry-loader" />
            <Typography.Title level={4}>Loading...</Typography.Title>
        </div>
    )
}
