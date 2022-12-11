import {
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { FC, PropsWithChildren, useState } from 'react';
import { ResetPasswordForm } from '../../../src/settings/components/ResetPasswordForm';
import { SettingsApiService } from '../../../src/settings/services/SettingsApi';
import PageHeader from '../../../src/shared/components/PageHeader';

const ResetPasswordPage: FC = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    const api = new SettingsApiService();
    try {
      if (activeStep === 0) {
        setLoading(true);
        await api.sendResetToken(username);
      }
      setActiveStep(activeStep + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Head>
        <title>Reset Password - AccountingApp</title>
        <meta
          property="og:title"
          content="Reset Password - AccountingApp"
          key="title"
        />
        <meta
          property="og:description"
          content="You can reset your password here"
          key="description"
        />
      </Head>
      <Container maxWidth="md">
        <Grid container direction="row" justifyContent="center" gap={3}>
          <PageHeader header="Reset Password" />
          <PasswordResetSteps
            disabled={loading}
            activeStep={activeStep}
            setUsername={setUsername}
            setToken={setToken}
            username={username}
            token={token}
          />
          {loading && (
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
          )}
          <StepperNavigation
            disableBack={activeStep === 0 || loading}
            disableNext={activeStep === 2 || loading}
            onNext={handleNext}
            onBack={handleBack}
          />
        </Grid>
      </Container>
    </>
  );
};
export default ResetPasswordPage;

const PasswordResetSteps: FC<{
  disabled?: boolean;
  activeStep: number;
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
  username: string;
  token: string;
}> = ({ activeStep, setUsername, setToken, token, username, disabled }) => {
  return (
    <>
      <Grid item xs={12}>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>Enter username</StepLabel>
          </Step>
          <Step>
            <StepLabel>Enter token</StepLabel>
          </Step>
          <Step>
            <StepLabel>Enter new password</StepLabel>
          </Step>
        </Stepper>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        {activeStep === 0 && (
          <StepContainer description="Please enter your username to reset your password.">
            <TextField
              label="Username"
              fullWidth
              disabled={disabled}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </StepContainer>
        )}
        {activeStep === 1 && (
          <StepContainer description="If that username exists, an email with a token has been sent to it. Please enter the token that was sent to the associated email address.">
            <TextField
              label="Token"
              fullWidth
              disabled={disabled}
              onChange={(e) => setToken(e.target.value)}
            />
          </StepContainer>
        )}
        {activeStep === 2 && (
          <StepContainer description="Please enter your new password.">
            <ResetPasswordForm username={username} resetToken={token} />
          </StepContainer>
        )}
      </Grid>
    </>
  );
};

const StepContainer: FC<PropsWithChildren & { description: string }> = (
  props
) => {
  const { children, description } = props;
  return (
    <>
      <Typography sx={{ mb: 2 }} variant="body1">
        {description}
      </Typography>
      {children}
    </>
  );
};

const StepperNavigation: FC<{
  disableNext?: boolean;
  disableBack?: boolean;
  onNext: () => void;
  onBack: () => void;
}> = ({ disableBack, disableNext, onNext, onBack }) => {
  return (
    <Grid item container direction="row" xs={12}>
      <Grid item>
        <Button variant="contained" disabled={disableBack} onClick={onBack}>
          Back
        </Button>
      </Grid>
      <Grid item xs />
      <Grid item>
        <Button variant="contained" disabled={disableNext} onClick={onNext}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
};
