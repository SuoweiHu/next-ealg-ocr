import OcrImageUpload from '@/components/ocr-image-upload';
import OcrImageCapture from '@/components/ocr-image-capture';

const IndexPage = () => {
  return (
    <div style={{ padding: 10}}>
      {/* <OcrImageUpload /> */}
      <OcrImageCapture />
    </div>
  );
};

export default IndexPage;