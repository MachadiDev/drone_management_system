import { Link, useLocation } from 'react-router';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="main-navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <span className="logo-icon">🛸</span>
                    <span className="logo-text">DroneManager</span>
                </Link>
                
                <div className="nav-links">
                    <Link to="/" className={isActive('/') ? 'active' : ''}>
                        Dashboard
                    </Link>
                    <Link to="/drones" className={isActive('/drones') ? 'active' : ''}>
                        Drones
                    </Link>
                    <Link to="/pilots" className={isActive('/pilots') ? 'active' : ''}>
                        Pilots
                    </Link>
                    <Link to="/auxiliaries" className={isActive('/auxiliaries') ? 'active' : ''}>
                        Auxiliaries
                    </Link>
                </div>

                <div className="nav-actions">
                    <Link to="/drones/cadastro" className="btn btn-primary nav-btn">
                        + New Drone
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
