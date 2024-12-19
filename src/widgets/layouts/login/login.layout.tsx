import styles from './styles.module.scss';

export const LoginLayout = () => {
  return (
    <div className={styles.canvas}>
      <div className={styles.login}>
        <p className={styles.title}>Login</p>
        <input placeholder={'email'} />
        <input placeholder={'password'} />
        <button type={'button'} className={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};
