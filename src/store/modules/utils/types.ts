export interface ISimpleReponseData<T> {
    data: T;
    status: string;
    text: string;
}

export interface IReponseData<T> {
    data: IPageResult<T>;
    status: string;
    text: string;
}

export interface IPageResult<T> {
    page: number | string | null;
    count: number | string | null;
    previous: string | null;
    num_pages: number | string | null;
    next: string | null;
    results: Array<T>;
}