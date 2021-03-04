import { Button, Grid } from '@material-ui/core';
import dynamic from 'next/dynamic';
import React, { FC, useState } from 'react';
import { DocumentProps, PageProps } from 'react-pdf';
import { SizeMe } from 'react-sizeme';

import { Stepper, TranslationProps } from '../stepper/Stepper';

const Document = dynamic<DocumentProps>(
  () => import('react-pdf').then(module => module.Document),
  { ssr: false }
);

const Page = dynamic<PageProps>(
  () => import('react-pdf').then(module => module.Page),
  {
    ssr: false
  }
);

import('react-pdf').then(({ pdfjs }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
});

export type StepperContentWithTranslationProps = TranslationProps & {
  url: string;
};

export const StepperContent: FC<StepperContentWithTranslationProps> = ({
  url,
  labelBack,
  labelNext
}) => {
  const [step, setStep] = useState(0);
  const [max, setMax] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setMax(numPages);
  };

  const downloadResume = () => {
    window.open(url, '_blank');
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button onClick={downloadResume}>Download</Button>
      </Grid>
      <Grid item xs={12}>
        <SizeMe>
          {({ size }) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '24px'
              }}
            >
              <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                  pageNumber={step + 1}
                  width={size.width ? size.width : 1}
                />
              </Document>
            </div>
          )}
        </SizeMe>
      </Grid>
      <Grid item xs={12}>
        <Stepper
          steps={max}
          setStepCb={(currentStep: number) => {
            setStep(currentStep);
          }}
          labelBack={labelBack}
          labelNext={labelNext}
        />
      </Grid>
    </Grid>
  );
};
