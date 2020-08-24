import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import useIsIntersecting from '../hooks/useIsIntersecting';
import useDebounce from '../hooks/useDebounce';
import { fetchHouses } from '../store/actions';

function Loader() {
  const ref = useRef();
  const dispatch = useDispatch();
  const { loading, retry } = useSelector(({ loading, retry }) => ({
    loading,
    retry,
  }));
  const debouncedLoading = useDebounce(loading, 500);
  const isIntersecting = useIsIntersecting(ref);

  useEffect(() => {
    if (isIntersecting && !debouncedLoading) {
      dispatch(fetchHouses());
    }
  }, [isIntersecting, debouncedLoading, dispatch]);

  return (
    <Container>
      <Spinner ref={ref} />
      {retry > 0 && (
        <Retry data-testid='retry'>
          Retry #{retry} in {2 ** retry} seconds
        </Retry>
      )}
    </Container>
  );
}

export default Loader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 20px 0;
`;

const SpinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 20px 0 16px;
  border-top: 4px solid rgba(138, 43, 226, 0.2);
  border-right: 4px solid rgba(138, 43, 226, 0.2);
  border-bottom: 4px solid rgba(138, 43, 226, 0.2);
  border-left: 4px solid #8a2be2;
  animation: ${SpinAnimation} 1s infinite linear;

  &,
  &:after {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
`;

const Retry = styled.div``;
