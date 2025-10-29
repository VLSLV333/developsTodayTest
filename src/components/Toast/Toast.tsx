import { useState, useEffect } from 'react';

import styles from './Toast.module.css'

import { AiOutlineClose } from "react-icons/ai";

type ToastProps = {
    text: string,
    fadeTimeSec: number,
    type: 'fade' | 'slide',
    closeBtn: boolean,
    color: 'success' | 'error' | 'notification'
}

export default function Toast({ text, fadeTimeSec, type, closeBtn, color }: ToastProps) {

    const FADETIMEOUT = 1000

    const [toastInDom, setToastInDom] = useState(true)
    const [hideToast, setHideToast] = useState(false)

    const bgColor = color === 'success' ? '#36a832' : color === 'error' ? '#a83244' : '#3234a8'

    useEffect(() => {

        const timeoutToHide = setTimeout(() => {
            setHideToast(true)
        }, fadeTimeSec * 1000)

        const timeoutToRemoveFromDom = setTimeout(() => {
            setToastInDom(false)
        }, fadeTimeSec * 1000 + FADETIMEOUT)

        return () => {
            clearTimeout(timeoutToHide)
            clearTimeout(timeoutToRemoveFromDom)
        }

    }, [])

    const startAnimation = type === 'fade' ? styles.fadeIn : styles.slideIn
    const endAnimation = type === 'fade' ? styles.fadeOut : styles.slideOut

    return (
        <>
            {toastInDom && <div className={`${styles.container} ${startAnimation} ${hideToast ? endAnimation : ''}`} style={{ backgroundColor: `${bgColor}` }}>
                <h1>{text}</h1>
                {closeBtn && <AiOutlineClose className={styles.close} onClick={() => setToastInDom(false)} />}
            </div >}
        </>
    )
}