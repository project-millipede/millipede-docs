import React, { FC } from 'react';
import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SheetContent: FC = ({ children }) => {
  return <Content>{children}</Content>;
};
