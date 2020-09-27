import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { BACKGROUND_COLORS } from '../../constants/colors';
import ProgressBar from '../../components/ProgressBar';
import api from '../../services/api';
import { PokemonDetail } from '../../types/Pokemon';

import {
  Container,
  LoadingContainer,
  HeaderContainer,
  HeaderContent,
  BackButton,
  ContentImage,
  Content,
  PokemonContentType,
  PokemonType,
  AtributesContainer,
  Title,
  Ability,
  StatusBar,
  ContentBar,
} from './styles';

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

interface Types {
  type: {
    name: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  stats: Attributes[];
  abilities: Abilitys[];
  types: Types[];
  color: string;
}

interface RouteParams {
  pokemonId: string;
}

const Detail: React.FC = () => {
  const { pokemonId } = useParams<RouteParams>();
  const [pokemon, setPokemon] = useState({} as PokemonDetail);
  const [fetching, setFetching] = useState(true);
  const history = useHistory();

  useEffect(() => {
    async function getPokemon(): Promise<void> {
      const response = await api.get(`pokemon/${pokemonId}`);
      const { stats, abilities, id, name, types } = response.data;
      const color = BACKGROUND_COLORS[types[0].type.name];

      setPokemon({
        stats,
        abilities,
        id,
        name,
        types,
        color,
      });

      setFetching(false);
    }

    getPokemon();
  }, [pokemonId]);

  const handleBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return fetching ? (
    <LoadingContainer>Loading...</LoadingContainer>
  ) : (
    <Container>
      <HeaderContainer type={pokemon.types[0].type.name}>
        <HeaderContent>
          <BackButton type="button" onClick={handleBack}>
            <FiArrowLeft />
          </BackButton>
          <Content>
            <strong>{pokemon.id}</strong>
            <h3>{pokemon.name}</h3>
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
          </Content>

          <ContentImage>
            <img
              src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
            />
          </ContentImage>
        </HeaderContent>
      </HeaderContainer>
      <AtributesContainer>
        <Title type={pokemon.types[0].type.name}>Base States</Title>
        {pokemon.stats.map(attribute => (
          <StatusBar key={attribute.stat.name}>
            <span>{attribute.stat.name}</span>
            <strong>{attribute.base_stat}</strong>
            <ContentBar>
              <ProgressBar
                bgColor={pokemon.color}
                progress={attribute.base_stat}
              />
            </ContentBar>
          </StatusBar>
        ))}
        <Title type={pokemon.types[0].type.name}> Abilities </Title>
        {pokemon.abilities.map(abilityItem => (
          <Ability key={`ability-${abilityItem.ability.name}`}>
            {abilityItem.ability.name}
          </Ability>
        ))}
      </AtributesContainer>
    </Container>
  );
};

export default Detail;
