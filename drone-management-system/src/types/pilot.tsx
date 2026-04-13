export interface Pilot {
    id: number;
    cpf: string;
    name: string;
    cnh: string;
    sarpas_number: string;
    isActive: boolean;
}

export interface PilotListResponse {
    pilots: Pilot[];
    total: number;
}