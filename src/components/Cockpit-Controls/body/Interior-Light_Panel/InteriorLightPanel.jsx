import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';

import configData from "../../../../data/InteriorLightData.json"

import styled, { keyframes, css } from 'styled-components';
import { RequestQuoteRounded } from '@mui/icons-material';

const imgScaleSmall = 100;
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
    background-image: url(./resources/InteriorLightingPanel/InteriorLighting.png);
    background-color: rgb(20, 20, 19);
    background-repeat: no-repeat;
    background-size: contain;
    width: ${props => (props.scale * 1000 / 100)}px;
    height: ${props => (props.scale * 600 / 100)}px;
    position: relative; 
`

const InteriorLight2WaysComponent = styled.img.attrs(props => ({
    //src: props.state === true ? props.data.image_on : props.data.image_off,
    src: props.data.image_off,
}))`
    position: absolute;
    width: ${props => (props.scale * props.data.width / 100)}px;
    top: ${props => (props.scale * (Number(props.data.top) + Number(props.data.offset_off)) / 100)}px;
    left: ${props => (props.scale * props.data.left / 100)}px;
`

const InteriorLight3WaysComponent = styled.img.attrs(props => ({
    src: props.state === "up" ? props.data.image_up : props.state === "center" ? props.data.image_center : props.data.image_down
}))`
    position: absolute;
    width: ${props => (props.scale * props.data.width / 100)}px;
    top: ${props => (props.scale * (Number(props.data.top) + Number(props.data.offset_off)) / 100)}px;
    left: ${props => (props.scale * props.data.left / 100)}px;

`
const InteriorLightAnalogKnobComponent = styled.img.attrs(props => ({
    src: props.data.image_off,
}))`
    position: absolute;
    width: ${props => (props.scale * props.data.width / 100)}px;
    top: ${props => (props.scale * (Number(props.data.top) + Number(props.data.offset_off)) / 100)}px;
    left: ${props => (props.scale * props.data.left / 100)}px;
    transform: ${props => `rotate(${props.rot}deg)`};
`

const ComponentContainer = styled.div.attrs(props => ({
}))`
position: absolute;
display: grid;
width: ${props => (props.scale * props.data.width * Number(props.data.limit_factor) / 100)}px;
height: ${props => (props.scale * props.data.width * Number(props.data.limit_factor) / 100)}px;
top: ${props => (props.scale * (Number(props.data.top) + (Number(props.data.width) / 2) * (1 - Number(props.data.limit_factor))) / 100)}px;
left: ${props => (props.scale * (Number(props.data.left) + (Number(props.data.width) / 2) * (1 - Number(props.data.limit_factor))) / 100)}px;
border: ${props => (props.debugMode === true ? "dashed" : null)};
border-color: ${props => (props.debugMode === true ? "cyan" : null)};
`

const InteriorLightPanel = (props) => {

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



    const InteriorLightComponent = (props) => {
        // if (props.buttonData.type === "Switch2Ways") {
        // console.log(props)
        // }
        if (props.buttonData.type === "Switch2Ways") {
            return (<InteriorLight2WaysComponent
                scale={props.scale}
                state={true}
                data={props.buttonData}
                name={props.buttonData.beckend_name}
            />
            )
        } else if (props.buttonData.type === "Switch3Ways") {
            return (
                <InteriorLight3WaysComponent
                    scale={props.scale}
                    change={getBlinkingButtonsValue(props.buttonData)}
                    //state={getStateValue(props.buttonData.beckend_name)}
                    state={get3StatesValue(props.buttonData.beckend_name)}
                    data={props.buttonData}
                    name={props.buttonData.beckend_name}
                    onClick={handleOnClick} />
            )
        } else if (props.buttonData.type === "AnalogKnob") {
            const analogValue = getAnalogValue(props.buttonData.beckend_name);
            let rotValue = 3.3 * analogValue + 15;
            return (
                <InteriorLightAnalogKnobComponent
                    scale={props.scale}
                    data={props.buttonData}
                    name={props.buttonData.beckend_name}
                    rot={rotValue}
                />
            )
        }
    }

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
            for (let index = 0; index < configData.length; index++) {
                if (c[0] === configData[index].beckend_name) {
                    return configData[index].key;
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
        const filtered = asArray.filter(([key, value]) => key === cbData)
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

    const get3StatesValue = (cbData) => {
        const asArray = Object.entries(cockpitControlState);
        const filtered = asArray.filter(([key, value]) => key === cbData)
        //console.log("filtered values  " + filtered)
        // Assume that we found only one match value ([0]) and we want the value ([1])
        if (filtered.length < 1) {
            return false;
        } else {
            return filtered[0][1];
        }
    }

    const getAnalogValue = (cbData) => {
        const asArray = Object.entries(cockpitControlState);
        const filtered = asArray.filter(([key, value]) => key === cbData)
        //console.log("filtered values  " + filtered)
        // Assume that we found only one match value ([0]) and we want the value ([1])
        if (filtered.length < 1) {
            return false;
        } else {
            return filtered[0][1];
        }
    }

    const getStringValue = (knobData) => {
        const asArray = Object.entries(cockpitControlState);
        // console.log(cockpitControlState)
        // console.log(knobData)
        const filtered = asArray.filter(([key, value]) => key === knobData)
        //console.log(filtered)
        if (filtered.length < 1) {
            return false;
        } else {
            return filtered[0][1];
        }
    }

    const getBlinkingButtonsValue = (cbData) => {
        return blinkingButtons[cbData.key] > 0 ? true : false;
    }

    const getDebugData = (ccData, tile) => {
        if (ccData.grid_direction === "left-right") {
            if (ccData.grid_size === "2") {
                if (tile === 0) return "L";
                else return "R";
            } else if (ccData.grid_size === "3") {
                if (tile === 0) return "L";
                else if (tile === 1) return "M";
                else return "R";
            } else return "NA"
        } else if (ccData.grid_direction === "up-down") {
            if (ccData.grid_size === "2") {
                if (tile === 0) return "U";
                else return "D";
            } else if (ccData.grid_size === "3") {
                if (tile === 0) return "U";
                else if (tile === 1) return "M";
                else return "D";
            } else return "NA"
        } else {
            return "NA"
        }

    }

    const handleOnClick = (e) => {
        console.log('Inrerior Lights:Panel => On mouse down ...', e.target.id, " on ", e.target.ariaLabel);

        let value = "";
        if (e.target.ariaLabel === "NORMLTG_LIGHT") {
            switch (e.target.id) {
                case "1":
                    value = "up";
                    break;
                case "2":
                    value = "center";
                    break;
                case "3":
                    value = "down";
                    break;
                default:
                    break;
            }
        }

        sendNewValues("NORMLTG_LIGHT", value);

    }


    var tempInterval = useRef();
    let i = Number(getAnalogValue("FLOOD_CONSOLES_LIGHT"));

    const handleOnMouseDown = (e) => {


        console.log('Inrerior Lights:Panel => On mouse down ...', e.target.id, " on ", e.target.ariaLabel);
        console.log(tempInterval)
        tempInterval.current = setInterval(() => {
            console.log("holding mouse down", i);
            if (e.target.id === "2") {
                i = i + 1;
                if (i > 100) i = 100;
            }
            if (e.target.id === "1") {
                i = i - 1;
                if (i < 0) i = 0;
            }
            sendNewValues("FLOOD_CONSOLES_LIGHT", String(i))
        }, 50);
    }

    const handleOnMouseUp = (e) => {
        console.log('Inrerior Lights:Panel => On mouse up ...', e.target.id, " on ", e.target.ariaLabel);
        clearInterval(tempInterval.current);
    }

    const sendNewValues = (name, value) => {
        let arrVal = ["", ""];    
        if (name === "NORMLTG_LIGHT") {
            arrVal = [value, getAnalogValue("FLOOD_CONSOLES_LIGHT")];
        } else if (name === "FLOOD_CONSOLES_LIGHT") {
            arrVal = [get3StatesValue("NORMLTG_LIGHT"), value];
        }
        console.log(arrVal)
        props.handleSendInteriorLightsCommand(arrVal)
    }


    return (
        <>
            <Panel scale={imgScaleSmall}>
                {configData.map(buttonData =>
                    <div>

                        <InteriorLightComponent
                            scale={imgScaleBig}
                            buttonData={buttonData}
                        />
                        <ComponentContainer
                            scale={imgScaleBig}
                            data={buttonData}
                            name={buttonData.beckend_name}
                            factor={buttonData.limit_factor}
                            debugMode={props.debugMode}>
                            {
                                buttonData.grid_direction === "none" ? null :
                                    Array.from(Array(Number(buttonData.grid_size)).keys()).map(tile => {
                                        return <div
                                            id={tile + 1}
                                            aria-label={buttonData.beckend_name}
                                            style={{
                                                "font-size": `${props.debugMode === true ? "40px" : null}`,
                                                "color": `${props.debugMode === true ? "blueviolet" : null}`,
                                                "grid-row-start": `${buttonData.grid_direction === "up-down" ? tile + 1 : 1}`,
                                                "grid-column-start": `${buttonData.grid_direction === "left-right" ? tile + 1 : 1}`,
                                                "width": `${buttonData.grid_direction === "up-down" ? imgScaleBig * Number(buttonData.width) * Number(buttonData.limit_factor) / 100 :
                                                    imgScaleBig * Number(buttonData.width) * Number(buttonData.limit_factor) / 100 / Number(buttonData.grid_size)}px`,
                                                "height": `${buttonData.grid_direction === "up-down" ? imgScaleBig * Number(buttonData.width) * Number(buttonData.limit_factor) / 100 / Number(buttonData.grid_size) :
                                                    imgScaleBig * Number(buttonData.width) * Number(buttonData.limit_factor) / 100}px`,
                                                "display": "flex",
                                                "align-content": "center",
                                                "align-items": "start",
                                                "justify-content": "start",
                                                "border": `${props.debugMode === true ? "1px solid #4a4d56" : "none"}`
                                            }}
                                            onClick={buttonData.type === "AnalogKnob" ? null : handleOnClick}
                                            onMouseDown={buttonData.type === "AnalogKnob" ? handleOnMouseDown : null}
                                            onMouseUp={buttonData.type === "AnalogKnob" ? handleOnMouseUp : null}>
                                            {props.debugMode === false ? null : getDebugData(buttonData, tile)}
                                        </div>
                                    })
                            }
                        </ComponentContainer>
                    </div>
                )}
            </Panel>
        </>
    )
}

export default InteriorLightPanel;