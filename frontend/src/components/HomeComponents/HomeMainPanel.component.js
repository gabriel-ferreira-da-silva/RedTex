import React, { useRef, useState } from 'react';
import styles from './Home.module.css';
import upload from '../../assets/upload.svg';
import ai from '../../assets/ai.svg';
import FileView from './FileView.component';

export default function HomeMainPanel() {
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null); 

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const base64 = await toBase64(file);
    const extension = file.name.split('.').pop();

    const payload = {
      name: file.name.split('.')[0],
      description: 'huhuhuhuhuhuhuhuhu',
      userId: '56067545-e6f4-4245-ba97-7786f54e7ccc',
      body: base64.replace(/^data:.*;base64,/, ''),
      extension: extension,
    };

    try {
      const response = await fetch('http://localhost:4000/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Upload success:', data);
      
      const byteValues = Object.values(data.body);
      const byteArray = new Uint8Array(byteValues);
      
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(blob);
      
      setUploadedFile({
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

      <div className={styles.uploadButton} onClick={handleUploadClick}>
        <div className={styles.textButton}>Upload File</div>
        <img src={upload} alt="upload" className={styles.imageButton} />
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
          <div className={styles.textAndButtonContainer}>
            <p>Any additional text here</p>
            <div className={styles.uploadButton} onClick={handleUploadClick}>
              <div className={styles.textButton}>AI analysis</div>
              <img src={ai} alt="upload" className={styles.imageButton} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
