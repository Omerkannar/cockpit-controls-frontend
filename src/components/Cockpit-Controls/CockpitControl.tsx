import React, { useEffect, useState } from 'react';
import {
    DarkContainer,
    DarkContainerNoCommunication,
    Wrapper,
    FuelPanelContainer,
    CmdsContainer,
    EPUFuelPanelContainer,
    InteriorLightPanelContainer
} from './CockpitControl.styles';
import { InputTitleNoCommunication } from './body/Body.styles';
import { CircularProgress } from '@mui/material';

import FuelPanel from './body/Fuel-Panel/FuelPanel';
import CMDSPanel from './body/CMDS-Panel/CMDSPanel';
import EPUFuelPanel from './body/EPU-Fuel-Panel/EPUFuelPanel';
import InteriorLightPanel from './body/Interior-Light_Panel/InteriorLightPanel';
// import Interior

export const CockpitControl = () => {

    const [temp, setTemp] = useState(0);
    const [communicationWithServer, setCommunicationWithServer] = useState(false)
    const [dataFromBE, setDataFromBE] = React.useState({});
    const [interiorLightsdataFromBE, setInteriorLightsDataFromBE] = React.useState({});
    const debugMode: boolean = true;


    useEffect(() => {
        const tempInterval = setInterval(() => {
            setTemp((prevTemp) => prevTemp + 1)
        }, 1000 * 1);
        return () => {
            clearInterval(tempInterval);
        }
    }, []);

    useEffect(() => {
        handleTextFromBEChange()
        handleInteriorLightsFromBEChange()
    }, [temp]);


    const handleInteriorLightsFromBEChange = () => {
        fetch("http://127.0.0.1:5000/getInteriorLightPanelData", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            }
        })
            .then(Response => Response.json()
                , error => {
                    console.log('Unable to fetch data')
                    setCommunicationWithServer(false)
                }
            )
            .then(data => {
                //handleParseMessageFromBE(data)
                if (data !== undefined) {
                    setCommunicationWithServer(true)
                    setInteriorLightsDataFromBE(data);

                }
                //console.log(data)
            }, error => {
                console.log('Unable to parse data')
                setCommunicationWithServer(false)
            });
    }



    const handleTextFromBEChange = () => {
        fetch("http://127.0.0.1:5000/getCMDSPanelData", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            }
        })
            .then(Response => Response.json()
                , error => {
                    console.log('Unable to fetch data')
                    setCommunicationWithServer(false)
                }
            )
            .then(data => {
                //handleParseMessageFromBE(data)
                if (data !== undefined) {
                    setCommunicationWithServer(true)
                    setDataFromBE(data);

                }
                //console.log(data)
            }, error => {
                console.log('Unable to parse data')
                setCommunicationWithServer(false)
            });
    }

    const handleSendFuelCommand = () => {

    }

    const prepareTest = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": 0,
                "name": "True"
            })
        };
        fetch("http://127.0.0.1:5000/add_student", requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    //const handleSendCMDSCommand = (pump1: boolean, pump2: boolean, xferpump: boolean, valve: boolean) => {
    const handleSendCMDSCommand = (arrVal: string[]) => {


        console.log(arrVal)
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                RWR_SWITCH: arrVal[0],
                JMR_SWITCH: arrVal[1],
                MWS_SWITCH: arrVal[2],
                SWITCH_01: arrVal[3],
                SWITCH_02: arrVal[4],
                SWITCH_CH: arrVal[5],
                SWITCH_FL: arrVal[6],
                SWITCH_JETT: arrVal[7],
                KNOB_PRGM: arrVal[8],
                KNOB_MODE: arrVal[9]
            })
        };
        fetch("http://127.0.0.1:5000/setCMDSPanelData", request)
            .then(response => response.json())
            .then(data => console.log(data));

    }


    const handleSendInteriorLightsCommand = (arrVal: string[]) => {
        console.log(`Handle Click On Play ...`);
        console.log(arrVal)
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                NORMLTG_LIGHT: arrVal[0],
                FLOOD_CONSOLES_LIGHT: arrVal[1]
            })
        };
        fetch("http://127.0.0.1:5000/setInteriorLightPanelData", request)
            .then(response => response.json())
            .then(data => console.log(data));
    }


    if (!communicationWithServer && false) {
        // if(temp < 1){
        return (
            <>
                {console.log('no connection')}
                <DarkContainerNoCommunication >
                    <CircularProgress />
                    <br />
                    <br />
                    <InputTitleNoCommunication>{'No Communication with ATH Backend Services...  '}</InputTitleNoCommunication>
                </DarkContainerNoCommunication>
            </>
        )
    } else if (temp < 5 && communicationWithServer && false) {
        return (
            <>
                <DarkContainerNoCommunication >
                    <CircularProgress />
                    <br />
                    <br />
                    <InputTitleNoCommunication>{'Retriving Data From Controls...  '}</InputTitleNoCommunication>
                </DarkContainerNoCommunication>
            </>
        )
    } else {
        return (
            <>
                <DarkContainer>
                    <Wrapper>
                        {/* <FuelPanelContainer>
                            <FuelPanel cockpitControlState={dataFromBE} {...{ handleSendFuelCommand }} />
                        </FuelPanelContainer> */}
                        <InteriorLightPanelContainer>
                            <InteriorLightPanel debugMode={debugMode} cockpitControlState={interiorLightsdataFromBE} {...{ handleSendInteriorLightsCommand }} />
                        </InteriorLightPanelContainer>
                        <EPUFuelPanelContainer>
                            <EPUFuelPanel cockpitControlState={dataFromBE} />
                        </EPUFuelPanelContainer>
                        <CmdsContainer>
                            <CMDSPanel debugMode={debugMode} cockpitControlState={dataFromBE} {...{ handleSendCMDSCommand }} />
                        </CmdsContainer>

                    </Wrapper>
                </DarkContainer>
            </>
        )
    }

}