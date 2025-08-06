import { IonIcon } from "@ionic/react";
import { imageOutline } from "ionicons/icons";
import { HTMLAttributes } from "react";

import { cx, sv } from "#/helpers/css";

import { IonItemInAppExternalLink } from "#/features/shared/InAppExternalLink";

import styles from "./MediaPlaceholder.module.css";

type State = "loading" | "loaded" | "error" | "custom";

interface MediaPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  state: State;
  defaultAspectRatio?: number;
  children?: React.ReactNode;
}

export default function MediaPlaceholder({
  state,
  className,
  children,
  defaultAspectRatio = 1.2,
  src,
  ...rest
}: MediaPlaceholderProps) {

  function renderIcon() {

    switch (state) {

      case "loading":
        return <IonIcon className={styles.loadingIcon} icon={imageOutline} />;

      case "error":
        return  <>
                    <div
                        style={{
                                    width:          `100%`,
                                    flexDirection:  `column`
                        }} >
                   
                        <div>
                            <span className={styles.error}>
                                Failed to load media.
                            </span>
                        </div>

                        <div style={{ height: `20px` }} >
                        </div>

                        {/*
                        <div style={{
                                        width:          `100%`,
                                        display:        `flex`,
                                        flexDirection:  `row`,
                                        justifyContent: `flex-end`
                                  }} >

                            <div>
                                Reload
                            </div>

                            <div style={{ padding: `10px` }} >
                            </div>

                        </div>
                        */}

                        {/*
                        <div style={{ height: `20px` }} >
                        </div>

                        <div style={{
                                        width:          `100%`,
                                        display:        `flex`,
                                        flexDirection:  `row`,
                                        justifyContent: `flex-end`
                                  }} >

                            <div
                                style={{
                                    width:          `100%`,
                                    marginLeft:     `auto`,
                                    marginRight:    `0`,
                                    display:        `flex`,
                                    justifyContent: `flex-end`,
                                    alignItems:     `end`  }} >
    
                                <IonItemInAppExternalLink
                                    details
                                    className={styles.rounded}
                                    href={src}
                                    target="_blank"
                                    rel="noopener noreferrer" >
    
                                    Link
        
                                </IonItemInAppExternalLink>
                            </div>

                            <div style={{ padding: `10px` }} >
                            </div>

                        </div>
                        */}
                       
                    </div>
                </>

      case "custom":
      case "loaded":
        return;
    }
  }

  return (
    <span
      {...rest}
      className={cx(
        styles.placeholderContainer,
        className,
        state !== "loaded" && "not-loaded",
      )}
      style={{ ...rest.style, ...sv({ defaultAspectRatio }) }}
    >
      {children}
      {renderIcon()}
    </span>
  );
}
