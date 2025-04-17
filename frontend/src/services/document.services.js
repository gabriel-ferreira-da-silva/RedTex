export async function getDocuments() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    try {
      const response = await fetch(`https://redtex.onrender.com/documents/byUser/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Failed to fetch documents:', error.message);
      throw error;
    }
  }
  

  export async function getDocumentById(documentId) {
  
    try {
      const response = await fetch(`https://redtex.onrender.com/${documentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Failed to fetch documents:', error.message);
      throw error;
    }
  }
  