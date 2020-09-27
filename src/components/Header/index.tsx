import React from 'react';
import { Container, HeaderContainer } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <HeaderContainer>
        <h3>Pokedex</h3>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
