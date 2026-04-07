import './homepage.css'
import { Link } from 'react-router'
import { useState } from 'react'

function Homepage() {


    return (
        <>
            <h1>Bem vindo HomePage</h1>
            <Link to="/drones">Ver Drones</Link>
        </>
    )
}

export default Homepage