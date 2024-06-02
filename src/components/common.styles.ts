import styled from "styled-components";

export interface BoxProps {
    display?: string;
    direction?: string;
    justify?: string;
    align?: string;
    margin?: string;
    width?: string;
    gap?: string;
    flex?: string;
    background?: string;
}

export const Box = styled.div<BoxProps>`
    display: ${p => p.display || 'flex'};
    flex-direction: ${p => p.direction || 'row'};
    justify-content: ${p => p.justify || 'center'};
    align-items: ${p => p.align || 'center'};
    margin: ${p => p.margin || '0'};
    width: ${p => p.width || 'auto'};
    gap: ${p => p.gap || 'auto'};
    flex: ${p => p.flex || '1'};
    background: ${p => p.background || 'auto'}; 
`