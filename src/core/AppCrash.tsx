import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { logoGithub } from "ionicons/icons";
import { FallbackProps } from "react-error-boundary";

import { loggedInSelector } from "#/features/auth/authSelectors";
import { isInstalled, isNative } from "#/helpers/device";
import { unloadServiceWorkerAndRefresh } from "#/helpers/serviceWorker";
import { memoryHistory } from "#/routes/common/Router";
import store from "#/store";

import styles from "./AppCrash.module.css";

export default function AppCrash({ error }: FallbackProps) {
  // Don't use useLocation/useAppSelector, because they are not available
  // (`<AppCrash />` is at the root of the document tree)
  const location = memoryHistory ? memoryHistory.location : window.location;
  const loggedIn = loggedInSelector(store.getState());

  let crashData = `
### Crash description

<!-- Write any information here to help us debug your crash! -->
<!-- What were you doing when the crash occurred? -->

### Device and app metadata

  - window.location.href: \`${window.location.href}\`
  - react-router location.pathname: \`${location.pathname}\`
  - Logged in? \`${loggedIn}\`
  - Native app? \`${isNative()}\`
  - Installed to home screen? \`${isInstalled()}\`
  - APP_VERSION: \`${import.meta.env.APP_VERSION}\`
  - APP_BUILD: \`${import.meta.env.APP_BUILD}\`
  - APP_GIT_REF: \`${import.meta.env.APP_GIT_REF}\`
  - BUILD_FOSS_ONLY: \`${import.meta.env.BUILD_FOSS_ONLY}\`
  - User agent: \`${navigator.userAgent}\`

### Crash data

Error: \`\`${error}\`\`

#### Stack trace

\`\`\`
  `.trim();

  crashData = `${crashData}\n${error instanceof Error ? error.stack : "Not available"}`;

  async function clearData() {
    if (
      !confirm(
        "Are you sure? This will log you out of all accounts and delete all local app data including app configuration, hidden posts and favorites.",
      )
    )
      return;

    localStorage.clear();
    sessionStorage.clear();

    const dbs = await window.indexedDB.databases();
    for (const db of dbs) {
      if (db.name) window.indexedDB.deleteDatabase(db.name);
    }

    alert("All data cleared.");
  }

  return (
    <div className={styles.container}>

      <h2>Seevoy crashed!</h2>

    </div>
  );
}

function generateCrashUrl(crashData: string): string {
  return `https://github.com/aeharding/voyager/issues/new?title=Crash&body=${encodeURIComponent(
    crashData,
  )}`;
}

// The GitHub GET endpoint for opening a new issue
// has a restriction for maximum length of a URL: 8192 bytes
// https://github.com/cli/cli/pull/3271
// https://github.com/cli/cli/issues/1575
// https://github.com/cli/cli/blob/trunk/pkg/cmd/issue/create/create.go#L167
// https://github.com/cli/cli/blob/trunk/utils/utils.go#L84
const maxIssueBytes = 8150;

function getStrByteLength(str: string): number {
  return new TextEncoder().encode(str).length;
}

function generateTruncatedCrashUrl(crashData: string): string {
  let url: string;
  let strLength = 1;

  do {
    url = generateCrashUrl(crashData.slice(0, strLength));
    if (strLength === crashData.length) return url;
    strLength++;
  } while (getStrByteLength(url) < maxIssueBytes);

  return url;
}
