import { Toaster } from "react-hot-toast";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import SignInForm from "../../components/SignInForm/SignInForm";
import Icon from "../../components/Icon/Icon";
import styles from "./SignIn.module.scss";

export default function SignIn() {
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
