import React, { useState, useEffect } from 'react';
import _ from 'lodash';
//import { ComponentContainer } from '../Body.styles';
import "./CMDSPanel.css"

import configData from "../../../../data/CmdsData.json"

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
    background-image: url(./resources/CMDSPanel/CMDS_v1.png);
    background-color: rgb(20, 20, 19);
    background-repeat: no-repeat;
    background-size: contain;
    width: ${props => (props.scale * 1000 / 100)}px;
    height: ${props => (props.scale * 600 / 100)}px;
    position: relative; 
`

const CMDS5WaysComponent = styled.img.attrs(props => ({
    src: props.data.image_off,
}))`
    position: absolute;
    width: ${props => (props.scale * props.data.width / 100)}px;
    top: ${props => (props.scale * (Number(props.data.top) + Number(props.data.offset_off)) / 100)}px;
    left: ${props => (props.scale * props.data.left / 100)}px;
    transform: ${props => `rotate(${props.rot}deg)`};
`
const CMDS6WaysComponent = styled.img.attrs(props => ({
    src: props.data.image_off,
}))`
    position: absolute;
    width: ${props => (props.scale * props.data.width / 100)}px;
    top: ${props => (props.scale * (Number(props.data.top) + Number(props.data.offset_off)) / 100)}px;
    left: ${props => (props.scale * props.data.left / 100)}px;
    transform: ${props => `rotate(${props.rot}deg)`};
`

const CMDSNumberComponent = styled.img.attrs(props => ({
    src: props.value === "1" ? props.data.image_1 : props.value === "2" ? props.data.image_2 :
        props.value === "3" ? props.data.image_3 : props.value === "4" ? props.data.image_4 :
            props.value === "5" ? props.data.image_5 : props.value === "6" ? props.data.image_6 :
                props.value === "7" ? props.data.image_7 : props.value === "8" ? props.data.image_8 :
                    props.value === "9" ? props.data.image_9 : props.data.image_0
}))`
    position: absolute;
    width: ${props => (props.scale * props.data.width / 100)}px;
    top: ${props => (props.scale * (Number(props.data.top) + Number(props.data.offset_off)) / 100)}px;
    left: ${props => (props.scale * props.data.left / 100)}px;

`

// const CMDS2WaysComponent = styled.img.attrs(props => ({
//     src: props.state === true ? props.data.image_on : props.data.image_off,
// }))`
//     position: absolute;
//     width: ${props => (props.scale * props.data.width / 100)}px;
//     top: ${props => props.state === true ?
//         ((props.scale * (Number(props.data.top) + Number(props.data.offset_on))) / 100) :
//         ((props.scale * (Number(props.data.top) + Number(props.data.offset_off))) / 100)}px;
//     left: ${props => (props.scale * props.data.left / 100)}px;
//     animation: ${props => (props.change === true ? css`${Blink} 2s linear infinite;` : '')};
// `

const CMDS2WaysComponent = styled.img.attrs(props => ({
    src: props.state === true ? props.data.image_on : props.data.image_off,
}))`
    position: absolute;
    width: ${props => (props.scale * props.data.width / 100)}px;
    top: ${props => props.state === true ?
        ((props.scale * (Number(props.data.top) + Number(props.data.offset_on))) / 100) :
        ((props.scale * (Number(props.data.top) + Number(props.data.offset_off))) / 100)}px;
    left: ${props => (props.scale * props.data.left / 100)}px;
`

const CMDS2WaysComponentColor = styled.img.attrs(props => ({
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

const CMDSPanel = (props) => {

    //console.log(props.cockpitControlState)

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




    // const CMDSComponent = styled.img.attrs(props => ({
    //     src: props.state === true ? props.data.image_on : props.data.image_off,
    // }))`
    //     position: absolute;
    //     width: ${props => (props.scale * props.data.width / 100)}px;
    //     top: ${props => props.state === true ?
    //         ((props.scale * (Number(props.data.top) + Number(props.data.offset_on))) / 100) :
    //         ((props.scale * (Number(props.data.top) + Number(props.data.offset_off))) / 100)}px;
    //     left: ${props => (props.scale * props.data.left / 100)}px;
    //     animation: ${props => (props.change === true ? css`${Blink} 2s linear infinite;` : '')};

    // `

    const CMDSComponent = (props) => {

        if (props.buttonData.type === "Switch2Ways") {
            return (
                <CMDS2WaysComponent
                    scale={props.scale}
                    change={getBlinkingButtonsValue(props.buttonData)}
                    state={getStateValue(props.buttonData.beckend_name)}
                    data={props.buttonData}
                    name={props.buttonData.beckend_name}
                />
            )
        } else if (props.buttonData.type === "Knob5Ways") {
            // const analogVal = getAnalogValue(props.buttonData);
            // const dialRotation = 270 * analogVal - 135;
            //console.log(props.buttonData);
            const prgmStatus = getStringValue(props.buttonData.beckend_name);
            //console.log(prgmStatus);


            return (
                <CMDS5WaysComponent scale={props.scale}
                    rot={
                        prgmStatus === "bit" ? props.buttonData.prgm_bit_rotation :
                            prgmStatus === "1" ? props.buttonData.prgm_1_rotation :
                                prgmStatus === "2" ? props.buttonData.prgm_2_rotation :
                                    prgmStatus === "3" ? props.buttonData.prgm_3_rotation :
                                        prgmStatus === "4" ? props.buttonData.prgm_4_rotation : "-180"
                    }
                    data={props.buttonData}
                    name={props.buttonData.beckend_name}
                />
            )
        } else if (props.buttonData.type === "Knob6Ways") {
            const modeStatus = getStringValue(props.buttonData.beckend_name);
            return (
                <CMDS6WaysComponent scale={props.scale} rot={
                    modeStatus === "off" ? props.buttonData.mode_off_rotation :
                        modeStatus === "stby" ? props.buttonData.mode_stby_rotation :
                            modeStatus === "man" ? props.buttonData.mode_man_rotation :
                                modeStatus === "semi" ? props.buttonData.mode_semi_rotation :
                                    modeStatus === "auto" ? props.buttonData.mode_auto_rotation :
                                        modeStatus === "byp" ? props.buttonData.mode_byp_rotation : "-180"
                }
                    data={props.buttonData}
                    name={props.buttonData.beckend_name}
                />
            )
        } else if (props.buttonData.type === "NumberTen") {
            // console.log(cockpitControlState);
            return (
                <CMDSNumberComponent
                    scale={props.scale}
                    change={getBlinkingButtonsValue(props.buttonData)}
                    value={getStringValue(props.buttonData.beckend_name)}
                    data={props.buttonData} />
            )
        } else if (props.buttonData.type === "NumberOne") {
            //console.log(props.buttonData)
            return (
                <CMDSNumberComponent
                    scale={props.scale}
                    change={getBlinkingButtonsValue(props.buttonData)}
                    value={getStringValue(props.buttonData.beckend_name)}
                    data={props.buttonData} />
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

    const getComponentData = (name) => {
        const data = configData.filter(data => data.beckend_name === name)
        console.log(data)
    }

    const handleOnClick = (e) => {
        console.log("CMDS:Panel => Clicked on ", e.target.id, " on ", e.target.ariaLabel)
        //["RWR_SWITCH(0)","JMR_SWITCH(1)","MWS_SWITCH(2)","SWITCH_01(3)","SWITCH_02(4)", "SWITCH_CH(5)","SWITCH_FL(6)","SWITCH_JETT(7)","KNOB_PRGM(8)","KNOB_MODE(9)"]
        //["RWR_SWITCH","JMR_SWITCH","MWS_SWITCH","SWITCH_01","SWITCH_02", "SWITCH_CH","SWITCH_FL","SWITCH_JETT","KNOB_PRGM","KNOB_MODE"]

        let prgmKnobVal = getStringValue("KNOB_PRGM");
        console.log(prgmKnobVal, e.target.ariaLabel)
        if (e.target.ariaLabel === "KNOB_PRGM") {
            if (e.target.id === '2') {    // Right click
                prgmKnobVal = prgmKnobVal === 'bit' ? '1' : prgmKnobVal === '1' ? '2' : prgmKnobVal === '2' ? '3' : prgmKnobVal === '3' ? '4' : '4';
            } else {    // Left click
                prgmKnobVal = prgmKnobVal === '4' ? '3' : prgmKnobVal === '3' ? '2' : prgmKnobVal === '2' ? '1' : prgmKnobVal === '1' ? 'bit' : 'bit';
            }
        }

        let modeKnobVal = getStringValue("KNOB_MODE");
        console.log(modeKnobVal, e.target.ariaLabel)
        if (e.target.ariaLabel === "KNOB_MODE") {
            if (e.target.id === '2') {    // Right click
                modeKnobVal = modeKnobVal === 'off' ? 'stby' : modeKnobVal === 'stby' ? 'man' : modeKnobVal === 'man' ? 'semi' : modeKnobVal === 'semi' ? 'auto' : modeKnobVal === 'auto' ? 'byp' : 'byp';
            } else {    // Left click
                modeKnobVal = modeKnobVal === 'byp' ? 'auto' : modeKnobVal === 'auto' ? 'semi' : modeKnobVal === 'semi' ? 'man' : modeKnobVal === 'man' ? 'stby' : modeKnobVal === 'stby' ? 'off' : 'off';
            }
        }

        let switchVal = getStateValue(e.target.ariaLabel)
        console.log(switchVal, e.target.ariaLabel, e.target.id)
        if ((switchVal === true && (e.target.id === '2')) ||
            (switchVal === false && (e.target.id === '1'))) {
            switchVal = !switchVal;
        }


        let arrVal = [
            getStateValue("RWR_SWITCH") === true ? "True" : "False",
            getStateValue("JMR_SWITCH") === true ? "True" : "False",
            getStateValue("MWS_SWITCH") === true ? "True" : "False",
            getStateValue("SWITCH_01") === true ? "True" : "False",
            getStateValue("SWITCH_02") === true ? "True" : "False",
            getStateValue("SWITCH_CH") === true ? "True" : "False",
            getStateValue("SWITCH_FL") === true ? "True" : "False",
            getStateValue("SWITCH_JETT") === true ? "True" : "False",
            prgmKnobVal, //getStringValue("KNOB_PRGM"),
            modeKnobVal //getStringValue("KNOB_MODE")
        ]

        let indexVal =
            e.target.ariaLabel === "RWR_SWITCH" ? 0 : e.target.ariaLabel === "JMR_SWITCH" ? 1 :
                e.target.ariaLabel === "MWS_SWITCH" ? 2 : e.target.ariaLabel === "SWITCH_01" ? 3 :
                    e.target.ariaLabel === "SWITCH_02" ? 4 : e.target.ariaLabel === "SWITCH_CH" ? 5 :
                        e.target.ariaLabel === "SWITCH_FL" ? 6 : e.target.ariaLabel === "SWITCH_JETT" ? 7 :
                            e.target.ariaLabel === "KNOB_PRGM" ? 8 : e.target.ariaLabel === "KNOB_MODE" ? 9 : -1;


        if (indexVal > -1 && indexVal < 8) {
            arrVal[indexVal] = switchVal === true ? "True" : "False";
        }

        //console.log(rwrSwitch, jmrSwitch, mwsSwitch, switch01, switch02, chSwitch, flSwitch, jettSwitch, prgmKnob, modeKnob)
        console.log(arrVal)
        props.handleSendCMDSCommand(arrVal)
        // switch (e.target.name) {
        //     //rwrSwitch: boolean, jwrSwitch: boolean, mwsSwitch: boolean,
        //     //switch01: boolean, switch02: boolean, chSwitch: boolean, flSwitch: boolean, jettSwitch: boolean,
        //     //prgmKnob: string, modeKnob: string

        // // console.log(e.pageX)
        // // console.log(e.target.x)
        // // console.log(e.target.clientWidth)
        // // console.log(e.pageX - e.target.x - 532)
        // //console.log(getStateValue(e))

        // const componentData = getComponentData(e.target.name)


        // if (e.pageY - e.target.y - componentData?.up > e.target.clientHeight / 2) {
        //     console.log("Lower Half on " + e.target.name)
        // } else {
        //     console.log("Upper Half on " + e.target.name)
        // }



        // if (e.pageX - e.target.x - componentData?.left > e.target.clientWidth / 2) {
        //     console.log("Right Half on " + e.target.name)
        // } else {
        //     console.log("Left Half on " + e.target.name)
        // }

        // //["RWR_SWITCH(0)","JMR_SWITCH(1)","MWS_SWITCH(2)","SWITCH_01(3)","SWITCH_02(4)", "SWITCH_CH(5)","SWITCH_FL(6)","SWITCH_JETT(7)","KNOB_PRGM(8)","KNOB_MODE(9)"]
        // //["RWR_SWITCH","JMR_SWITCH","MWS_SWITCH","SWITCH_01","SWITCH_02", "SWITCH_CH","SWITCH_FL","SWITCH_JETT","KNOB_PRGM","KNOB_MODE"]

        // let prgmKnobVal = getStringValue("KNOB_PRGM");
        // console.log(prgmKnobVal, e.target.name)
        // if (e.target.name === "KNOB_PRGM") {
        //     if (e.pageX - e.target.x - componentData?.left > e.target.clientWidth / 2) {
        //         prgmKnobVal = prgmKnobVal === 'bit' ? '1' : prgmKnobVal === '1' ? '2' : prgmKnobVal === '2' ? '3' : prgmKnobVal === '3' ? '4' : '4';
        //     } else {
        //         prgmKnobVal = prgmKnobVal === '4' ? '3' : prgmKnobVal === '3' ? '2' : prgmKnobVal === '2' ? '1' : prgmKnobVal === '1' ? 'bit' : 'bit';
        //     }
        // }

        // let modeKnobVal = getStringValue("KNOB_MODE");
        // console.log(modeKnobVal, e.target.name)
        // if (e.target.name === "KNOB_MODE") {
        //     if (e.pageX - e.target.x - componentData?.left > e.target.clientWidth / 2) {
        //         modeKnobVal = modeKnobVal === 'off' ? 'stby' : modeKnobVal === 'stby' ? 'man' : modeKnobVal === 'man' ? 'semi' : modeKnobVal === 'semi' ? 'auto' : modeKnobVal === 'auto' ? 'byp' : 'byp';
        //     } else {
        //         modeKnobVal = modeKnobVal === 'byp' ? 'auto' : modeKnobVal === 'auto' ? 'semi' : modeKnobVal === 'semi' ? 'man' : modeKnobVal === 'man' ? 'stby' : modeKnobVal === 'stby' ? 'off' : 'off';
        //     }
        // }




        // let arrVal = [
        //     getStateValue("RWR_SWITCH") === true ? "True" : "False",
        //     getStateValue("JMR_SWITCH") === true ? "True" : "False",
        //     getStateValue("MWS_SWITCH") === true ? "True" : "False",
        //     getStateValue("SWITCH_01") === true ? "True" : "False",
        //     getStateValue("SWITCH_02") === true ? "True" : "False",
        //     getStateValue("SWITCH_CH") === true ? "True" : "False",
        //     getStateValue("SWITCH_FL") === true ? "True" : "False",
        //     getStateValue("SWITCH_JETT") === true ? "True" : "False",
        //     prgmKnobVal, //getStringValue("KNOB_PRGM"),
        //     modeKnobVal //getStringValue("KNOB_MODE")
        // ]

        // let indexVal = e.target.name === "RWR_SWITCH" ? 0 : e.target.name === "JMR_SWITCH" ? 1 :
        //     e.target.name === "MWS_SWITCH" ? 2 : e.target.name === "SWITCH_01" ? 3 :
        //         e.target.name === "SWITCH_02" ? 4 : e.target.name === "SWITCH_CH" ? 5 :
        //             e.target.name === "SWITCH_FL" ? 6 : e.target.name === "SWITCH_JETT" ? 7 :
        //                 e.target.name === "KNOB_PRGM" ? 8 : e.target.name === "KNOB_MODE" ? 9 : -1;


        // if (indexVal > -1 && indexVal < 8) {
        //     arrVal[indexVal] = switchVal === true ? "True" : "False";
        // }

        // //console.log(rwrSwitch, jmrSwitch, mwsSwitch, switch01, switch02, chSwitch, flSwitch, jettSwitch, prgmKnob, modeKnob)
        // props.handleSendCMDSCommand(arrVal)
        // // switch (e.target.name) {
        // //     //rwrSwitch: boolean, jwrSwitch: boolean, mwsSwitch: boolean,
        // //     //switch01: boolean, switch02: boolean, chSwitch: boolean, flSwitch: boolean, jettSwitch: boolean,
        // //     //prgmKnob: string, modeKnob: string


        // //         break;
        // //     case 'RWR_SWITCH':
        // //     case 'JMR_SWITCH':

        // // case 'JMR_SWITCH':
        // //     props.handleSendCommand(getStateValue(0), !getStateValue(configData[1]), getStateValue(configData[2]), getStateValue(configData[3]))
        // //     break;
        // // case 'SWITCH_01':
        // //     props.handleSendCommand(getStateValue(0), getStateValue(configData[1]), !getStateValue(configData[2]), getStateValue(configData[3]))
        // //     break;
        // // case 'SWITCH_02':
        // //     props.handleSendCommand(getStateValue(0), getStateValue(configData[1]), getStateValue(configData[2]), !getStateValue(configData[3]))
        // //     break;
        // // case 'SWITCH_02':
        // //     props.handleSendCommand(getStateValue(0), getStateValue(configData[1]), getStateValue(configData[2]), !getStateValue(configData[3]))
        // //     break;
        // // case 'SWITCH_CH':
        // //     props.handleSendCommand(getStateValue(0), getStateValue(configData[1]), getStateValue(configData[2]), !getStateValue(configData[3]))
        // //     break;
        // // case 'SWITCH_FL':
        // //     props.handleSendCommand(getStateValue(0), getStateValue(configData[1]), getStateValue(configData[2]), !getStateValue(configData[3]))
        // //     break;
        // //     default:
        // //         break;
        // // }
    }


    return (
        <>
            <Panel scale={imgScaleSmall}>
                {configData.map(buttonData =>
                    <div>
                        <CMDSComponent
                            scale={imgScaleBig}
                            buttonData={buttonData}
                        // state={getStateValue(buttonData)}
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
                                                "font-size": `${props.debugMode === true ? "60px" : null}`, 
                                                "color": `${props.debugMode === true ? "blueviolet" : null}`,
                                                "grid-row-start": `${buttonData.grid_direction === "up-down" ? tile + 1 : 1}`,
                                                "grid-column-start": `${buttonData.grid_direction === "left-right" ? tile + 1 : 1}`,
                                                "width": `${buttonData.grid_direction === "up-down" ? imgScaleBig * Number(buttonData.width) * Number(buttonData.limit_factor) / 100 : imgScaleBig * Number(buttonData.width) * Number(buttonData.limit_factor) / 100 / Number(buttonData.grid_size)}px`,
                                                "height": `${buttonData.grid_direction === "up-down" ? imgScaleBig * Number(buttonData.width) * Number(buttonData.limit_factor) / 100 / Number(buttonData.grid_size) : imgScaleBig * Number(buttonData.width) * Number(buttonData.limit_factor) / 100}px`,
                                                "display": "flex",
                                                "align-content": "center",
                                                "align-items": "start",
                                                "justify-content": "start",
                                                "border":  `${props.debugMode === true ? "1px solid #4a4d56" : "none"}` 
                                            }}
                                            onClick={handleOnClick}>
                                            {props.debugMode === false ? null : 
                                            (buttonData.grid_direction === "up-down" && tile === 0) ? "U" :
                                                (buttonData.grid_direction === "up-down" && tile === 1) ? "D" :
                                                    (buttonData.grid_direction === "left-right" && tile === 0) ? "L" :
                                                        (buttonData.grid_direction === "left-right" && tile === 1) ? "R" : "N"}</div>
                                    })
                            }
                        </ComponentContainer>

                    </div>
                )}
            </Panel>
        </>
    )
}

export default CMDSPanel;