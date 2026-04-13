import { useState, useEffect } from "react";
import type { Drone } from "../types/drone";
import { updateDrone } from "../services/drone.service";
import "./droneModal.css";

interface DroneModalProps {
    drone: Drone;
    isOpen: boolean;
    onClose: () => void;
    onUpdateSuccess?: (updatedDrone: Drone) => void;
}

export default function DroneModal({ drone, isOpen, onClose, onUpdateSuccess }: DroneModalProps) {
    const [formData, setFormData] = useState<Drone>(drone);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Update form data when props change
    useEffect(() => {
        setFormData(drone);
    }, [drone]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const updated = await updateDrone(formData);
            if (onUpdateSuccess) {
                onUpdateSuccess(updated);
            }
            onClose();
        } catch (err: any) {
            setError(err.message || "Erro ao atualizar drone.");
            console.error("Update error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Editar Drone</h2>
                    <p>Atualize as especificações e o status técnico do equipamento.</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="model">Modelo / Nome</label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand">Fabricante / Marca</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="registration_number">Número de Registro (ANATEL)</label>
                        <input
                            type="text"
                            id="registration_number"
                            name="registration_number"
                            value={formData.registration_number}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sisant_number">Número SISANT</label>
                        <input
                            type="text"
                            id="sisant_number"
                            name="sisant_number"
                            value={formData.sisant_number}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status Operacional</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="disponível">Disponível</option>
                            <option value="em operação">Em Operação</option>
                            <option value="em manutenção">Em Manutenção</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Tipo de Equipamento</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="pulverização">Pulverização</option>
                            <option value="imagem">Imagem</option>
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
