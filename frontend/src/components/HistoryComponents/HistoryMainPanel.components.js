import React, { useEffect, useState } from 'react';
import { getDocuments } from '../../services/document.services';
import DocumentCard from './DocumentCard.component';

export default function HistoryMainPanel() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User Document History</h2>
      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <div key={doc.id}>
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
