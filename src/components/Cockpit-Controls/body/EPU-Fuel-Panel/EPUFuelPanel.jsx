import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import configData from "../../../../data/EPUFuelData.json"

import styled, { keyframes, css } from 'styled-components';
import { RequestQuoteRounded } from '@mui/icons-material';

const imgScaleSmall = 100;
const imgScaleBig = 100;    // image scale [%] 


const Panel = styled.div.attrs(props => ({
    onclick: props.onClick
}))`
    background-image: url(./resources/EPUFuelPanel/EPU_Fuel_New.png);
    background-color: rgb(20, 20, 19);
    background-repeat: no-repeat;
    background-size: contain;
    width: ${props => (props.scale * 375 / 100)}px;
    height: ${props => (props.scale * 375 / 100)}px;
    position: relative; 
`

const Cover = styled.div.attrs(props => ({
    onclick: props.onClick
}))`
    background-image: url(./resources/EPUFuelPanel/EPU_Fuel_2.png);
    background-color: rgb(20, 20, 19);
    background-repeat: no-repeat;
    background-size: contain;
    width: ${props => (props.scale * 375 / 100)}px;
    height: ${props => (props.scale * 375 / 100)}px;
    position: relative; 
`

const EPUFuelAnalogComponent = styled.img.attrs(props => ({
    src: props.data.image_off,
}))`
    position: absolute;
    width: ${props => (props.scale * props.data.width / 100)}px;
    top: ${props => (props.scale * (Number(props.data.top) + Number(props.offset_top)) / 100)}px;
    left: ${props => (props.scale * (Number(props.data.left) + Number(props.offset_left)) / 100)}px;
    transform: ${props => `rotate(${props.rot}deg)`};
`


const EPUFuelPanel = (props) => {

    //console.log(props.cockpitControlState)

    const [cockpitControlState, setCockpitControlState] = useState(props.cockpitControlState);
    const [cockpitControlPreviousState, setCockpitControlPreviousState] = useState({});
    const [blinkingButtons, setBlinkingButtons] = useState([]);
    const [prevFuelLevel, setPrevFuelLevel] = useState(0.0);

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





    const EPUFuelComponent = (props) => {
        if (props.buttonData !== undefined && props.buttonData.type === "Analog") {
            const fuelLevel = getAnalogValue(props.buttonData.beckend_name); // boragoraIN
            let computedFuelLevel = fuelLevel;
            const k = 1; // 0 - filter everything, 1 - don't filter [0..1]
            if (Math.abs(fuelLevel - prevFuelLevel) > 1e-3) {      // Change state
                if (Math.abs(fuelLevel - prevFuelLevel) > props.buttonData.value_to_extarpolate) { // Extrapolate
                    //    new_filtered_value = k * raw_sensor_value + (1 - k) * old_filtered_value
                    computedFuelLevel = k * fuelLevel + (1-k) * prevFuelLevel;
                    setPrevFuelLevel(computedFuelLevel);
                } else {    // Don't extarpolte
                    setPrevFuelLevel(computedFuelLevel);
                }
            }
            const needleRotation = 2.32 * computedFuelLevel - 117;
            const needleOffsetLeft = -0.2 * computedFuelLevel + 10;
            let needleOffsetTop = 0;
            if (computedFuelLevel < 50) {
                needleOffsetTop = 0.2 * computedFuelLevel - 10;
            } else {
                needleOffsetTop = -0.2 * computedFuelLevel + 10;
            }
            return (
                <EPUFuelAnalogComponent
                    scale={props.scale}
                    state={getAnalogValue(props.buttonData.beckend_name)}
                    data={props.buttonData}
                    name={props.buttonData.beckend_name}
                    offset_left={needleOffsetLeft}
                    offset_top={needleOffsetTop}
                    rot={needleRotation} />
            )
        }
    }

    const handleCockpitControlChange = (obj) => {
        // update cockpit controls state with new data
        setCockpitControlState(obj);
        // save the previous cockpit controls state data
        setCockpitControlPreviousState(cockpitControlState);
        //handleDetectionCockpitControlChange();
    }



    const getAnalogValue = (cbData) => {
        const asArray = Object.entries(cockpitControlState);
        const filtered = asArray.filter(([key, value]) => key === cbData)
        //console.log("filtered values  " + filtered)
        // Assume that we found only one match value ([0]) and we want the value ([1])
        if (filtered.length < 1) {
            //console.log('filtered is null');
            return false;
        } else {
            //console.log(filtered[0][1]);
            return filtered[0][1]
        }
    }


    return (
        <>
            <Panel scale={imgScaleSmall}>
                <Cover>
                    {configData.map(buttonData =>
                        <EPUFuelComponent
                            scale={imgScaleBig}
                            buttonData={buttonData}
                        />
                    )}
                </Cover>
            </Panel>

        </>
    )
}

export default EPUFuelPanel;