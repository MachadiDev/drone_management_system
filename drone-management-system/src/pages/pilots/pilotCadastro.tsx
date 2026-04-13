import './Pilot.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { createPilot } from '../../services/pilots.service'
import type { Pilot } from '../../types/pilot'

function PilotCadastro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Pilot>({
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
            await createPilot(formData);
            alert('Piloto cadastrado com sucesso!');
            navigate('/pilots');
        } catch (error: any) {
            console.error('Error creating pilot:', error);
            alert(`Erro ao cadastrar piloto: ${error.message}`);
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
        <div className="container pilot-cadastro-container">
            <header className="form-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1>Register New Pilot</h1>
                <p>Add authorized personnel to your drone operations team</p>
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
                                placeholder="Enter pilot's full name"
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
                        <Link to="/pilots" className="btn btn-edit">
                            Cancel
                        </Link>
                        <button type="submit" className="btn btn-primary">
                            Register Pilot
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PilotCadastro
