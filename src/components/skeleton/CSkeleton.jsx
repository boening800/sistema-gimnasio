import styled, { keyframes } from "styled-components"

export default function CSkeleton() {
    const keyframe = keyframes `
        0% {
            opacity:0.4;
            }
        40%{
            opacity:0.8;
        }
        100% {
            opacity:0.4;
        }
    `;
    const SkeletonDiv = styled.div `
        width: 100%;
        height: 4rem;
        background-color: #E6E6E6;
        animation: ${keyframe} 1.6s infinite linear;
        border-radius: .5rem;
    `;
    return (
        <div className="p-4">
            <SkeletonDiv></SkeletonDiv>
        </div>
    )
}