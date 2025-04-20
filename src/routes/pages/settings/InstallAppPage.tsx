import {
  IonBackButton,
  IonButtons,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  addOutline,
  checkmarkCircleOutline,
  chevronBack,
} from "ionicons/icons";
import { useContext, useRef, useState } from "react";

import { useSetActivePage } from "#/features/auth/AppContext";
import { BeforeInstallPromptContext } from "#/features/pwa/BeforeInstallPromptProvider";
import AppContent from "#/features/shared/AppContent";
import AppHeader from "#/features/shared/AppHeader";
import {
  getShareIcon,
  isAndroid,
  isAppleDeviceInstallable,
  isInstallable,
  isInstalled,
  ua,
} from "#/helpers/device";

import AppDetails from "./about/AppDetails";

import styles from "./InstallAppPage.module.css";

export default function InstallAppPage() {
  const pageRef = useRef<HTMLElement>(null);
  const [showInstallwebAppDirections, setShowInstallwebAppDirections] =
    useState(false);

  useSetActivePage(pageRef);

  const beforeInstallPrompt = useContext(BeforeInstallPromptContext);

  const nativeBadges = (
    <>
    </>
  );

  const howToGetAppTitle = (
    <h3 className={styles.h3}>
      {showInstallwebAppDirections && (
        <IonIcon
          icon={chevronBack}
          onClick={() => setShowInstallwebAppDirections(false)}
        />
      )}{" "}
      How to get the App
    </h3>
  );

  const badges = <div className={styles.badgeContainer}>{nativeBadges}</div>;

  const badgesWithWeb = (
    <div className={styles.badgeContainer}>
      {nativeBadges}
      <div className={styles.badgeItem}>
        <img
          className={styles.badgeImg}
          src="/badges/pwa.svg"
          alt=""
          onClick={async () => {
            if (!beforeInstallPrompt.event) {
              setShowInstallwebAppDirections(true);
              return;
            }

            try {
              await beforeInstallPrompt.event?.prompt();
            } finally {
              beforeInstallPrompt.clearEvent();
            }
          }}
        />
      </div>
    </div>
  );

  function renderGuidance() {
    const why = (
      <>
        <h3>Why</h3>
        <ol>
          <li>Easy access from your home screen</li>
          <li>Less Jank — Better page transitions and gestures</li>
          <li>Push notifications and badging — coming soon!</li>
        </ol>
      </>
    );

    if (isInstalled()) {
      return (
        <>
          <h3>
            <IonIcon icon={checkmarkCircleOutline} color="success" /> 
            {" "}
            App Installed
          </h3>
          <IonText color="medium">
            <p>Congrats, you're browsing from the webapp!</p>
          </IonText>
        </>
      );
    }

    if (ua.getDevice().vendor === "Apple" && navigator.maxTouchPoints > 1) {

      return (
        <>
            <br />
            <div>
                How to Install
            </div>

            <ol>
              <li>
                From the tab bar tap 
                <IonIcon icon={getShareIcon()} color="primary" /> 
              </li>
              <li>
                Scroll down and tap 
                Add to Home Screen 
                <IonIcon icon={addOutline} />
              </li>
            </ol>

        </>
      );

    }

    if (isInstallable) {
      return (
        <>
          {howToGetAppTitle}

          {showInstallwebAppDirections ? (
            <ol>
              <li>
                You may have the app already installed. Check your homescreen!
              </li>
              <li>
                If not, check for an &quot;install app&quot; button in your
                browser&apos;s controls
              </li>
            </ol>
          ) : (
            badgesWithWeb
          )}

          {why}
        </>
      );
    }

    return (
      <>
        {howToGetAppTitle}

        {showInstallwebAppDirections ? (
          <div>
              Visit
              {" "}
              <span className={styles.installLink}>
                http://seevoy.free.nf
              </span>
              {" "}
              or
              <span className={styles.installLink}>
                https://seevoy.free.nf
              </span>
              {" "}
              from your phone or tablet.
          </div>
        ) : (
          badgesWithWeb
        )}

        {why}
      </>
    );
  }

  return (
    <IonPage ref={pageRef} className="grey-bg">
      <AppHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" text="Settings" />
          </IonButtons>

          <IonTitle>Install</IonTitle>
        </IonToolbar>
      </AppHeader>
      <AppContent scrollY>
        <div className={styles.container}>
          <AppDetails />

          {renderGuidance()}
        </div>
      </AppContent>
    </IonPage>
  );
}
