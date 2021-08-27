import {useLayoutEffect, useState} from "react";
import {useMediaQuery} from 'react-responsive'

const useDetechScreen = () => {
    const isDestopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    return isDestopOrLaptop;
}

export {
    useDetechScreen
}