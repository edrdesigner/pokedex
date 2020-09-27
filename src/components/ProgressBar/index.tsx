import React from 'react';

import { Container, Filler } from './styles';

export interface ProgressProps {
  bgColor: string;
  progress: number;
}

const ProgressBar: React.FC<ProgressProps> = ({ bgColor, progress }) => {
  return (
    <Container>
      <Filler bgColor={bgColor} progress={progress} />
    </Container>
  );
};

export default ProgressBar;
