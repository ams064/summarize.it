import React from "react";
import {
  Form,
  Button,
  Grid,
  Header as SemanticHeader,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

const SignupUI = ({
  form: { onChange, form, signupFormValid, onSubmit, loading, fieldErrors, message },
}) => {
  return (
    <div>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 500, marginTop: 20 }}>
        <SemanticHeader>
            <Avatar >
              <LockOutlinedIcon />
            </Avatar>
          </SemanticHeader>
            <Form>
              <Form.Field>
                <Form.Input
                  value={form.firstName || ""}
                  onChange={onChange}
                  name="firstName"
                  placeholder="First Name"
                  label="First Name"
                  error={
                    fieldErrors.first_name && {
                      content: fieldErrors.first_name,
                      pointing: "below",
                    }
                  }
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  value={form.lastName || ""}
                  onChange={onChange}
                  name="lastName"
                  placeholder="Last Name"
                  label="Last Name"
                  error={
                    fieldErrors.last_name && {
                      content: fieldErrors.last_name,
                      pointing: "below",
                    }
                  }
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  value={form.email || ""}
                  onChange={onChange}
                  name="email"
                  type="email"
                  placeholder="Email"
                  label="Email"
                  error={
                    fieldErrors.email && {
                      content: fieldErrors.email,
                      pointing: "below",
                    }
                  }
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
                  error={
                    fieldErrors.password && {
                      content: fieldErrors.password,
                      pointing: "below",
                    }
                  }
                />
              </Form.Field>

              <Button
                onClick={onSubmit}
                disabled={signupFormValid || loading}
                fluid
                loading={loading}
                primary
                type="submit"
              >
                Submit
              </Button>
              <Segment>
              Already have an account? <Link to="/login">Login</Link>.
            </Segment>
            </Form>

        </Grid.Column>
      </Grid>
      <p>&nbsp;</p>
      <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/" >
        Summarize.it
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </div>
  );
};

export default SignupUI;