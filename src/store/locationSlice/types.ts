export type Locations = {
    id: number;
    location: string;
}

export interface LocationsSliceState {
    locations: Locations[];
    status: string;
}
