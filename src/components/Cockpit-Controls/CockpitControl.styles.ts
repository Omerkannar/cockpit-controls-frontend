import styled from "styled-components";
import { createTheme } from '@mui/material/styles';



export const DarkContainer = styled.div<{ edit?: boolean }>`
  position: relative;
  background: #21242b;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1080px;
  width: 2200px;
  font-family: arial;
  font-weight: 400;
  box-sizing: border-box;
  `;

export const DarkContainerNoCommunication = styled.div<{ edit?: boolean }>`
  position: relative;
  background: #21242b;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1080px;
  width: 2200px;
  font-family: arial;
  font-weight: 400;
  box-sizing: border-box;
  justify-content: center;
  `;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2220 / 5, 5px);
  grid-template-rows: repeat(1080 / 5, 5px);
  row-gap: 0.0em;
  column-gap: 0em;
`

export const CircuitBreakerContainer = styled.div`
  grid-column-start: 75;
  grid-row-start: 2;
`

export const CmdsContainer = styled.div`
  grid-column-start: 212;
  grid-row-start: 0;
`

export const InteriorLightPanelContainer = styled.div`
  grid-column-start: 10;
  grid-row-start: 0;
`

export const GridPanelContainer = styled.div`
  grid-column-start: 196;
  grid-row-start: 2;
`

export const FuelPanelContainer = styled.div`
  grid-column-start: 10;
  grid-row-start: 130;
`
export const EPUFuelPanelContainer = styled.div`
  grid-column-start: 10;
  grid-row-start: 120;
`




export const HeliPilotPanelContainer = styled.div`
  grid-column-start: 196;
  grid-row-start: 123;
`
export const AutoPilotPanelContainer = styled.div`
  grid-column-start: 268;
  grid-row-start: 97;
`
export const RightCollectiveContainer = styled.div`
  grid-column-start: 330;
  grid-row-start: 83;
`

export const RightCyclicContainer = styled.div`
  grid-column-start: 317;
  grid-row-start: 10;
`

export const LeftCyclicContainer = styled.div`
  grid-column-start: 2;
  grid-row-start: 10;
`

export const LeftCollectiveContainer = styled.div`
  grid-column-start: 2;
  grid-row-start: 103;
`

export const CyclicMovementContainer = styled.div`
  grid-column-start: 268;
  grid-row-start: 128;
`

export const PedalsMovementContainer = styled.div`
  grid-column-start: 268;
  grid-row-start: 168;
`

export const CollectiveMovementContainer = styled.div`
  grid-column-start: 308;
  grid-row-start: 128;
`

export const muiTheme = createTheme({

});