import {
  LoginLayout,
  SectionContainer,
  Form,
  Input,
  PrimaryButton,
} from "../../components";
import styles from "./login.module.scss";

const Login = () => {
  return (
    <SectionContainer>
      <Form submit={() => {}} additionalStyles="form-w-sm">
        <>
          <p className='call-to-action'>Hey quizzy, ready to ace your quiz? </p>
          <Input
            elementType="input"
            elementConfig={{
              type: "text",
              placeholder: "Enter email",
            }}
            additionalStyles="input-align"
            value=""
            label=""
            changed={() => {}}
          />
          <Input
            elementType="input"
            elementConfig={{
              type: "text",
              placeholder: "Enter password",
            }}
            additionalStyles="input-align"
            value=""
            label=""
            changed={() => {}}
          />
        </>
      </Form>

      <PrimaryButton
        additionalStyles="button button-action button-secondary button-submit"
        value="Log in"
      />
      <div>
        <footer id={styles.footer}>
          <div>
            <p className={styles.account}>Don’t have an account?</p>
            <p className={styles.foot}>
              Contact your university administrator
            </p>
          </div>
        </footer>
      </div>
    </SectionContainer>
  );
};

export default (
  <LoginLayout>
    <Login />
  </LoginLayout>
);
