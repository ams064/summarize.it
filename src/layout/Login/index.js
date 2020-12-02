import React from "react";
import {
  Form,
  Button,
  Grid,
  Header as SemanticHeader,
  Segment,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const LoginUI = ({
  form: { onChange, form, loginFormValid, err, onSubmit, loading, message },
}) => {
  return (
    <div>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
          <SemanticHeader>
            <Avatar >
              <LockOutlinedIcon />
            </Avatar>
          </SemanticHeader>
            <Form>
              {err.length !== 0 && err !== false ?
                <Message content={err} negative /> : message.length !== 0 && message !== null ?
                <Message content={message} positive /> : <></>
              }
              <Form.Field>
                <Form.Input
                  value={form.email || ""}
                  onChange={onChange}
                  name="email"
                  placeholder="Email"
                  label="Email"
                />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  value={form.password || ""}
                  onChange={onChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  label="Password"
                />
              </Form.Field>
              <Button
                onClick={onSubmit}
                disabled={loginFormValid || loading}
                fluid
                loading={loading}
                primary
                type="submit"
              >
                Log In
              </Button>
              <Segment>
                Need an account? <Link to="/signup">Sign up</Link>.
              </Segment>
              <Segment>
              Trouble accessing your account? <Link to="/forgotpassword">Click here.</Link>
              </Segment>
            </Form>
        </Grid.Column>
      </Grid>
      <p>&nbsp;</p>
      <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Summarize.it
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </div>
  );
};

export default LoginUI;