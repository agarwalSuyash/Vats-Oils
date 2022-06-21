import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import './Banner.css'
import { bannerData } from './bannerData'

const Wrapper = styled.div`
    background-image: url(${(props) => props.url});
`
const Name = styled.h2`
color: ${(props) => props.bg};
`

const Banner = () => {
    const navigate = useNavigate();
    return (
        <section id='sm-banner' >
            {bannerData.map(item => (
                <Wrapper className="banner-box" url={item.img} key={item.id} onClick={() => { navigate(`/products`) }}>
                    <Name bg={item.bg}>{item.name}</Name>
                    <span>{item.desc}</span>
                    <button>Learn More</button>
                </Wrapper>))}
        </section>
    )
}

export default Banner
