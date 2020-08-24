import React from 'react';
import { render } from '@testing-library/react';
import Grid from './Grid';

test('renders its children', () => {
  const { getByText } = render(
    <Grid>
      <div>child</div>
    </Grid>
  );
  expect(getByText('child')).toBeInTheDocument();
});
