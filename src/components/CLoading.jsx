import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Rotate = styled.span`
    width: 4px;
    height: 4px;
    border: 2px solid #0891b2;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${rotate} 1s linear infinite;
`;

export default function CLoading () {
    return (
        <div className='m-2'>
            <Rotate></Rotate>
        </div>
    )
}