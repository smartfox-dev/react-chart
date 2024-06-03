import React from "react";
import { Navigate } from "react-router-dom";
import { styled } from "styled-components";

const NormalRouteContainer = styled.div`
    zoom: 80%;
`;

export default function NormalRoute({ children }) {
    return (
        <NormalRouteContainer>{children}</NormalRouteContainer>
    )
}