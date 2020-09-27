import React, { useState, useCallback, useEffect } from 'react';
import { Pagination } from 'antd';
import { MetaResponse, Pokemon, RequestPokemon } from '../../types/Pokemon';
import api from '../../services/api';
import GridList from '../../components/GridList';

import {
  Container,
  PaginationContainer,
  PokemonCard,
  LeftSide,
  PokemonContentType,
  PokemonType,
  RightSide,
} from './styles';

const Dashboard: React.FC = () => {
  const [fetching, setFetching] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [meta, setMeta] = useState<MetaResponse>({} as MetaResponse);
  const [pagination, setPagination] = useState({
    limit: 12,
    page: 1,
  });

  const getPokemonInfo = useCallback(async (url: string): Promise<
    RequestPokemon
  > => {
    const response = await api.get(url);
    const { id, types } = response.data as RequestPokemon;
    return { id, types };
  }, []);

  useEffect(() => {
    async function loadItems(): Promise<void> {
      setFetching(true);
      const response = await api.get('pokemon', {
        params: {
          ...pagination,
        },
      });

      const { results, count } = response.data;

      const loadedPokemons = await Promise.all(
        results.map(async (pokemon: Pokemon) => {
          const { id, types } = await getPokemonInfo(pokemon.url);

          return {
            name: pokemon.name,
            id,
            types,
          };
        }),
      );

      setMeta({ total: count });
      setPokemons(loadedPokemons as Pokemon[]);
      setFetching(false);
    }

    loadItems();
  }, [pagination, getPokemonInfo]);

  const handleChangePage = useCallback(
    pageNumber => {
      let offset = 0;

      if (pageNumber > 0) {
        offset = (pageNumber - 1) * pagination.limit;
      }

      setPagination(prevState => ({ ...prevState, offset, page: pageNumber }));
    },
    [pagination.limit],
  );

  const renderPokeminItem = useCallback((pokemon: Pokemon) => {
    return (
      <PokemonCard
        key={pokemon.id}
        to={`detail/${pokemon.id}`}
        type={pokemon.types[0].type.name}
      >
        <LeftSide>
          <strong>{pokemon.id}</strong>
          <p>{pokemon.name}</p>
          <PokemonContentType>
            {pokemon.types.map(pokemonType => (
              <PokemonType
                key={`${pokemon.id}-${pokemonType.type.name}`}
                type={pokemonType.type.name}
              >
                <span>{pokemonType.type.name}</span>
              </PokemonType>
            ))}
          </PokemonContentType>
        </LeftSide>

        <RightSide>
          <img
            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
          />
        </RightSide>
      </PokemonCard>
    );
  }, []);

  return (
    <Container>
      <GridList
        id="grid-list-pokemons"
        data={pokemons}
        renderItem={renderPokeminItem}
        fetching={fetching}
        limit={pagination.limit}
      />
      <PaginationContainer>
        <Pagination
          total={meta.total}
          current={pagination.page ?? 1}
          pageSize={pagination.limit}
          onChange={handleChangePage}
          simple
        />
      </PaginationContainer>
    </Container>
  );
};

export default Dashboard;
