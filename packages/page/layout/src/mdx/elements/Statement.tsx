import { styled } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

const Title = styled('h6')(({ theme }) => ({
  width: 'fit-content',
  padding: theme.spacing(0.5, 1),
  border: `1px solid ${theme.palette.grey[300]}`,
  borderBottomStyle: 'none',
  borderRadius: theme.spacing(1, 1, 0, 0)
}));

const Content = styled('div')(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(0, 1, 1, 1)
}));

export const StatementWrapper = styled('div')(({ theme }) => ({
  '& h6': {
    margin: '0',
    fontStyle: 'italic',
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export const StatementVariant = {
  hint: 'hint',
  warning: 'warning'
} as const;

export type TStatementVariant =
  typeof StatementVariant[keyof typeof StatementVariant];

interface StatementProps {
  variant?: TStatementVariant;
}

export const Statement: FC<StatementProps> = ({
  // variant = StatementVariant.hint,
  children
}) => {
  const { t } = useTranslation();

  return (
    <StatementWrapper>
      <Title
        sx={{
          // backgroundColor: blue[500]
          backgroundColor: 'rgb(33, 150, 243, 0.2)'
        }}
      >
        {t('common:problem-statement')}
      </Title>
      <Content
        sx={
          {
            // backgroundColor: 'rgb(33, 150, 243, 0.2)'
          }
        }
      >
        {children}
      </Content>
    </StatementWrapper>
  );
};
