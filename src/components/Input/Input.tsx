import { useState } from "react";

import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from "react-icons/ai";
import styles from './Input.module.css'

type InputProps = {
    type: 'text' | 'password' | 'number';
    clearable: boolean,
}

export default function Input({ type, clearable }: InputProps) {

    const [inputValue, setInputValue] = useState('')

    const passwordInput = type === 'password'

    const bothIcons = passwordInput && clearable

    const [hidePassword, setHidePassword] = useState(true)

    const currentType = passwordInput ? (hidePassword ? 'password' : 'text') : type

    function handlePasswordToggle() {
        setHidePassword((prevState) => !prevState)
    }

    function handleInputClear() {
        setInputValue('')
    }

    return (
        <div className={styles.inputContainer}>

            <input className={styles.input} type={currentType} value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
            {clearable && <AiOutlineClose className={styles.IconBaseStyling} onClick={handleInputClear} style={{ right: `${bothIcons ? '1.8rem' : '0.4rem'}` }} />}
            {passwordInput && !hidePassword && <AiFillEye className={styles.IconBaseStyling} onClick={handlePasswordToggle} />}
            {passwordInput && hidePassword && <AiFillEyeInvisible className={styles.IconBaseStyling} onClick={handlePasswordToggle} />}
        </div>
    )
}
