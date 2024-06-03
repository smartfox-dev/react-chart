import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Layout/Topbar';
import Sidebar, { DrawerHeader } from '../Layout/Sidebar';
import { styled } from "styled-components";

const PrivateRouteContainer = styled.div`
  zoom: 100%;
`;

export default function PrivateRoute({ children }) {
  return (
    <PrivateRouteContainer>
      {children}
    </PrivateRouteContainer>
  );
}