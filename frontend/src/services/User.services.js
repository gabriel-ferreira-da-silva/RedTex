export async function createUser(username, password, email, name) {
    try {
      const response = await fetch('https://redtex.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, name}),
      });
  
      if (!response.ok) {   
        throw new Error('Invalid credentials');
      }
  
      const userResponse = await fetch(`https://redtex.onrender.com/users/username/${username}`);
  
      const data = await response.json();
      console.log('Logged in:', data);
      localStorage.setItem('token', data.access_token);

      const userData = await userResponse.json();
      console.log('Logged in:', userData);
      localStorage.setItem('user', JSON.stringify(userData));
  
      localStorage.setItem('token', data.access_token);
  
      window.location.href = '/home';

    } catch (error) {
      console.error('register failed:', error.message);
      alert('register failed: ' + error.message);
    }
  }
  