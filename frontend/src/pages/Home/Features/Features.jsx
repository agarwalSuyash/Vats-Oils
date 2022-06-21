import React from 'react'
import { featureItems } from './featureData'
import './Features.css'
import styled from "styled-components";

const Line = styled.h4`
    padding: 9px 8px 6px 8px;
    list-style: 1;
    border-radius: 4px;
    font-size: 17px;
    color: #088178;
    display: inline-block;
    background-color: #${(props) => props.bg};
`

const Features = () => {
    return (
        <div id='feature'>
            {featureItems.map((item) => (
                <div className="fe-box" key={item.id}>
                    <img src={item.img} alt={item.desc} />
                    <Line bg={item.bg}>{item.desc}</Line>
                </div>
            ))}
        </div>
    )
}

export default Features
