import { useState, useEffect } from "react";
import type { Auxiliaries } from "../types/auxiliaries";
import { updateAuxiliary } from "../services/auxiliaries.service";
import "./auxiliaryModal.css";

interface AuxiliaryModalProps {
    auxiliary: Auxiliaries;
    isOpen: boolean;
    onClose: () => void;
    onUpdateSuccess?: (updatedAuxiliary: Auxiliaries) => void;
}

export default function AuxiliaryModal({ auxiliary, isOpen, onClose, onUpdateSuccess }: AuxiliaryModalProps) {
    const [formData, setFormData] = useState<Auxiliaries>(auxiliary);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Update form data when props change
    useEffect(() => {
        setFormData(auxiliary);
    }, [auxiliary]);

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
            const updated = await updateAuxiliary(formData);
            if (onUpdateSuccess) {
                onUpdateSuccess(updated);
            }
            onClose();
        } catch (err: any) {
            setError(err.message || "Erro ao atualizar auxiliar.");
            console.error("Update error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Editar Auxiliar</h2>
                    <p>Atualize as informações do membro da equipe.</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nome Completo</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cnh">CNH</label>
                        <input
                            type="text"
                            id="cnh"
                            name="cnh"
                            value={formData.cnh}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sarpas_number">Número SARPAS</label>
                        <input
                            type="text"
                            id="sarpas_number"
                            name="sarpas_number"
                            value={formData.sarpas_number}
                            onChange={handleChange}
                            required
                        />
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
