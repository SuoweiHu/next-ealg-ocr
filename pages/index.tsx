import OcrReader from '@/components/ocr-image-upload';

const IndexPage = () => {
  return (
    <div style={{ padding: 10}}>
      <h1 style={{ fontWeight: 800, fontSize: 20 }} className="bg-black text-white w-fit border-2 border-black p-2 pr-4 absolute right-0 bottom-0">
        {`> OCR with Tesseract.js in Next.js`}
      </h1>
      <br />
      <OcrReader />
    </div>
  );
};

export default IndexPage;