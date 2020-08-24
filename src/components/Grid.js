import React from 'react';
import styled from 'styled-components';

function Grid({ children }) {
  return <StyledGrid data-testid='grid'>{children}</StyledGrid>;
}

export default Grid;

const StyledGrid = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }
`;
