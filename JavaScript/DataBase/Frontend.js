document.addEventListener('DOMContentLoaded', () => 
{
  // Signup
  document.querySelector('#myModalSignUp .btn-primary').addEventListener('click', async (event) => 
  {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    try 
    {
      const response = await fetch('/signup', 
      {
        method: 'POST',
        
        headers: 
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userName: username, password }),
      });

      if (!response.ok) 
      {
        const { error } = await response.json();
        document.getElementById('errorMessageSignup').textContent = error;
      } 
      
      else 
      {
        document.getElementById('errorMessageSignup').textContent = 'Signup successful!';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupUsername').value = '';
        document.getElementById('signupPassword').value = '';
        document.getElementById('closeSignUp').click();
      }
    } 
    
    catch (error) 
    {
      document.getElementById('errorMessageSignup').textContent = 'An error occurred';
    }
  });

  // Login
  document.querySelector('#myModalLogin .btn-primary').addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try 
    {
      const response = await fetch('/login', 
      {
        method: 'POST',
        
        headers: 
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: username, password }),
      });

      if (!response.ok) 
      {
        const { error } = await response.json();
        document.getElementById('errorMessageLogin').textContent = error;
      } 
      
      else 
      {
        document.getElementById('errorMessageLogin').textContent = 'Login successful!';
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('closeLogin').click();
      }
    } 
    
    catch (error) 
    {
      document.getElementById('errorMessageLogin').textContent = 'An error occurred';
    }
  });
});
