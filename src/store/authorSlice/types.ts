export type Authors = {
    id: number;
    name: string;
}

export interface AuthorsSliceState {
    authors: Authors[];
    status: string;
}
