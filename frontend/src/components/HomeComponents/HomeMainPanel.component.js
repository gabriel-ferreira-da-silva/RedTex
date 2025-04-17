import React, { useRef, useState } from 'react';
import styles from './Home.module.css';
import upload from '../../assets/upload.svg';
import download from '../../assets/dowload.svg';
import FileView from './FileView.component';
import ResponsePanel from './ResponsePanel.component';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function HomeMainPanel() {
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [docMetadata, setDocMetadata] = useState(null); // <-- Renomeado aqui
  
  function wrapText(text, font, fontSize, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
  
    for (let word of words) {
      const testLine = currentLine ? currentLine + ' ' + word : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
  
      if (width < maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
  
    if (currentLine) {
      lines.push(currentLine);
    }
  
    return lines;
  }

  
  const handleDownloadAppendedPDF = async () => {
    if (!uploadedFile || !analysisResult) {
      alert('You need to upload a file and run analysis first.');
      return;
    }

    const fileData = await fetch(uploadedFile.url);
    const fileBuffer = await fileData.arrayBuffer();
    const originalPdf = await PDFDocument.load(fileBuffer);
    const newPdf = await PDFDocument.create();

    // Copy original pages
    const copiedPages = await newPdf.copyPages(originalPdf, originalPdf.getPageIndices());
    copiedPages.forEach(page => newPdf.addPage(page));

    // Add new page with the response
    const page = newPdf.addPage();
    const { width, height } = page.getSize();
    const font = await newPdf.embedFont(StandardFonts.Helvetica);
    
    const fontSize = 12;
    const margin = 50;
    const maxWidth = width - 2 * margin;
    
    const lines = analysisResult.split('\n');
    let y = height - margin;
    
    for (let line of lines) {
      const wrappedLines = wrapText(line, font, fontSize, maxWidth);
    
      for (const wrappedLine of wrappedLines) {
        if (y < margin) {
          page = newPdf.addPage();
          y = height - margin;
        }
    
        page.drawText(wrappedLine, {
          x: margin,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
    
        y -= fontSize + 4;
      }
    }
    

    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const a = window.document.createElement('a');
    a.href = url;
    a.download = 'document_with_analysis.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleAnalysisRequest = async () => {
    setIsLoading(true);
    try {
      const documentId = uploadedFile?.id;
      const response = await fetch(`https://redtex.onrender.com/openairesponse/analyzis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentId, extension: uploadedFile.extension  }),
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Upload success:', data);
      setDocMetadata(data);

      const byteValues = Object.values(data.body);
      const byteArray = new Uint8Array(byteValues);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(blob);

      setUploadedFile({
        id: data.id,
        name: data.name,
        extension: data.extension,
        url: fileUrl,
      });
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className={styles.container}>
      <div className={styles.uploadActions}>
        <div className={styles.uploadButton} onClick={handleUploadClick}>
          <div className={styles.textButton}>Upload File</div>
          <img src={upload} alt="upload" className={styles.imageButton} />
        </div>

        <button className={styles.downloadButton} onClick={handleDownloadAppendedPDF}>
          <div className={styles.textButton}>dowload appended</div>
          <img src={download} alt="upload" className={styles.imageButton} />
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {uploadedFile && (
        <div className={styles.viewAndChatContainer}>
          <div className={styles.previewSection}>
            <FileView uploadedFile={uploadedFile} />
          </div>

          <div className={styles.responseSection}>
            <ResponsePanel
              isLoading={isLoading}
              analysisResult={analysisResult}
              handleAnalysisRequest={handleAnalysisRequest}
            />
          </div>
        </div>
      )}
    </div>
  );
}
