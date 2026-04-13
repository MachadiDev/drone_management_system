export interface Auxiliaries {
    id: number;
    name: string;
    cpf: string;
    cnh: string;
    sarpas_number: string;
    isActive: boolean;
}

export interface AuxiliariesListResponse {
    auxiliaries: Auxiliaries[];
    total: number;
}