import type { Auxiliaries } from "../types/auxiliaries";
import api from "./api";

const API_URL = "http://127.0.0.1:8000";

export const getAuxiliaries = async (): Promise<Auxiliaries[]> => {
    return await api<Auxiliaries[]>(`${API_URL}/auxiliaries`);
}

export const getAuxiliaryById = async (id: number): Promise<Auxiliaries> => {
    return await api<Auxiliaries>(`${API_URL}/auxiliaries/${id}`);
}

export const createAuxiliary = async (auxiliary: Auxiliaries): Promise<Auxiliaries> => {
    const response = await fetch(`${API_URL}/auxiliaries`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(auxiliary),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Falha ao criar auxiliar");
    }

    return await response.json();
}

export const updateAuxiliary = async (auxiliary: Auxiliaries): Promise<Auxiliaries> => {
    const response = await fetch(`${API_URL}/auxiliaries/${auxiliary.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(auxiliary),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Falha ao atualizar auxiliar ${auxiliary.id}`);
    }

    return await response.json();
}

export const deactivateAuxiliary = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/auxiliaries/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Falha ao desativar auxiliar ${id}`);
    }
}   