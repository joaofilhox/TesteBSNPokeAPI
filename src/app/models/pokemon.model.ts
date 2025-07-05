export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    sprites: {
        front_default: string;
        back_default: string;
        front_shiny: string;
        back_shiny: string;
    };
    types: {
        slot: number;
        type: {
            name: string;
        };
    }[];
    abilities: {
        slot: number;
        ability: {
            name: string;
        };
    }[];
    forms: { name: string }[];
    species: { name: string; url: string };
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}
