import { useNavigate } from "react-router";
import type { AuthData } from "../../types/user";
import { useLoginMutation } from "../../services/authApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "./SignInForm.module.scss";

export default function SignInForm() {
  const navigate = useNavigate();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: AuthData) => {
    try {
      const email = data.email.trim();
      const password = data.password;

      await login({
        email,
        password,
      }).unwrap(); //перетворює результат RTK Query у нормальний Promise, ане special RTK object.

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="email"
          className={styles.input}
          {...registerField("email", {
            required: "Email name is required",
          })}
          placeholder="Email"
        />
        <p className={styles.errorText}>
          {errors.email && errors.email.message}
        </p>
      </div>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          {...registerField("password", {
            required: "Password is required",
          })}
          type="password"
          placeholder="Password"
        />
        <p className={styles.errorText}>
          {errors.password && errors.password.message}
        </p>
      </div>
      <button className={styles.button} type="submit" disabled={isLoading}>
        Login
      </button>
    </form>
  );
}
