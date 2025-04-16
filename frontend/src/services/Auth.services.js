export async function handleLogin(username, password) {
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {   
        throw new Error('Invalid credentials');
      }

      const userResponse = await fetch(`http://localhost:4000/users/username/${username}`);
  
      const data = await response.json();
      console.log('Logged in:', data);
      localStorage.setItem('token', data.access_token);

      const userData = await userResponse.json();
      console.log('Logged in:', userData);
      localStorage.setItem('user', JSON.stringify(userData));

      window.location.href = '/home';

    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Login failed: ' + error.message);
    }
  }
  