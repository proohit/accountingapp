import {
  Grid,
  LinearProgress,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import React from 'react';
import { useCategoriesQuery } from '../../records/hooks/categoriesQueries';
import { getCategoryById } from '../../records/utils/categoryUtils';
import { useMonthlyCategoryStatisticsQuery } from '../hooks/monthQuery';

const MonthlyCategory: React.FC = () => {
  const month = dayjs().month();
  const year = dayjs().year();

  const { data, isLoading: categoryDataLoading } =
    useMonthlyCategoryStatisticsQuery(month, year);
  const { data: categories, isLoading: categoriesLoading } =
    useCategoriesQuery();

  if (categoryDataLoading || categoriesLoading) {
    return <LinearProgress />;
  }

  const categoryData = data?.data?.sort(
    (dataA, dataB) => -(dataA.balance - dataB.balance)
  );

  return (
    <Grid style={{ maxHeight: 200 }}>
      <List>
        {categoryData?.map((categoryMonthlyData) => (
          <ListItem key={categoryMonthlyData.category} divider>
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={10}>
                <Typography color="primary" variant="body2">
                  {
                    getCategoryById(categories, categoryMonthlyData.category)
                      ?.name
                  }
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  color={categoryMonthlyData.balance < 0 ? 'error' : 'primary'}
                >
                  {categoryMonthlyData.balance}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default MonthlyCategory;
