import './Drones.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { createDrone } from '../../services/drone.service'
import type { Drone } from '../../types/drone'

function DroneCadastro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Drone>({
        id: 0,
        model: "",
        brand: "",
        registration_number: "",
        sisant_number: "",
        status: "",
        type: "",
        isActive: true,
    });


    const handleCadastro = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createDrone(formData);
            alert('Drone cadastrado com sucesso!');
            navigate('/drones');
        } catch (error: any) {
            console.error('Error creating drone:', error);
            alert(`Erro ao cadastrar drone: ${error.message}`);
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
        <div className="container drone-cadastro-container">
            <header className="form-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1>New Drone Registration</h1>
                <p>Enter the technical details to add a new unit to the fleet</p>
            </header>

            <div className="form-card">
                <form onSubmit={handleCadastro}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="model">Model Name</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                placeholder="e.g. DJI Mavic 3"
                                value={formData.model}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="brand">Manufacturer / Brand</label>
                            <input
                                type="text"
                                id="brand"
                                name="brand"
                                placeholder="e.g. DJI"
                                value={formData.brand}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="registration_number">ANATEL / Registration</label>
                            <input
                                type="text"
                                id="registration_number"
                                name="registration_number"
                                placeholder="Registration number"
                                value={formData.registration_number}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sisant_number">SISANT Number</label>
                            <input
                                type="text"
                                id="sisant_number"
                                name="sisant_number"
                                placeholder="SISANT number"
                                value={formData.sisant_number}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Current Status</label>
                            <select
                                name="status"
                                id="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select status</option>
                                <option value="disponível">Disponível</option>
                                <option value="em operação">Em Operação</option>
                                <option value="em manutenção">Em Manutenção</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Equipment Type</label>
                            <select
                                name="type"
                                id="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select type</option>
                                <option value="pulverização">Pulverização</option>
                                <option value="imagem">Imagem</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-actions">
                        <Link to="/drones" className="btn btn-edit">
                            Cancel
                        </Link>
                        <button type="submit" className="btn btn-primary">
                            Register Drone
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DroneCadastro
