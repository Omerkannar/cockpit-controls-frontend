import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import fuelData from "../../../../data/FuelData.json"

import styled, { keyframes, css } from 'styled-components';

const imgScaleSmall = 80;
const imgScaleBig = 100;    // image scale [%] 

const Blink = keyframes`
    0% {
        border-style: hidden; border-width: thin; border-color:yellow;border-radius:5px;
    }
    25% {
        border-style: solid; border-width: thin; border-color:yellow;border-radius:5px;
    }
    50% {
        border-style: hidden; border-width: thin; border-color:yellow;border-radius:5px;
    }
    75% {
        border-style: solid; border-width: thin; border-color:yellow;border-radius:5px;
    }
    100% {
        border-style: hidden; border-width: thin; border-color:yellow;border-radius:5px;
    }
`;


const Panel = styled.div.attrs(props => ({
    onclick: props.onClick
}))`
    background-image: url(./resources/FuelPanel/fuel_panel_background.png);
    background-color: rgb(20, 20, 19);
    background-repeat: no-repeat;
    background-size: contain;
    width: ${props => (props.scale * 850 / 100)}px;
    height: ${props => (props.scale * 300 / 100)}px;
    position: relative; 
`


const FuelComponent = styled.img.attrs(props => ({
    src: props.state === true ? props.data.image_on : props.data.image_off,
}))`
    position: absolute;
    width: ${props => (props.scale * props.data.width / 100)}px;
    top: ${props => props.state === true ?
        ((props.scale * (Number(props.data.top) + Number(props.data.offset_on))) / 100) :
        ((props.scale * (Number(props.data.top) + Number(props.data.offset_off))) / 100)}px;
    left: ${props => (props.scale * props.data.left / 100)}px;
    animation: ${props => (props.change === true ? css`${Blink} 2s linear infinite;` : '')};
    border: solid;
    border-color: cyan;

`

const FuelPanel = (props) => {

    const [cockpitControlState, setCockpitControlState] = useState(props.cockpitControlState);
    const [cockpitControlPreviousState, setCockpitControlPreviousState] = useState({});
    const [blinkingButtons, setBlinkingButtons] = useState([]);

    const [temp, setTemp] = React.useState(0);

    useEffect(() => {
        const tempInterval = setInterval(() => {
            setTemp((prevTemp) => prevTemp + 1)
        }, 1000);
        return () => {
            clearInterval(tempInterval);
        }
    }, []);

    useEffect(() => {
        handleCockpitControlChange(props.cockpitControlState);

    }, [temp]);



    const handleCockpitControlChange = (obj) => {
        // update cockpit controls state with new data
        setCockpitControlState(obj);
        // save the previous cockpit controls state data
        setCockpitControlPreviousState(cockpitControlState);
        handleDetectionCockpitControlChange();
    }

    const handleDetectionCockpitControlChange = () => {
        const changes = _.differenceWith(_.toPairs(cockpitControlState), _.toPairs(cockpitControlPreviousState), _.isEqual);
        const changesKeys = changes.map(c => {
            //console.log(c[0])
            for (let index = 0; index < fuelData.length; index++) {
                if (c[0] === fuelData[index].beckend_name) {
                    return fuelData[index].key;
                }
            }
        })
        //console.log(changesKeys)
        let tempIoChangeArr = blinkingButtons;
        changesKeys.forEach(element => {
            // New change
            tempIoChangeArr[element] = 6;
        });
        for (let index = 0; index < tempIoChangeArr.length; index++) {
            if (tempIoChangeArr[index] > 0) {
                tempIoChangeArr[index] = tempIoChangeArr[index] - 1;
            }
        }
        // console.log(tempIoChangeArr)
        setBlinkingButtons(tempIoChangeArr);
    }

    const getStateValue = (cbData) => {
        const asArray = Object.entries(cockpitControlState);
        const filtered = asArray.filter(([key, value]) => key === cbData.beckend_name)
        //console.log("filtered values  " + filtered)
        // Assume that we found only one match value ([0]) and we want the value ([1])
        if (filtered.length < 1) {
            //console.log('filtered is null');
            return false;
        } else {
            //console.log(filtered[0][1]);
            return filtered[0][1] === 'True' ? true : false;
        }
    }

    const getBlinkingButtonsValue = (cbData) => {
        return blinkingButtons[cbData.key] > 0 ? true : false;
    }

    const handelOnFuelClick = (e) => {
        console.log(e)
        if (e.pageY - e.target.y > e.target.clientHeight / 2) {
            console.log("Lower Half on "+ e.target.name)
        } else {
            console.log("Upper Half on "+ e.target.name)
        }


        // console.log("offsetTop:", e.target.offsetTop)
        // console.log("offsetTop:", e.clientY - e.target.offsetTop )
        // //console.log("client - screen x:", e.clientX - e.screenX)
        // console.log("client - screen y:", e.clientY- e.screenY)
        // console.log("target - screen y:", e.target.y- e.screenY)
        // console.log(getStateValue(e))
        switch (e.target.name) {
            case 'FUEL_PUMP1':
                props.handleSendCommand(!getStateValue(0), getStateValue(fuelData[1]), getStateValue(fuelData[2]), getStateValue(fuelData[3]))
                break;
            case 'FUEL_PUMP2':
                props.handleSendCommand(getStateValue(0), !getStateValue(fuelData[1]), getStateValue(fuelData[2]), getStateValue(fuelData[3]))
                break;
            case 'FUEL_XFER':
                props.handleSendCommand(getStateValue(0), getStateValue(fuelData[1]), !getStateValue(fuelData[2]), getStateValue(fuelData[3]))
                break;
            case 'FUEL_VALVE':
                props.handleSendCommand(getStateValue(0), getStateValue(fuelData[1]), getStateValue(fuelData[2]), !getStateValue(fuelData[3]))
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Panel scale={imgScaleSmall}>
                {fuelData.map(buttonData =>
                    <FuelComponent
                        scale={imgScaleSmall}
                        change={getBlinkingButtonsValue(buttonData)}
                        state={getStateValue(buttonData)}
                        data={buttonData}
                        name={buttonData["beckend_name"]}
                        onClick={
                            // handelOnFuelClick(buttonData)
                            handelOnFuelClick
                        } />
                )}
            </Panel>
        </>
    )
}

export default FuelPanel;