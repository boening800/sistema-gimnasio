import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
    display: inline-block;
    width: 80px;
    height: 80px;
    animation: ${rotate} 2s linear infinite;
    &:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
`;

export default function CFallback () {
    return (
        <div className="fixed z-[1000] h-full w-full bg-cyan-600 top-0 left-0 flex justify-center items-center">
            <div className='flex flex-col justify-center align-middle items-center w-[50%]'>
                <Rotate></Rotate>
                <span className='text-white font-bold text-lg'>Cargando...</span>
            </div>
        </div>
    )
}