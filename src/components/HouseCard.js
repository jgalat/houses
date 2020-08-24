import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function HouseCard({ address, homeowner: homeOwner, price, photoURL }) {
  const formattedPrice = price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (
    <Card>
      <picture>
        <HouseImg
          alt={`A house located at ${address} valued at ${formattedPrice}`}
          src={photoURL}
          data-testid="house-img"
        />
      </picture>
      <Footer>
        <Row>
          <Address title={address} data-testid="address">
            {address}
          </Address>
          <Price data-testid="price">{formattedPrice}</Price>
        </Row>
        <Row>
          <HomeOwner data-testid="home-owner">
            <strong>Owner:</strong> {homeOwner}
          </HomeOwner>
        </Row>
      </Footer>
    </Card>
  );
}

HouseCard.propTypes = {
  address: PropTypes.string.isRequired,
  homeowner: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  photoURL: PropTypes.string.isRequired,
};

export default HouseCard;

const Card = styled.div`
  min-height: 300px;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;

  padding: 1rem;
  background-color: white;
  height: 80px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Address = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 60%;

  font-weight: 600;
`;

const Price = styled.div`
  color: darkgreen;
`;

const HomeOwner = styled.div`
  font-size: 0.9rem;

  strong {
    font-weight: 600;
  }
`;

const HouseImg = styled.img`
  width: 100%;
  height: auto;
`;
