import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import type { AuthData } from "../../types/user";
import { useForm } from "react-hook-form";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import { useLoginMutation } from "../../services/authApi";
import SignInForm from "../../components/SignInForm/SignInForm";
import Icon from "../../components/Icon/Icon";
import styles from "./SignIn.module.scss";

export default function SignIn() {
  // const navigate = useNavigate();

  // const {
  //   register: registerField,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<AuthData>();

  // const [login, { isLoading }] = useLoginMutation();

  // const onSubmit = async (data: AuthData) => {
  //   try {
  //     const email = data.username.trim();
  //     const password = data.password;

  //     await login({
  //       username: email,
  //       password: password,
  //     }).unwrap(); //перетворює результат RTK Query у нормальний Promise

  //     navigate("/");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Login failed");
  //   }
  // };

  return (
    <>
      <Toaster />
      <Section>
        <Container className={styles.signInContainer}>
          <div className={styles.wrapper}>
            <Icon name="logo" size={50} className={styles.logoIcon} />
            <h1 className={styles.title}>Sign in to Admin Panel</h1>
          </div>
          <SignInForm />
        </Container>
      </Section>
    </>
  );
}
