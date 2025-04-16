import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocumentById } from '../../services/document.services'; // Assuming a service for fetching a single document
import FileView from '../HomeComponents/FileView.component';
import ResponsePanel from '../HomeComponents/ResponsePanel.component';
import styles from './History.module.css'

export default function DocumentMainPanel() {
  const { docId } = useParams(); // Get the docId from the route
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null)

  useEffect(() => {
    async function fetchDocument() {
      try {
        const doc = await getDocumentById(docId); // Fetch the document by its ID
        // Convert the base64 document body into a Blob for PDF rendering
        const byteValues = Object.values(doc.documentDTO.body);
        const byteArray = new Uint8Array(byteValues);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(blob);

        setDocument({
          ...doc.documentDTO,
          url: fileUrl, // Add the URL for the PDF
        });

        if (doc?.response?.body) {
          setResponse(doc.response.body);
        } else {
          setResponse("no analyzes request");
        }

      } catch (err) {
        console.log(err)
        setError('Failed to load document');
      } finally {
        setIsLoading(false);
      }
    }

    fetchDocument();
  }, [docId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!document) return <p>Document not found.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.pdfSection}>
        <FileView uploadedFile={document} />
      </div>
  
      <div className={styles.responseSection}>
        <ResponsePanel
          isLoading={isLoading}
          analysisResult={response}
          handleAnalysisRequest={() => alert('Analyze document functionality')}
        />
      </div>
    </div>
  );
  
}
