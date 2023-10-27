import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  LoginLayout,
  PrimaryButton,
  SectionContainer,
} from "../../components";
import { RegisterInput } from "../../domain/dtos";
import { RootState } from "../../store";
import { userLogin } from "../../store/features/auth/authActions";
import styles from "./login.module.scss";

const registerInput: RegisterInput = {
  email: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState<RegisterInput>(registerInput);
  const { errors, success, userToken } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    // redirect authenticated user to dashboard
    if (success) navigate("/");
  }, [success]);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(userLogin(form) as any);
  }
  
  return !userToken ? (
    <LoginLayout>
      <SectionContainer>
        <Form submit={submit} additionalStyles="form-w-sm">
          <>
            <p className="call-to-action">
              Hey quizzy, ready to ace your quiz?{" "}
            </p>
            <Input
              elementType="input"
              elementConfig={{
                type: "text",
                placeholder: "Enter email",
              }}
              additionalStyles="input-align"
              value={form.email}
              errors={errors?.email}
              name="email"
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
              errors={errors?.password}
              name="password"
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
              <p className={styles.foot}>
                Contact your university administrator
              </p>
            </div>
          </footer>
        </div>
      </SectionContainer>
    </LoginLayout>
  ) : (
    <Navigate to="/" replace />
  );
};

export default Login;
