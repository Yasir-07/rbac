import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {

      if (currentUser.role === 'admin') {
        navigate('/admin');
      } else {

        navigate('/home');
      }
    } else {

      navigate('/login');
    }
  }, [currentUser, navigate]);

  return null;
};

export default HomePage;