import React from 'react';
import { Helmet } from 'react-helmet-async';

const Title = ({ title }) => {
  return (
    <Helmet>
      <title>whatTODO - {title}</title>
    </Helmet>
  );
};

export default Title;
