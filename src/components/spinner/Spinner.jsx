import styles from "./Spinner.module.css";

function SpinnerLoad() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default SpinnerLoad;
