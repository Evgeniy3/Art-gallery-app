export type Art = {
    authorId: number;
    created: string;
    id: number;
    imageUrl: string;
    locationId: number;
    name: string;
}

export type SearchArtParams = {
    search: string;
    currentPage: number;
    currentAuthor: string;
    currentLocation: string;
    currentCreatedFrom: string;
    currentCreatedBefore: string;
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
  }

export interface ArtsSliceState {
    items: Art[];
    status: Status;
}
