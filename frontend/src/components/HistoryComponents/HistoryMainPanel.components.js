import React, { useEffect, useState } from 'react';
import { getDocuments } from '../../services/document.services';
import DocumentCard from './DocumentCard.component';
import { useNavigate } from 'react-router-dom';
import styles from '../HomeComponents/Home.module.css'

export default function HistoryMainPanel() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/history/${id}`);
  };


  useEffect(() => {
    async function fetchDocuments() {
      try {
        const docs = await getDocuments();
        setDocuments(docs); // make sure getDocuments returns the data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, []);

  if (loading) return <div className={styles.loadingOverlay}> <div className={styles.spinner}></div> <p>fetching documents</p> </div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <div key={doc.id} onClick={() => handleClick(doc.id)}>
              <DocumentCard
              name={doc.name}
              date={doc.createdAt}
              response={doc.responses[0]?doc.responses[0].body : "not analized yet" }
              description={doc.description }
              ></DocumentCard>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
