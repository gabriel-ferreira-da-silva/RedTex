export async function getDocuments() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    try {
      const response = await fetch(`http://localhost:4000/documents/byUser/${user.id}`, {
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
  