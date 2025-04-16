import React, { useRef, useState } from 'react';
import { jsPDF } from 'jspdf';

export default function ImageOCRPanel() {
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const base64 = await toBase64(file);
    const extension = file.name.split('.').pop();
    const user = JSON.parse(localStorage.getItem('user'));

    const payload = {
      name: file.name.split('.')[0],
      description: '',
      userId: user.id,
      body: base64.replace(/^data:.*;base64,/, ''),
      extension: extension,
    };

    try {
      const response = await fetch('http://localhost:4000/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setUploadedImage({
        id: data.id,
        name: data.name,
        url: URL.createObjectURL(new Blob([new Uint8Array(Object.values(data.body))])),
      });
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleAnalysisRequest = async () => {
    if (!uploadedImage) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/openairesponse/analyzis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: uploadedImage.id }),
      });

      const data = await response.json();
      setAnalysisResult(data.body);
    } catch (err) {
      console.error('Analysis failed:', err);
      setAnalysisResult('Analysis failed. Try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const downloadPDF = () => {
    if (!uploadedImage || !analysisResult) return;

    const doc = new jsPDF();

    // Add the uploaded image
    const img = new Image();
    img.src = uploadedImage.url;
    img.onload = () => {
      doc.addImage(img, 'JPEG', 10, 10, 180, 160);

      // Add the analysis result below the image
      doc.text(analysisResult, 10, 180);

      // Save the PDF
      doc.save(`${uploadedImage.name}-analysis.pdf`);
    };
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Invoice Image</h2>

      <button onClick={handleUploadClick}>Upload Image</button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {uploadedImage && (
        <>
          <div style={{ marginTop: 20 }}>
            <img src={uploadedImage.url} alt="Uploaded" style={{ maxWidth: '100%' }} />
          </div>

          <button onClick={handleAnalysisRequest} style={{ marginTop: 10 }}>
            {isLoading ? 'Analyzing...' : 'Run Analysis'}
          </button>

          {analysisResult && (
            <div style={{ marginTop: 20 }}>
              <h3>Analysis Result</h3>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{analysisResult}</pre>
            </div>
          )}

          {analysisResult && (
            <button onClick={downloadPDF} style={{ marginTop: 20 }}>
              Download as PDF
            </button>
          )}
        </>
      )}
    </div>
  );
}
