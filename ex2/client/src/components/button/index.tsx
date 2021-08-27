import {TRANSITION} from "@constants";
import React, {useMemo} from "react";
import './index.scss'
interface IButton {
    state: TRANSITION.STATE,
    isActived?: boolean,
    onClick?: () => void
}

const Button: React.FC<IButton> = (props) => {
    const {state, isActived, onClick} = props;

    let buttonClass = `dot dot--${state.toLocaleLowerCase()}`;
    if (isActived) {
        buttonClass += " active";
    }
    return (
        <span className={buttonClass} onClick={onClick}></span>
    )
}

Button.defaultProps = {
    isActived: false
}

export default React.memo(Button);