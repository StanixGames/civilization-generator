import React, {useState, useCallback} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import {users} from '../../../store';
import {validateSignUpResponse, validateSignUpBeforeRequest} from '../../../helpers';

import {useStyles} from './styles';

export function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickName, setNickname] = useState<string>('');
  const [error, setError] = useState<{ field: string, message: string } | null>(null);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);
  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);
  const handleNickNameChange = useCallback((event) => {
    setNickname(event.target.value);
  }, [setNickname]);

  const handleSignUp = useCallback(async (e) => {
    e.preventDefault();
    const preSubmitError = validateSignUpBeforeRequest(
      email,
      password,
      nickName,
    );
    setError(preSubmitError);
    
    if (!preSubmitError) {
      try {
        const res = await users.register(email, password, nickName);
        console.log('registered', res);
        if (res.success) {
          
        } else {
          if (res.error) {
            const { code, message } = res.error;
            const invalidField = validateSignUpResponse(code);
            if (invalidField) {
              setError({
                field: invalidField,
                message,
              });
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [email, password, nickName, setError]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                autoFocus
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                inputProps={{
                  form: {
                    autocomplete: 'off',
                  },
                }}
                value={email}
                onChange={handleEmailChange}
                error={error && error.field === 'email' ? true : false}
                helperText={error && error.field === 'email' ? error.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={handlePasswordChange}
                error={error && error.field === 'password' ? true : false}
                helperText={error && error.field === 'password' ? error.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="nickName"
                variant="outlined"
                required
                fullWidth
                id="nickName"
                label="NickName"
                autoComplete="off"
                value={nickName}
                onChange={handleNickNameChange}
                error={error && error.field === 'nickName' ? true : false}
                helperText={error && error.field === 'nickName' ? error.message : ''}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}