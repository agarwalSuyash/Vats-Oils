import React from 'react'
import './Newsletter.css'

const Newsletter = () => {
    return (
        <section id='newsletter'>
            <div>
                <h4>Sign Up For Newsletters</h4>
                <p>Get E-mail updates about our latest shop and <span>special offers.</span></p>
            </div>
            <div className="form">
                <input type="text" placeholder='Your email address' />
                <button className='button'>Sign Up</button>
            </div>
        </section>
    )
}

export default Newsletter
