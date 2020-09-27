import React, { useCallback } from 'react';
import ContentLoader from 'react-content-loader';

interface Props {
  repeat?: number;
}

const CardLoader: React.FC<Props> = ({ repeat = 1 }) => {
  const getContentLoaders = useCallback(() => {
    const elements = [];
    for (let i = 0; i < repeat; i += 1) {
      elements.push(
        <ContentLoader
          key={`loader-${i}`}
          speed={2}
          width={300}
          height={120}
          viewBox="0 0 300 120"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="12" y="21" rx="3" ry="3" width="200" height="29" />
          <rect x="15" y="63" rx="3" ry="3" width="77" height="12" />
        </ContentLoader>,
      );
    }
    return elements;
  }, [repeat]);

  return <>{getContentLoaders()}</>;
};

export default React.memo(CardLoader);
