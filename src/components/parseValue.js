import React from 'react';
import Mathjax from 'react-mathjax';

const parseValue = value => (
  <Mathjax.Context>
    <div>
      <Mathjax.Node inline>{value}</Mathjax.Node>
    </div>
  </Mathjax.Context>
);

export default parseValue;
