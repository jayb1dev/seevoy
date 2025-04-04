import { IonButton, IonText } from "@ionic/react";
import { useContext } from "react";

import { accountsListEmptySelector } from "#/features/auth/authSelectors";
import { PageContext } from "#/features/auth/PageContext";
import AppContent from "#/features/shared/AppContent";
import { useAppSelector } from "#/store";

import IncognitoSvg from "./incognito.svg?react";

import sharedStyles from "#/features/shared/shared.module.css";
import styles from "./LoggedOut.module.css";

export default function LoggedOut() {
  const connectedInstance = useAppSelector(
    (state) => state.auth.connectedInstance,
  );
  const accountsListEmpty = useAppSelector(accountsListEmptySelector);

  const { presentLoginIfNeeded, presentAccountSwitcher } =
    useContext(PageContext);

  return (

    <AppContent 
        className={styles.content}
        scrollY={true}
        >

      <div>

        <IonText color="medium">
            <p className={styles.message}>
                You are browsing as a guest.
            </p>
        </IonText>

        <div className={styles.center}>

                <IonButton
                  expand="block"
                  onClick={() => {
                    presentLoginIfNeeded();
                  }}
                >
                  {accountsListEmpty ? "Get Started" : "Log In"}
                </IonButton>

        </div>

        {accountsListEmpty && (
            <div>
                <IonText color="medium">
                    <p className={styles.message}>

                        Seevoy does not support account registration.

                        <br />
                        <br />

                        If you do not have a Lemmy account, use your
                        desktop or other device to register a Lemmy 
                        account with your preferred Lemmy instance.
                    </p>
                </IonText>
            </div>
        )}

        {!accountsListEmpty && (
          <IonButton
            className="ion-padding-start ion-padding-end"
            expand="block"
            fill="clear"
            onClick={() => {
              presentAccountSwitcher();
            }}
          >
            Switch Accounts
          </IonButton>
        )}
      </div>

    </AppContent>
  );
}
