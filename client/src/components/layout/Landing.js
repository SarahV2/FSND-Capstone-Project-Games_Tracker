import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
//import '../../styles/Landing.css';

import { Link, Redirect } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Landing = () => {
    const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
    const userRole = user && user['http://demozero.net/roles'][0];
    const isAdmin = userRole === 'admin';

    console.log(isAuthenticated)
    if (!isLoading && isAuthenticated&&!isAdmin) {
        return <Redirect to='/games' />
    }

    else if(!isLoading && isAuthenticated&&isAdmin){
        return <Redirect to='/admin/games' />

    }
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Video Games Tracker</h1>
                    <p className="lead">
                        Keep track of the awesome games you play!
          </p>
                    <div className="login-link">
                        <Link to='/' onClick={() => loginWithRedirect()}>Login / Register</Link>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing