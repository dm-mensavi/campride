import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (Component: React.ComponentType<any>) => {
  const WrappedComponent: React.FC<any> = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/auth/signin');
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <p>Loading...</p>;
    }

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

export default withAuth;
