import AppVersionInfo from "./AppVersionInfo";

import styles from "./AppDetails.module.css";

import { IonItemInAppExternalLink } from "#/features/shared/InAppExternalLink";

export default function AppDetails() {
  return (

    <>

      <div className={styles.container}>

        <img src="/logo.png" alt="" />

        <div>
            Seevoy
        </div>

      </div>
      
      <div className={styles.padding}>
            VERSION 1.0.287
      </div>

      <div className={styles.padding}>
        <p>
            Seevoy is a Lemmy client with large text support.
        </p>
      </div>

      <div className={styles.padding}>

        <IonItemInAppExternalLink
            detail
            href="https://github.com/jayb1dev/seevoy"
            target="_blank"
            rel="noopener noreferrer"
          >

          Seevoy is released under the
          AGPL-3.0 license.
          The source code is available here.

        </IonItemInAppExternalLink>

      </div>

    </>
  );
}
