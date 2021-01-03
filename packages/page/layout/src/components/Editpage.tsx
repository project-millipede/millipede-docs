import { Button } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const LOCALES = { zh: 'zh-CN', pt: 'pt-BR', es: 'es-ES' };
const CROWDIN_ROOT_URL = 'https://crowdin.com/project/project-millipede';
const SOURCE_CODE_ROOT_URL =
  'https://github.com/project-millipede/millipede-docs/edit/master';

export interface EditPageProps {
  markdownLocation: string;
  sourceCodeRootUrl: string;
}

export const EditPage: FC<EditPageProps> = ({ markdownLocation }) => {
  const { t } = useTranslation();

  const { locale } = useRouter();

  const crowdInLocale = LOCALES[locale] || locale;
  const crowdInPath = markdownLocation.substring(
    0,
    markdownLocation.lastIndexOf('/')
  );

  return (
    <Button
      component='a'
      href={
        locale === 'de'
          ? `${SOURCE_CODE_ROOT_URL}${markdownLocation}`
          : `${CROWDIN_ROOT_URL}${crowdInLocale}#/staging${crowdInPath}`
      }
      target='_blank'
      rel='noopener'
    >
      {t('common:editContent')}
    </Button>
  );
};
