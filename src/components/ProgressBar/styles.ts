import styled from 'styled-components';

import { ProgressProps } from '.';

export const Container = styled.div`
  height: 20px;
  width: 100%;
  background-color: #e0e0de;
  border-radius: 50px;
  margin: 10px;
`;

export const Filler = styled.div<ProgressProps>`
  height: 100%;
  width: ${props => (props.progress > 100 ? 100 : props.progress)}%;
  background-color: ${props => props.bgColor};
  border-radius: inherit;
  text-align: right;
`;
