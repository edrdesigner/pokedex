import styled from 'styled-components';
import { BACKGROUND_COLORS, COLORS } from '../../constants/colors';

interface TypeProps {
  type: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const HeaderContainer = styled.div<TypeProps>`
  background: ${props => BACKGROUND_COLORS[props.type]};
  min-height: 240px;
`;

export const HeaderContent = styled.div`
  margin: 0 auto;
  width: 90%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

export const BackButton = styled.button`
  border: 0px;
  background: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 16px;

  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: background 0.2s linear;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const ContentImage = styled.div`
  position: relative;
  z-index: 3;

  img {
    width: auto;
    height: 200px;
  }
`;

export const Content = styled.div`
  flex-grow: 1;
  padding-bottom: 40px;
`;

export const PokemonContentType = styled.div`
  flex-direction: row;
  display: flex;
`;

export const PokemonType = styled.div<TypeProps>`
  width: 61px;
  height: 25px;
  background: ${props => COLORS[props.type]};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  margin-top: 10px;

  span {
    color: #fff;
    font-style: normal;
    font-weight: 500;
  }
`;

export const AtributesContainer = styled.div`
  flex: 1;
  padding: 20px;
  background: #fafafa;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  margin: 0 auto;
  margin-top: -40px;
  z-index: 1;

  width: 90%;
`;

export const Title = styled.h3<TypeProps>`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  padding: 20px;
  color: ${props => BACKGROUND_COLORS[props.type]};
`;

export const Ability = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  padding: 10px 20px;
  text-transform: capitalize;
`;

export const StatusBar = styled.div`
  display: flex;
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;

  > span {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    width: 110px;
    text-transform: capitalize;
    display: block;
  }

  > strong {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    text-align: right;
    color: #747476;
    margin-left: 20px;
  }
`;

export const ContentBar = styled.div`
  margin-left: 20px;
  flex-grow: 1;
`;
