'use client';

import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Spinner } from "@heroui/spinner";

const OcrReader = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<string>('');
  const [ocrStatus, setOcrStatus] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setOcrResult(''); // Reset OCR result
      setOcrStatus(''); // Reset status
    }
  };

  const readImageText = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    setOcrStatus('Processing...');
    const worker = await createWorker('eng', 1, {
      logger: m => console.log(m),
    });

    try {
      const {
        data: { text },
      } = await worker.recognize(selectedImage);

      setOcrResult(text);
      setOcrStatus('Completed');
    } catch (error) {
      console.error(error);
      setOcrStatus('Error occurred during processing.');
    } finally {
      await worker.terminate();
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Image Upload Card */}
      <Card className="p-4">
        <CardHeader className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">OCR Image Upload</h2>
          <p className="text-default-500">Upload an image to extract text using OCR</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            label="Select Image"
            variant="bordered"
          />

          {selectedImage && (
            <div className="flex justify-center">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded content"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="flex justify-center">
            <Button
              onClick={readImageText}
              isDisabled={!selectedImage || isProcessing}
              color="primary"
              variant="shadow"
              startContent={isProcessing ? <Spinner size="sm" /> : null}
            >
              {isProcessing ? 'Processing...' : 'Extract Text'}
            </Button>
          </div>

          {<div className="mt-4">
              <h3 className="text-lg font-semibold">Status:</h3>
              <p className="text-default-600">{ocrStatus}</p>
            </div>
          }
        </CardBody>
      </Card>

      {/* Text Extraction Result Card */}
      <Card className="p-4">
        <CardHeader className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Extracted Text</h2>
          <p className="text-default-500">Results from OCR processing will appear here</p>
        </CardHeader>
        <CardBody>
          {ocrResult ? (
            <div
              className="p-4 bg-default-100 rounded-lg"
              dangerouslySetInnerHTML={{
                __html: ocrResult
                  .replace(/\n/g, '<br />')
                  .replace(/[=,—,-,+]/g, ' '),
              }}
            />
          ) : (
            <div className="p-4 bg-default-100 rounded-lg text-default-500 italic min-h-[200px] flex items-center justify-center">
              {selectedImage
                ? "Click 'Extract Text' to process the image"
                : "Upload an image to begin text extraction"}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default OcrReader;