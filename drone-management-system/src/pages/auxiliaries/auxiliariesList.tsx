import './auxiliares.css'
import { useState, useEffect } from 'react'
import { getAuxiliaries, deactivateAuxiliary } from '../../services/auxiliaries.service'
import type { Auxiliaries } from '../../types/auxiliaries'
import { Link } from 'react-router'
import AuxiliaryModal from '../../components/auxiliaryModal'

export default function AuxiliariesList() {
    const [auxiliaries, setAuxiliaries] = useState<Auxiliaries[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal state
    const [selectedAuxiliary, setSelectedAuxiliary] = useState<Auxiliaries | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchAuxiliaries = async () => {
            try {
                const data = await getAuxiliaries();
                setAuxiliaries(data);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch auxiliaries');
            } finally {
                setLoading(false);
            }
        }
        fetchAuxiliaries();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja deletar este auxiliar?')) return;

        try {
            await deactivateAuxiliary(id);
            setAuxiliaries(prev => prev.filter(aux => aux.id !== id));
        } catch (error: any) {
            console.error('Error deleting auxiliary:', error);
            alert(`Erro ao deletar auxiliar: ${error.message}`);
        }
    }

    const handleEdit = (aux: Auxiliaries) => {
        setSelectedAuxiliary(aux);
        setIsModalOpen(true);
    }

    const handleUpdateSuccess = (updatedAux: Auxiliaries) => {
        setAuxiliaries(prev => prev.map(a => a.id === updatedAux.id ? updatedAux : a));
    }

    const filtered = auxiliaries.filter(aux =>
        aux.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aux.cpf.includes(searchTerm)
    );

    if (loading) return (
        <div className="container app-loading">
            <div className="spinner"></div>
            <p>Loading team members...</p>
        </div>
    );

    if (error) return (
        <div className="container app-error">
            <p>Error: {error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry</button>
        </div>
    );

    return (
        <div className="container auxiliaries-management">
            <header className="list-header">
                <div className="header-content">
                    <h1>Auxiliaries Management</h1>
                    <p>Manage your staff and operations helpers</p>
                </div>
                <Link to="/auxiliaries/cadastro" className="btn btn-primary btn-add">
                    <span>+</span> New Auxiliary
                </Link>
            </header>

            <div className="search-section">
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by name or CPF..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button className="clear-search" onClick={() => setSearchTerm('')}>×</button>
                    )}
                </div>
                <div className="results-count">
                    {filtered.length} {filtered.length === 1 ? 'member' : 'members'} found
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
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length > 0 ? (
                            filtered.map((aux) => (
                                <tr key={aux.id}>
                                    <td className="id-col">#{aux.id}</td>
                                    <td className="cpf-col">{aux.cpf}</td>
                                    <td className="name-col">{aux.name}</td>
                                    <td>{aux.cnh}</td>
                                    <td>{aux.sarpas_number}</td>
                                    <td className="actions-cell">
                                        <button className='btn btn-edit' onClick={() => handleEdit(aux)} title="Edit Member">Edit</button>
                                        <button className='btn btn-delete' onClick={() => handleDelete(aux.id)} title="Delete Member">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="no-results">
                                    <p>No auxiliary members found matching your search.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedAuxiliary && (
                <AuxiliaryModal
                    auxiliary={selectedAuxiliary}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </div>
    )
}
