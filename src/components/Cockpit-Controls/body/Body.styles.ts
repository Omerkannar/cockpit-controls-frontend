import styled from "styled-components"

export const ConfigurationBody = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    box-sizing: border-box;
`
export const EngagementBody = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    box-sizing: border-box;
`



export const InputBox = styled.div<{width?: string}>`
    display: flex;
    justify-content: space-between;
    & > * {
        flex: 100%;
    }
    align-items: center;
    background: #1b1a21;
    border: 1px solid #4a4d56;
    border-radius: 6px;
    padding: 12px;
    box-sizing: border-box;
    color: white;
    width: ${p => p.width || '45%'};
`

export const EngagementBox = styled.div<{width?: string}>`
    display: flex;
    justify-content: space-between;
    & > * {
        flex: 100%;
    }
    align-items: center;
    background: #1b1a21;
    border: 1px solid #4a4d56;
    border-radius: 6px;
    padding: 12px;
    box-sizing: border-box;
    color: white;
    width: ${p => p.width || '45%'};
    height: 150px;
    flex-flow: wrap;
`

export const StatusBox = styled.div<{width?: string}>`
    display: flex;
    justify-content: space-between;
    & > * {
        flex: 100%;
    }
    align-items: center;
    background: #1b1a21;
    border: 1px solid #4a4d56;
    border-radius: 6px;
    padding: 5px;
    box-sizing: border-box;
    color: white;
    width: ${p => p.width || '45%'};
    height: 150px;
    flex-flow: wrap;
`

export const InputTitle = styled.p`
    width: 50%;
    white-space: nowrap;
    display: block;
    font-size: 1rem;
    @media (max-width: 768px) {
        font-size: .9rem;
    }
    color: white;
    margin: 0;
    padding: 0;
    font-weight: 200;
`

export const InputTitleNoCommunication = styled.p`
    width: 50%;
    white-space: nowrap;
    display: block;
    font-size: 1.2rem;
    @media (max-width: 768px) {
        font-size: .9rem;
    }
    color: yellow;
    margin: 0;
    padding: 0;
    font-weight: 200;
    text-align: center;
`

export const CockpitControlOperationBtn = styled.button<{disabled?: boolean }>`
    background: ${(p) => ((p.disabled) ? "#ccc" : "dodgerblue")};
    padding: 4px 12px;
    font-size: 4rem;
    margin: 0;
    @media (max-width: 768px) {
        font-size: 4rem;
    }
    color: white;
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: ${p => p.disabled ? 'not-allowed' : 'pointer'};
    opacity: 0.9;
    transition: 0.1s ease-in-out;
    &:hover {
        opacity: 1;
    }
`

// export const ComponentContainer = styled.div<{width?: string, height?: string}>`
//     display: flex;
//     display: grid;
//     background: #1b1a21;
//     border: 1px solid #4a4d56;
//     border-radius: 6px;
//     padding: 5px;
//     box-sizing: border-box;
//     color: white;
//     width: ${p => p.width || '5%'};
//     height: ${p => p.height || '5%'};;
//     flex-flow: wrap;
// `

