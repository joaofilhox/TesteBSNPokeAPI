export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
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
}
