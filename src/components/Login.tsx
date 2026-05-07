



export const Login = () => {
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    window.location.reload(); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome Back!</h2>
      <button onClick={handleLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Click here to Log In
      </button>
    </div>
  );
};
