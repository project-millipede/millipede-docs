import { I18n } from '@app/utils';
import { Typography } from '@mui/material';
import { blue, green, grey, red, yellow } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { FC, ReactNode } from 'react';

interface StyleProps {
  color: string;
}
export const getColor = (type: TStatementVariant) => {
  switch (type) {
    case StatementVariant.problem:
      return red[300];
    case StatementVariant.remark:
      return yellow[300];
    case StatementVariant.question:
      return blue[300];
    case StatementVariant.summary:
      return green[300];
    default:
      return grey[300];
  }
};

export const Wrapper = styled('aside')(({ theme }) => ({
  margin: theme.spacing(1.5, 0)
}));

/**
 * With optional border
 * border: `1px solid ${theme.palette.grey[300]}`,
 * borderBottomStyle: 'none',
 */

export const Title = styled(Typography, {
  shouldForwardProp: prop => prop !== 'color'
})<StyleProps>(({ theme, color }) => {
  return {
    width: 'fit-content',
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(1, 1, 0, 0),
    backgroundColor: color,
    // fontFamily: "'Roboto Mono', monospace",
    fontWeight: 500,
    margin: 0
  };
});

/**
 * With optional border
 * border: `1px solid ${theme.palette.grey[300]}`,
 * borderTopStyle: 'none',
 */

// Typography

// this is no typography, typography body1 generates a paragraph element meaning using children of arbitrary md content results also in a paragraph, which itself is forbitten. Also md formatting will not get applied using a typography and pass just text, the markup never gets resolved.

export const Content = styled('div', {
  shouldForwardProp: prop => prop !== 'color'
})<StyleProps>(({ theme, color }) => {
  return {
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(0, 1, 1, 1),
    backgroundColor: grey[300],
    // fontFamily: "'Roboto Mono', monospace",
    fontWeight: 400,
    margin: 0,
    borderLeft: `8px solid ${color}`
  };
});

export const StatementVariant = {
  question: 'question',
  problem: 'problem',
  remark: 'remark',
  summary: 'summary'
} as const;

export type TStatementVariant =
  typeof StatementVariant[keyof typeof StatementVariant];

interface StatementProps {
  type: TStatementVariant;
  external?: boolean;
}

export const Statement: FC<
  StatementProps & {
    children: ReactNode;
  }
> = ({
  type = StatementVariant.remark,
  // external = false,
  children
}) => {
  const color = getColor(type);

  const { t } = I18n.useTranslation();
  return (
    <Wrapper>
      <Title variant='h5' color={color}>
        {t(`common:${type}-statement`)}
      </Title>
      <Content color={color}>
        {/* {external ? (
          <Markdown options={{ forceBlock: true }}>{children as any}</Markdown>
        ) : (
          children
        )} */}
        {children}
      </Content>
    </Wrapper>
  );
};
