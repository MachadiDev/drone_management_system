import './Drones.css'
import { useState, useEffect } from 'react'
import { getDrones, updateDrone, createDrone, deactivateDrone } from '../../services/drone.service'
import type { Drone } from '../../types/drone'
import { Link } from 'react-router'

function DroneList() {

    const [drones, setDrones] = useState<Drone[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <h1>Drone List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Model</th>
                        <th>Brand</th>
                        <th>Registration Number</th>
                        <th>SISANT Number</th>
                        <th>Status</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {drones.map((drone) => (
                        <tr key={drone.id}>
                            <td>{drone.id}</td>
                            <td>{drone.model}</td>
                            <td>{drone.brand}</td>
                            <td>{drone.registration_number}</td>
                            <td>{drone.sisant_number}</td>
                            <td>{drone.status}</td>
                            <td>{drone.type}</td>
                            <td><button className='btn-edit'>Edit</button></td>
                            <td><button className='btn-delete' onClick={() => handleDelete(drone.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/drones/cadastro">Cadastrar Drone</Link>

        </>
    )
}

export default DroneList