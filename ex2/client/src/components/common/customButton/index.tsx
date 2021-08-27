import {TRANSITION} from "@constants";
import React, {useMemo, CSSProperties} from "react";
import {useDetechScreen} from '@hooks/useDetechScreen';
import './index.scss'

const customStyle: {
    desktop: CSSProperties,
    mobile: CSSProperties,
} = {
    desktop: {
        width: '8em',
        height: '3em',
        borderRadius: '1em',
    },
    mobile: {
        width: '80%',
        height: '2em',
        borderRadius: '1em',
    }


};

const CustomButton: React.FC<any> = (props) => {
    const {className, onClick} = props;
    const isDeskTop = useDetechScreen();
    return (
        <button style={isDeskTop ? customStyle.desktop : customStyle.mobile} onClick={onClick} className={className} >
            reset
        </button>
    )
}


export default React.memo(CustomButton);