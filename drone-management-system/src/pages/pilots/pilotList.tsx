import './Pilot.css'
import { useState, useEffect } from 'react'
import { getPilots, deactivatePilot } from '../../services/pilots.service'
import type { Pilot } from '../../types/pilot'
import { Link } from 'react-router'

function PilotList() {
    const [pilots, setPilots] = useState<Pilot[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPilots = async () => {
            try {
                const data = await getPilots();
                setPilots(data);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch pilots');
            } finally {
                setLoading(false);
            }
        }
        fetchPilots();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja deletar este piloto?')) return;

        try {
            await deactivatePilot(id);
            setPilots(prevPilots => prevPilots.filter(pilot => pilot.id !== id));
        } catch (error: any) {
            console.error('Error deleting pilot:', error);
            alert(`Erro ao deletar piloto: ${error.message}`);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const filtered = pilots.filter(pilot =>
        pilot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pilot.cpf.includes(searchTerm)
    );

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading pilots...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>Error: {error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div className="container pilot-management">
            <header className="list-header">
                <div className="header-content">
                    <h1>Pilots Management</h1>
                    <p>Manage your authorized drone operators</p>
                </div>
                <Link to="/pilots/cadastro" className="btn btn-primary btn-add">
                    <span>+</span> New Pilot
                </Link>
            </header>

            <div className="search-section">
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by name or CPF..."
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button className="clear-search" onClick={() => setSearchTerm('')}>×</button>
                    )}
                </div>
                <div className="results-count">
                    {filtered.length} {filtered.length === 1 ? 'pilot' : 'pilots'} found
                </div>
            </div>

            <div className="table-responsive table-container">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CPF</th>
                            <th>Name</th>
                            <th>CNH</th>
                            <th>SARPAS</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length > 0 ? (
                            filtered.map((pilot) => (
                                <tr key={pilot.id}>
                                    <td className="id-col">#{pilot.id}</td>
                                    <td className="cpf-col">{pilot.cpf}</td>
                                    <td className="name-col">{pilot.name}</td>
                                    <td>{pilot.cnh}</td>
                                    <td>{pilot.sarpas_number}</td>
                                    <td className="actions-cell">
                                        <button className='btn btn-edit' title="Edit Pilot">Edit</button>
                                        <button className='btn btn-delete' onClick={() => handleDelete(pilot.id)} title="Delete Pilot">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="no-results">
                                    <p>No pilots match your search.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PilotList