import React, { Fragment } from 'react'
import styled from 'styled-components'
import Banner from './Banner/Banner'
import Display from './Display/Display'
import Features from './Features/Features'
import Newsletter from './Newsletter/Newsletter'
import MetaData from '../../components/MetaData'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const BannerHeading = styled.h2`
    text-align: center;
    border-bottom: 1px solid rgba(21,21,21,0.5);
    width: 20vmax;
    padding: 1vmax;
    margin: 2vmax auto;
    color: rgba(0,0,0,0.7);
`

const Home = () => {
    return (
        <Fragment>
            <Navbar />
            <MetaData title="Online Shoppping Site: Vats Oils" />
            <Display />
            <Features />
            <BannerHeading>Our Range</BannerHeading>
            <Banner />
            <Newsletter />
            <Footer />
        </Fragment>
    )
}

export default Home
