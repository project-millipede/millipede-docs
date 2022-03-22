import { HooksUtils } from '@app/render-utils';
import { Box, Button, Grid } from '@mui/material';
import dynamic from 'next/dynamic';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { FC, useState } from 'react';
import { DocumentProps, PageProps } from 'react-pdf';

import { Stepper, TranslationProps } from '../stepper/Stepper';

const PDFWorker = dynamic(
  () => import('./PDFWorker').then(module => module.PDFWorker),
  {
    ssr: false
  }
);

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

type StepperContentWithTranslationProps = TranslationProps & {
  url: string;
};

export const StepperContent: FC<StepperContentWithTranslationProps> = ({
  url,
  labelBack,
  labelNext
}) => {
  const [step, setStep] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [ref, bounds] = HooksUtils.useResize();

  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setTotalPages(numPages);
  };

  const openDocument = () => {
    window.open(url, '_blank');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display='flex' justifyContent='flex-end'>
          <Button onClick={openDocument}>Download</Button>
        </Box>
      </Grid>
      <Grid item xs={12} ref={ref}>
        <PDFWorker>
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={step} width={bounds.width} />
          </Document>
        </PDFWorker>
      </Grid>
      <Grid item xs={12}>
        <Stepper
          steps={totalPages}
          setStepCb={(currentStep: number) => {
            setStep(currentStep + 1);
          }}
          labelBack={labelBack}
          labelNext={labelNext}
        />
      </Grid>
    </Grid>
  );
};
