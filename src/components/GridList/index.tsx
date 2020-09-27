import React, { ReactNode } from 'react';
import { Pokemon } from '../../types/Pokemon';
import CardLoader from '../CardLoader';
import { Container } from './styles';

interface Props {
  id: string;
  data: Pokemon[];
  limit?: number;
  renderItem: (item: Pokemon) => ReactNode;
  fetching?: boolean;
}

const GridList: React.FC<Props> = ({
  id,
  data,
  renderItem,
  fetching,
  limit,
}) => {
  return (
    <Container id={id}>
      {fetching ? (
        <>
          <CardLoader repeat={limit} />
        </>
      ) : (
        data.map(item => renderItem(item))
      )}
    </Container>
  );
};

export default GridList;
