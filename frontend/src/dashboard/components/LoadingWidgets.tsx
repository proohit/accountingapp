import { Skeleton } from '@mui/material';
import { FunctionComponent } from 'react';
import LoadingWidget from './LoadingWidget';

export const LoadingWidgets: FunctionComponent = () => (
  <>
    <LoadingWidget xs={12}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={200}
      />
    </LoadingWidget>
    <LoadingWidget
      xs={12}
      md={6}
      title={<Skeleton animation="wave" variant="text" />}
    >
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={200}
      />
    </LoadingWidget>
    <LoadingWidget
      xs={12}
      md={6}
      title={<Skeleton animation="wave" variant="text" />}
    >
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={200}
      />
    </LoadingWidget>
    <LoadingWidget xs={12}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={200}
      />
    </LoadingWidget>
    <LoadingWidget
      xs={12}
      md={6}
      title={<Skeleton animation="wave" variant="text" />}
    >
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={200}
      />
    </LoadingWidget>
    <LoadingWidget
      xs={12}
      md={6}
      title={<Skeleton animation="wave" variant="text" />}
    >
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={200}
      />
    </LoadingWidget>
  </>
);
