import { useNavigate, useLocation } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    // Navigate to the previous page or default to home
    navigate(location.state?.from || '/', { replace: true });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      <button onClick={goBack} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
