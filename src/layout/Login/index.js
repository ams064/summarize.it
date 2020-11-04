import React from "react";
import {
  Form,
  Button,
  Grid,
  Header as SemanticHeader,
  Segment,
  Message,
} from "semantic-ui-react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const LoginUI = ({
  form: { onChange, form, loginFormValid, error, onSubmit, loading },
}) => {
  return (
    <div>
      <Header />

      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
          <SemanticHeader>Login to your account</SemanticHeader>

          <Segment>
            <Form>
              {error && <Message content={error?.detail} negative />}
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
                Need an account <Link to="/signup">Sign up</Link>.
              </Segment>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default LoginUI;