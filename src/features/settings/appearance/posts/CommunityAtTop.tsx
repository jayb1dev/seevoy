import { IonItem, IonToggle } from "@ionic/react";

import { useAppDispatch, useAppSelector } from "#/store";

import { setCommunityAtTop } from "../../settingsSlice";

export default function CommunityAtTop() {
  const dispatch = useAppDispatch();
  const communityAtTop = useAppSelector(
    (state) => state.settings.appearance.posts.communityAtTop,
  );

  return (
    <IonItem>
      <IonToggle
        checked={communityAtTop}
        onIonChange={(e) => {
          dispatch(setCommunityAtTop(e.detail.checked));
        }}
      >
        <span className="ion-text-wrap">Show Community at Top</span>
      </IonToggle>
    </IonItem>
  );
}
