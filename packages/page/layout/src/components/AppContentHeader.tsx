import { NavigationState } from '@app/layout/src/recoil/features/pages/reducer';
import { PageTypes } from '@app/types';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Breadcrumbs, Share } from '@page/components';
import React, { FC } from 'react';

interface AppContentHeaderProps {
  slug: Array<string>;
  navigation: NavigationState;
  metaData: PageTypes.MetaData;
}

export const Header = styled(Box)(() => {
  return {
    display: 'flex',
    alignItems: 'center'
  };
});
export const GrowingDiv = styled('div')({
  flex: '1 1 auto'
});

export const AppContentHeader: FC<AppContentHeaderProps> = ({
  slug,
  // navigation,
  metaData
}) => {
  return (
    <Header component='header'>
      <Breadcrumbs slug={slug} />
      {/* <CustomBreadcrumbs slug={slug} navigation={navigation} /> */}
      <GrowingDiv />
      <Share metaData={metaData} />
    </Header>
  );
};
