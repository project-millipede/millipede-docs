import { FC, ReactNode } from 'react';
import { pdfjs } from 'react-pdf';

export const PDFWorker: FC<{
  children: ReactNode;
}> = ({ children }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  return <>{children}</>;
};
