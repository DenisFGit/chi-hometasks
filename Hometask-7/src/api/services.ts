interface ApiResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Hero[];
}

export interface Hero {
    id: number;
    name: string;
    status: string;
    image?: string;
}

export const fetchHero = async (id: string): Promise<Hero> => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    return res.json();
};

export const fetchHeroes = async (page: number): Promise<ApiResponse> => {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data: ApiResponse = await res.json();
    return data;
}