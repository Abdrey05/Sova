import { useAlerts } from "../hooks/useAlerts";
import { useEffect, useState } from "react";
import styles from "./AlertContainer.module.css";
import type { AlertType } from "../model";

// Компонент для отображения одного уведомления

function AlertItem({ alert }: { alert: AlertType }) {
  const [isOut, setIsOut] = useState(false);
  const { dispatch } = useAlerts();

  useEffect(() => {
    setIsOut(true);
    const timer = setTimeout(() => {
      setIsOut(false);
    }, 2700);
    const removeTimer = setTimeout(() => {
      dispatch({ type: "CLEAR_ALERT", payload: { id: alert.id } });
    }, 3100);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [alert.id]);

  return (
    <div
      className={`${styles.alert} ${styles[alert.status]} ${
        isOut ? styles.enter : styles.exit
      }`}
    >
      <span className={styles.message}>{alert.message}</span>
    </div>
  );
}

// Компонент для отображения всех имеющихся уведомлений

export function AlertContainer() {
  const { alerts } = useAlerts();

  return (
    <div className={styles.container}>
      {alerts.map((alert) => (
        <AlertItem alert={alert} key={alert.id} />
      ))}
    </div>
  );
}
