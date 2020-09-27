export interface PokemonType {
  type: {
    name: string;
  };
}

interface Attributes {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Abilitys {
  ability: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  types: PokemonType[];
}

export interface PokemonDetail extends Omit<Pokemon, 'url'> {
  stats: Attributes[];
  abilities: Abilitys[];
  color: string;
}

export interface RequestPokemon {
  id: number;
  types: PokemonType[];
}

export interface MetaResponse {
  total: number;
}
