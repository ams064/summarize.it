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
import Header from "../../components/Header";
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const ForgotPasswordUI = ({
  form: { onChange, form, err, onEmailSubmit, message, isSendingCode, codeSent, formValid, onResetPassword},
}) => {

  return (
    <div>
      <Header />
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
        <SemanticHeader>
            <Avatar >
              <MailOutlineOutlinedIcon />
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
              {codeSent === false ?  
                <Button
                    onClick={onEmailSubmit}
                    disabled={form.email?.length === 0 ? true : false}
                    fluid
                    loading={isSendingCode}
                    primary
                    type="submit"
                >
                    Send Confirmation code to change password
                </Button>
                :
                <div>
                <Button
                    onClick={onEmailSubmit}
                    disabled={form.email?.length === 0 ? true : false}
                    fluid
                    loading={isSendingCode}
                    primary
                    type="submit"
                >
                    Re-Send Confirmation Code
                </Button>
                <Form.Field>
                <Form.Input
                    value={form.confCode || ""}
                    onChange={onChange}
                    name="confCode"
                    placeholder="Confirmation Code"
                    label="Confirmation Code"
                    type="password"
                />
                </Form.Field>
                <Form.Field>
                <Form.Input
                    value={form.newPass || ""}
                    onChange={onChange}
                    name="newPass"
                    placeholder="New Password"
                    label="New Password"
                    type="password"
                />
                </Form.Field>
                <Form.Field>
                <Form.Input
                    value={form.confPass || ""}
                    onChange={onChange}
                    name="confPass"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    type="password"
                />
                </Form.Field>
                <Button
                    onClick={onResetPassword}
                    disabled={formValid}
                    fluid
                    loading={isSendingCode}
                    primary
                    type="submit"
                >
                    Reset Password
                </Button>
                </div>
            }
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

export default ForgotPasswordUI;