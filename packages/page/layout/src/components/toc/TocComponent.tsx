import { styled } from '@mui/material/styles';
import { TocEntry } from '@stefanprobst/remark-extract-toc';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { TocLink } from './TocLink';

interface TocComponentProps {
  toc: Array<
    Omit<TocEntry, 'children'> & {
      isParent?: boolean;
    }
  >;
}

const TocList = styled('ul')(() => ({
  listStyle: 'none',
  padding: 0,
  margin: 0
}));

export const TocComponent: FC<TocComponentProps> = ({ toc }) => {
  const { query, pathname } = useRouter();

  return (
    <TocList>
      {toc.map(tocItem => {
        return (
          <li key={tocItem.id}>
            <TocLink href={tocItem.id} query={query} pathname={pathname}>
              {tocItem.value}
            </TocLink>
          </li>
        );
      })}
    </TocList>
  );
};
