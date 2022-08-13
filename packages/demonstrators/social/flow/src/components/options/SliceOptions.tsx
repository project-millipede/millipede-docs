import { I18n } from '@app/utils';
import { features } from '@demonstrators-social/shared';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

export const SliceOptions: FC = () => {
  const {
    scroll: {
      interaction: {
        states: { interactionOptionsState }
      }
    }
  } = features;

  const { t } = I18n.useTranslation('pages/pidp/use-case/recognition/index');

  const { activeIds } = useRecoilValue(interactionOptionsState);

  const handleChange = useRecoilCallback(
    ({ set }) =>
      (event: React.ChangeEvent<HTMLInputElement>, _checked: boolean) => {
        set(interactionOptionsState, state => {
          return {
            ...state,
            activeIds: {
              ...state.activeIds,
              [event.target.name]: event.target.checked
            }
          };
        });
      },
    []
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <FormControl>
        <FormLabel>{t('select-slice-categories')}</FormLabel>
        <FormGroup row>
          {Object.entries(activeIds).map(([key, value]) => {
            return (
              <FormControlLabel
                key={`slice-option-${key}`}
                control={
                  <Checkbox
                    size='small'
                    name={key}
                    checked={value}
                    onChange={handleChange}
                  />
                }
                label={t(key)}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </Box>
  );
};
