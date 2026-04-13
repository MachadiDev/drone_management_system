import './homepage.css'
import { Link } from 'react-router'
import { useState } from 'react'

function Homepage() {
    return (
        <div className="container homepage">
            <section className="hero">
                <h1>Drone Fleet Management</h1>
                <p>Welcome back. Monitor and manage your drone operations from one centralized dashboard.</p>
            </section>

            <div className="dashboard-grid">
                <Link to="/drones" className="dash-card">
                    <div className="card-content">
                        <div className="card-icon">🛸</div>
                        <div className="card-info">
                            <h2>Manage Drones</h2>
                            <p>Register, update and monitor your entire drone fleet status in real-time.</p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <span>View Fleet</span>
                        <span className="arrow">→</span>
                    </div>
                </Link>

                <Link to="/pilots" className="dash-card">
                    <div className="card-content">
                        <div className="card-icon">👨‍✈️</div>
                        <div className="card-info">
                            <h2>Manage Pilots</h2>
                            <p>Track authorized operators, flight hours, and documentation status.</p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <span>View Pilots</span>
                        <span className="arrow">→</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Homepage