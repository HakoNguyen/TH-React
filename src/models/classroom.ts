export interface Classroom {
    id: string;
    name: string;
    capacity: number;
    type: 'Ly thuyet' | 'Thuc hanh' | 'Hoi truong';
    personInCharge: string;
    description: string;
}

export interface FilterParams {
    searchText: string;
    type?: string;
}

export interface PersonInCharge {
    id: string;
    name: string;
}