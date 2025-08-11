import { IonIcon } from "@ionic/react";

import { bed } from "ionicons/icons";
import { close } from "ionicons/icons";

import FloatingDialog from "#/helpers/FloatingDialog";

import styles from "./SleepDialog.module.css";

interface SleepProps {
  onDismiss: (data?: string, role?: string) => void;
}

export default function SleepDialog({ onDismiss }: SleepProps) {
  return (
    <FloatingDialog onDismiss={onDismiss}>

      <br />
      <br />
      <br />

      <div className={styles.bed}>
        <IonIcon 
            icon={bed} 
            onClick={() => onDismiss()}
        />
      </div>

      <div className={styles.title}>Sleep Mode</div>

      <div className={styles.description}>
        Did you fall asleep?
      </div>

      <button className={styles.closeButton} onClick={() => onDismiss()}>
        Close
      </button>

    </FloatingDialog>
  );
}
