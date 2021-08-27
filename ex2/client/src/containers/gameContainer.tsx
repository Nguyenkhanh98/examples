
import React, {useState} from "react";
import Button from '@components/button';
import './index.scss';
import {TRANSITION} from "@constants";
import ButtomCustom from "@components/common/customButton";
import {TransitionService} from '@services';
import {useEffect} from "react";
const GameContainer = () => {
    const [state, setState] = useState<TRANSITION.STATE>(TRANSITION.STATE.BLU);


    const getTransition = async (stateClick) => {
        const {data} = await TransitionService.getNextState(stateClick);

        const {state: nextState} = data;
        setState(nextState);
    }

    const reset = async () => {
        const nextState = await TransitionService.reset();
        const {state: newState} = nextState.data;
        setState(newState);
    }

    const onReset = () => {
        reset();
    }

    useEffect(() => {
        getTransition(state);
    }, []);

    const renderGame = TRANSITION.LIST_STATE.map((eachState) => {

        return (<li >
            <Button state={eachState} isActived={eachState === state} onClick={() => getTransition(eachState)} />
        </li>)
    });

    return (
        <>
            <div >

                <ul className="map">

                    {renderGame}
                    <li>
                        <ButtomCustom className="button--rotate" onClick={onReset} />
                    </li>

                </ul>

            </div>

        </>
    )
}

export default GameContainer;