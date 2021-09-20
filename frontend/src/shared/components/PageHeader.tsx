import { Typography } from '@material-ui/core';
import React from 'react';

const PageHeader: React.FunctionComponent = (props) => {
  const { children } = props;
  return (
    <Typography color="primary" variant="h3">
      {children}
    </Typography>
  );
};

export default PageHeader;
