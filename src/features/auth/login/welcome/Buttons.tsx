import { IonButton, IonNavLink, IonSpinner } from "@ionic/react";
import { useRef } from "react";

import PickLoginServer from "#/features/auth/login/login/PickLoginServer";
import PickJoinServer from "#/features/auth/login/pickJoinServer/PickJoinServer";
import useStartJoinFlow from "#/features/auth/login/pickJoinServer/useStartJoinFlow";
import { useAppSelector } from "#/store";

import LearnMore from "../LearnMore";

import styles from "./Buttons.module.css";

export default function Buttons() {
  const loadingJoin = useAppSelector((state) => state.join.loading);
  const ref = useRef<HTMLDivElement>(null);
  const startJoinFlow = useStartJoinFlow(ref);
  const connectedInstance = useAppSelector(
    (state) => state.auth.connectedInstance,
  );

  return (
    <>
      <div className={styles.topSpacer} />
      <div className={styles.container} ref={ref}>

        <div className={styles.buttonLine}>

          <IonNavLink component={() => <PickLoginServer />}>
            <IonButton fill="clear" color="dark" expand="block">
              Log In
            </IonButton>
          </IonNavLink>

        </div>
      </div>

      <div className={styles.bottomSpacer} />

      <div className={styles.buttonLine}>
        <center>
            Swipe down to cancel
        </center>
      </div>

      <div className={styles.bottomSpacer} />

    </>
  );
}
