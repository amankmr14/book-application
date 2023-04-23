import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Button from "./Button";

type Props = {
  content?: string;
};

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ content }: Props) => {
  const [numPages, setNumPages] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <div className="fixed flex justify-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-6 space-y-6 text-center">
            <nav>
              <Button onClick={goToPrevPage} variant="outlined" text="Prev" className="mr-2 mb-2"/>
              <Button onClick={goToNextPage} variant="outlined" text="Next"/>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </nav>
            <Document file={content} onLoadSuccess={onDocumentLoadSuccess}>
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
