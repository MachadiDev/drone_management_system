import './auxiliares.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { createAuxiliary } from '../../services/auxiliaries.service'
import type { Auxiliaries } from '../../types/auxiliaries'

export default function AuxiliariesCadastro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Auxiliaries>({
        id: 0,
        cpf: "",
        name: "",
        cnh: "",
        sarpas_number: "",
        isActive: true,
    });

    const handleCadastro = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createAuxiliary(formData);
            alert('Auxiliar cadastrado com sucesso!');
            navigate('/auxiliaries');
        } catch (error: any) {
            console.error('Error creating auxiliary:', error);
            alert(`Erro ao cadastrar auxiliar: ${error.message}`);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div className="container auxiliary-cadastro-container">
            <header className="form-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1>Register New Auxiliary</h1>
                <p>Add staff members to your drone operations team</p>
            </header>

            <div className="form-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={handleCadastro}>
                    <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter auxiliary's full name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cpf">CPF / Tax ID</label>
                            <input
                                type="text"
                                id="cpf"
                                name="cpf"
                                placeholder="000.000.000-00"
                                value={formData.cpf}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cnh">CNH / Driving License</label>
                            <input
                                type="text"
                                id="cnh"
                                name="cnh"
                                placeholder="License number"
                                value={formData.cnh}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sarpas_number">SARPAS Number</label>
                            <input
                                type="text"
                                id="sarpas_number"
                                name="sarpas_number"
                                placeholder="DECEA Sarpas ID"
                                value={formData.sarpas_number}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <Link to="/auxiliaries" className="btn btn-secondary">
                            Cancel
                        </Link>
                        <button type="submit" className="btn btn-primary">
                            Register Auxiliary
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
