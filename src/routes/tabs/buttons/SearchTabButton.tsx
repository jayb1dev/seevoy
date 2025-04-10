import { IonIcon, IonLabel } from "@ionic/react";
import { search, searchCircleOutline } from "ionicons/icons";

import { focusSearchBar } from "#/routes/pages/search/SearchPage";

import SharedTabButton, { TabButtonProps } from "./shared";

function SearchTabButton(props: TabButtonProps) {
  return (
    <SharedTabButton
      {...props}
      onBeforeBackAction={focusSearchBar}
      onLongPressExtraAction={onLongPressExtraAction}
    >
      <IonIcon aria-hidden="true" icon={searchCircleOutline} />
      <IonLabel>SEARCH</IonLabel>
    </SharedTabButton>
  );
}

function onLongPressExtraAction() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        focusSearchBar();
      });
    });
  });
}

/**
 * Signal to Ionic that this is a tab bar button component
 */
SearchTabButton.isTabButton = true;

export default SearchTabButton;
