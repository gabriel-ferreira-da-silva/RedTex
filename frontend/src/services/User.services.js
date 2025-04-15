export async function createUser(username, password, email, name) {
    try {
      const response = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, name}),
      });
  
      if (!response.ok) {   
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
      console.log('Register in:', data);
  
      localStorage.setItem('token', data.access_token);
  
      window.location.href = '/home';

    } catch (error) {
      console.error('register failed:', error.message);
      alert('register failed: ' + error.message);
    }
  }
  