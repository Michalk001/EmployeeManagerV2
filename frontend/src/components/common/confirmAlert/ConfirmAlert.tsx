import React, {FC} from "react";

import styles from "./style.module.scss"
import {Button, typeButtonAction} from "../../button";
import {IConfirmAlert} from "./types";

export const ConfirmAlert:FC<IConfirmAlert> = (props) =>{

    const {buttons,content,isOpen} = props

    return(
        <>{isOpen &&
        <div className={styles.wrap}>
                <div className={styles.box}>
                    <div className={styles.content}>{content}</div>
                    <div className={styles.buttons}>
                        {buttons.map(button =>
                            <Button key={button.id}
                                    label={button.label}
                                    typeAction={typeButtonAction.button}
                                    typeButton={button.typeButton}
                                    onClick={button.onClick}
                                    id={button.id}
                            />
                        )}
                    </div>
                </div>
        </div>
        } </>)

}