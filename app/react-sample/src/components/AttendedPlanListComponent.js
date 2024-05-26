import React, { useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import PlanComponent from './PlanComponent';
import Progress from './Progress';
import { useTranslation } from 'react-i18next';

const AttendedPlanListComponent = ({ plans }) => {
  const { t } = useTranslation();
  const [visiblePlans, setVisiblePlans] = useState(3);

  const showMorePlans = () => {
    setVisiblePlans(prevVisiblePlans => prevVisiblePlans + 3);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {plans.length === 0 ? (
          <Grid item xs={12}><Typography>{t('沒有計畫')}</Typography></Grid>
        ) : (
          plans.slice(0, visiblePlans).map(plan => (
              <Progress planId={plan.plan_id} planName={plan.name} />
          ))
        )}
      </Grid>
      {visiblePlans < plans.length && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <Button onClick={showMorePlans} sx={{ my: 2 }}>
            <Typography>{t('查看更多')}</Typography>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AttendedPlanListComponent;
