import { GitHubSignIn } from "@/modules/auth/github-sign-in/github-sign-in";
import styles from "./auth-view.module.css";

export function AuthView() {
  return (
    <section className={styles.section} aria-labelledby="auth-heading">
      <div className={styles.intro}>
        <h1 id="auth-heading" className={styles.title}>
          Sign in
        </h1>
        <p className={styles.lead}>
          Use your GitHub account to access your profile and keep your progress
          tied to one identity.
        </p>
      </div>
      <GitHubSignIn />
    </section>
  );
}
