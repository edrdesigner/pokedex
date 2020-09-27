import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { BACKGROUND_COLORS, COLORS } from '../../constants/colors';

interface OriginalPriceProps {
  hasDiscount?: boolean;
}

interface PokemonTypeProps {
  type: string;
}

interface PokemonCardProps {
  type: string;
}

export const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 18px 0;
`;

export const MetaTitle = styled.div`
  display: inline-flex;
  border-bottom: 3px solid #dfbe7f;
  margin-bottom: 24px;
  color: #666666;
  font-size: 16px;
`;

export const SearchContainer = styled.div`
  padding: 10px 20px;
`;

export const ProductTableList = styled.table`
  width: 100%;
  border: 1px solid #ccc;
  margin-bottom: 12px;

  tr + tr {
    border-top: 1px solid #ccc;
  }

  td {
    padding: 5px;
    font-size: 14px;
  }

  strong {
    color: #000;
    font-size: 18px;
  }

  p {
    color: #666666;
    font-size: 14px;
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  td.column--price {
    text-align: right;
    padding-right: 16px;
  }

  img + img {
    margin-left: 10px;
  }
`;

export const OriginalPriceText = styled.span<OriginalPriceProps>`
  font-size: 14px;
  color: #666;
  margin-right: 5px;

  ${props =>
    props.hasDiscount &&
    css`
      text-decoration: line-through;
    `}
`;

export const DiscoutedPrice = styled.span`
  font-size: 14px;
  color: #000;
  margin-left: 5px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  margin: 0 auto;
  padding-bottom: 18px;
  padding-top: 18px;
  justify-content: center;
`;

export const PokemonCard = styled(Link)<PokemonCardProps>`
  background: ${props => BACKGROUND_COLORS[props.type] || '#F2F2F2'};
  border-radius: 10px;
  flex-direction: row;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  color: inherit;
  text-decoration: none;
  transition: background 0.2s linear;

  &:hover {
    color: inherit;
    background: ${props =>
      darken(0.1, BACKGROUND_COLORS[props.type] || '#F2F2F2')};
  }
`;

export const LeftSide = styled.div`
  width: 50%;
  position: relative;
`;

export const PokemonContentType = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PokemonType = styled.div<PokemonTypeProps>`
  padding: 5px;
  width: 65px;
  height: 25px;
  background: ${props => COLORS[props.type]};
  border-radius: 3px;
  margin-left: 5px;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  display: flex;

  span {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 25px;
    color: #ffffff;
  }
`;

export const RightSide = styled.div`
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    height: 120px;
    width: auto;
  }
`;
