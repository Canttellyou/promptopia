import React from 'react'
import { styled } from 'styled-components';

const Loader = () => {
    return (
        <LoaderStyle className="loader" />
    )
}

const LoaderStyle = styled.div`
 @keyframes bgAnimation {
        0%{
        transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    background-image:radial-gradient(
      at 27% 37%,
      hsla(215, 98%, 61%, 1) 0px,
      transparent 0%
    ),
    radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%),
    radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%),
    radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%),
    radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%),
    radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%),
    radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%);
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    animation: bgAnimation  5s ease-in-out infinite;
    filter: blur(3px);
`;

export default Loader