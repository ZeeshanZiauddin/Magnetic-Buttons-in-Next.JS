import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { lightTheme } from './theme/theme';
import useHover from './utils/useHover';
import GlobalStyles from './theme/global';
import Cursor from './components/Cursor';
import Badge from './components/Badge';
import Button from './components/Button';
import MagneticButton from './components/magenaticButton';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const Header = styled.div`
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1em;

  @media (min-width: 480px) {
    display: flex;
    justify-content: space-between;
  }
`;

export default function App() {
  const [hoverRef, isHovered] = useHover();

  return (
    <ThemeProvider theme={lightTheme}>
      <Normalize />
      <GlobalStyles />
      <Page>
        <Header></Header>
        <MagneticButton link="Button" />
        <small>Better experience on destkop</small>
      </Page>
      <Cursor hover={isHovered} />
    </ThemeProvider>
  );
}
