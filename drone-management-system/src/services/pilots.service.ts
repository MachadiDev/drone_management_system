import api from "./api";
import type { Pilot } from "../types/pilot";

const API_URL = "http://127.0.0.1:8000";

export const getPilots = async (): Promise<Pilot[]> => {
    return await api<Pilot[]>(`${API_URL}/pilots`);
}

export const getPilotById = async (id: number): Promise<Pilot> => {
    return await api<Pilot>(`${API_URL}/pilots/${id}`);
}

export const createPilot = async (pilot: Pilot): Promise<Pilot> => {
    const response = await fetch(`${API_URL}/pilots`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pilot),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Falha ao criar piloto");
    }

    return await response.json();
}

export const updatePilot = async (pilot: Pilot): Promise<Pilot> => {
    const response = await fetch(`${API_URL}/pilots/${pilot.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pilot),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Falha ao atualizar piloto ${pilot.id}`);
    }

    return await response.json();
}

export const deactivatePilot = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/pilots/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Falha ao desativar piloto ${id}`);
    }
}   
