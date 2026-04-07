export interface Drone {
    id: number;
    model: string;
    brand: string;
    registration_number: string;
    sisant_number: string;
    status: string;
    type: string;
    isActive: boolean;
}

export interface DroneListResponse {
    drones: Drone[];
    total: number;
}
