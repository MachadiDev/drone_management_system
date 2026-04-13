import './Drones.css'
import { useState, useEffect } from 'react'
import { getDrones, deactivateDrone } from '../../services/drone.service'
import type { Drone } from '../../types/drone'
import { Link } from 'react-router'
import DroneModal from '../../components/droneModal'

function DroneList() {
    const [drones, setDrones] = useState<Drone[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal state
    const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchDrones = async () => {
            try {
                const data = await getDrones();
                setDrones(data);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch drones');
            } finally {
                setLoading(false);
            }
        }
        fetchDrones();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja deletar este drone?')) return;

        try {
            await deactivateDrone(id);
            setDrones(prevDrones => prevDrones.filter(drone => drone.id !== id));
        } catch (error: any) {
            console.error('Error deleting drone:', error);
            alert(`Erro ao deletar drone: ${error.message}`);
        }
    }

    const handleEdit = (drone: Drone) => {
        setSelectedDrone(drone);
        setIsModalOpen(true);
    }

    const handleUpdateSuccess = (updatedDrone: Drone) => {
        setDrones(prev => prev.map(d => d.id === updatedDrone.id ? updatedDrone : d));
    }

    const filtered = drones.filter(drone =>
        drone.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drone.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drone.registration_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="container app-loading">
            <div className="spinner"></div>
            <p>Loading fleet...</p>
        </div>
    );

    if (error) return (
        <div className="container app-error">
            <p>Error: {error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry</button>
        </div>
    );

    return (
        <div className="container drone-management">
            <header className="list-header">
                <div className="header-content">
                    <h1>Drone Fleet</h1>
                    <p>Monitor status and technical details of all registered units</p>
                </div>
                <Link to="/drones/cadastro" className="btn btn-primary btn-add">
                    <span>+</span> New Drone
                </Link>
            </header>

            <div className="search-section">
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by model, brand or registration..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button className="clear-search" onClick={() => setSearchTerm('')}>×</button>
                    )}
                </div>
                <div className="results-count">
                    {filtered.length} {filtered.length === 1 ? 'drone' : 'drones'} found
                </div>
            </div>

            <div className="table-responsive table-container">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Drone Info</th>
                            <th>Registration</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length > 0 ? (
                            filtered.map((drone) => (
                                <tr key={drone.id}>
                                    <td className="id-col">#{drone.id}</td>
                                    <td>
                                        <div className="drone-info-cell">
                                            <span className="model-name">{drone.model}</span>
                                            <span className="brand-name">{drone.brand}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="reg-info">
                                            <code>{drone.registration_number}</code>
                                            <small>{drone.sisant_number}</small>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${drone.status.replace(/\s+/g, '-').toLowerCase()}`}>
                                            {drone.status}
                                        </span>
                                    </td>
                                    <td>{drone.type}</td>
                                    <td className="actions-cell">
                                        <button className='btn btn-edit' onClick={() => handleEdit(drone)}>Edit</button>
                                        <button className='btn btn-delete' onClick={() => handleDelete(drone.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="no-results">
                                    <p>No drones found matching your search.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedDrone && (
                <DroneModal
                    drone={selectedDrone}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </div>
    )
}

export default DroneList