import React, { useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import style from './ImageOCR.module.css'
import styles from '../HomeComponents/Home.module.css'
import ReactMarkdown from 'react-markdown';

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
      const response = await fetch('https://redtex.onrender.com/documents', {
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
      const response = await fetch(`https://redtex.onrender.com/openairesponse/analyzis`, {
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
    const img = new Image();
    img.src = uploadedImage.url;
    img.onload = () => {
      doc.addImage(img, 'JPEG', 10, 10, 180, 160);
      doc.text(analysisResult, 10, 180);
      doc.save(`${uploadedImage.name}-analysis.pdf`);
    };
  };

  return (
    <div className={style.container}>

      <div className={style.uploadButton} onClick={handleUploadClick}>
        <div className={style.textButton}>Upload Image</div>
      </div>

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

          <div className={style.uploadButton} onClick={handleAnalysisRequest}>
            {isLoading ? 
              <div className={styles.loadingOverlay}>
                <div className={styles.spinner}></div>
                <p>Analyzing document...</p>
              </div> : 
              <div className={style.textButton}>Run</div>
            }
          </div>

          {analysisResult && (
            <div className={style.responseSection}>
              <h3>Analysis Result</h3>
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                <ReactMarkdown>
                          {analysisResult || "Click to get AI analysis"}
                </ReactMarkdown>
                </pre>
            </div>
          )}

          {analysisResult && (
            <div className={style.uploadButton} onClick={downloadPDF} style={{ marginTop: 20 }}>
              <div className={style.textButton}>Dowload</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
