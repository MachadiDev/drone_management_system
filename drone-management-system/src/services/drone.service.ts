import type { Drone } from "../types/drone";
import api from "./api";


const API_URL = "http://127.0.0.1:8000";

export const getDrones = async (): Promise<Drone[]> => {
    return await api<Drone[]>(`${API_URL}/drones`);
}

export const getDroneById = async (id: number): Promise<Drone> => {
    return await api<Drone>(`${API_URL}/drones/${id}`);
}

export const createDrone = async (drone: Drone): Promise<Drone> => {
    const response = await fetch(`${API_URL}/drones`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(drone),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Falha ao criar drone");
    }

    return await response.json();
}

export const updateDrone = async (drone: Drone): Promise<Drone> => {
    const response = await fetch(`${API_URL}/drones/${drone.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(drone),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Falha ao atualizar drone ${drone.id}`);
    }

    return await response.json();
}

export const deactivateDrone = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/drones/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Falha ao desativar drone ${id}`);
    }
}


