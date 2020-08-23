import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Grid from './components/Grid';
import House from './components/House';
import Loader from './components/Loader';

function App() {
  const houses = useSelector(state => state.houses);
  return (
    <>
      <Header>
        <Heading>Houses</Heading>
      </Header>
      <Main>
        <Grid>
          {houses.map(house => {
            const { id, ...houseInfo } = house;
            return <House key={id} {...houseInfo} />;
          })}
        </Grid>
        <Loader />
      </Main>
    </>
  );
}

export default App;

const Header = styled.header`
  height: 40vh;

  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, blueviolet, white);
  color: white;
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 4rem;
  border: 5px solid white;
  padding: 1rem 2rem;
  box-shadow: 1px 1px 1px blueviolet;
  text-shadow: 1px 1px 1px blueviolet;
`;

const Main = styled.main`
  width: calc(100% - 60px);
  margin: 0 auto;
`;
