import { Navigation, PageTypes } from '@app/types';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Breadcrumbs, Share } from '@page/components';
import { FC } from 'react';

interface AppContentHeaderProps {
  slug: Array<string>;
  navigation: Navigation;
  metaData: PageTypes.MetaData;
  hasShare?: boolean;
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
  navigation,
  metaData,
  hasShare = true
}) => {
  return (
    <Header component='header'>
      <Breadcrumbs slug={slug} navigation={navigation} />
      {/* <CustomBreadcrumbs slug={slug} navigation={navigation} /> */}
      <GrowingDiv />
      {hasShare && <Share metaData={metaData} />}
    </Header>
  );
};
