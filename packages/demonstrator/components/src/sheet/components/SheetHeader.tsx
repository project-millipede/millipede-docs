import { FC } from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  background-color: #f1f1f1;
`;

export const SheetHeader: FC = ({ children }) => {
  return <Header>{children}</Header>;
};
