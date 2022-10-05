import { Grid, Paper, Table, TableContainer, Toolbar } from '@mui/material';
import { FunctionComponent, PropsWithChildren } from 'react';

interface RecordsTableProps {
  toolbar?: JSX.Element;
  controls?: JSX.Element;
}
export const RecordsTable: FunctionComponent<
  PropsWithChildren<RecordsTableProps>
> = (props) => {
  const { toolbar, children, controls } = props;

  return (
    <Paper>
      {toolbar && (
        <Toolbar>
          <Grid container item direction="row" alignContent="center">
            {toolbar}
          </Grid>
        </Toolbar>
      )}
      <TableContainer>
        <Table>{children}</Table>
      </TableContainer>
      {controls}
    </Paper>
  );
};
