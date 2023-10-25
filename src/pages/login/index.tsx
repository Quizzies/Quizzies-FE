import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import {
  LoginLayout,
  SectionContainer,
  Form,
  Input,
  PrimaryButton,
} from "../../components";
import styles from "./login.module.scss";
import { optionInputsErrors, setErroMapping } from "../../ts/utils/error-utils";

type RegisterInput = { email: string; password: string };

const registerInput: RegisterInput = {
  email: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState<RegisterInput>(registerInput);
  const [formErrors, setFormErrors] = useState<
    optionInputsErrors<RegisterInput>
  >({});

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    })
  }


  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error)
      }

      const credentials = await response.json();

      setFormErrors({});
    } catch(err) {
      setErroMapping(err, setFormErrors);
    }
  }

  return (
    <SectionContainer>
      <Form submit={submit} additionalStyles="form-w-sm">
        <>
          <p className="call-to-action">Hey quizzy, ready to ace your quiz? </p>
          <Input
            elementType="input"
            elementConfig={{
              type: "text",
              placeholder: "Enter email",
            }}
            additionalStyles="input-align"
            value={form.email}
            errors={formErrors.email}
            name='email'
            changed={onChange}
          />
          <Input
            elementType="input"
            elementConfig={{
              type: "text",
              placeholder: "Enter password",
            }}
            additionalStyles="input-align"
            value={form.password}
            errors={formErrors.password}
            name='password'
            changed={onChange}
          />
          <PrimaryButton
            type="submit"
            additionalStyles="button button-action button-secondary button-submit"
            value="Log in"
          />
        </>
      </Form>

      <div>
        <footer id={styles.footer}>
          <div>
            <p className={styles.account}>Don’t have an account?</p>
            <p className={styles.foot}>Contact your university administrator</p>
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
