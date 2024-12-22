import React from 'react'
import { Link } from 'react-router-dom';

function NoRouteFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 Not Found</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <Link to="/home">Go back to Home</Link>
        </div>
    )
}

export default NoRouteFound