import { useEffect, useState } from 'react';

const useLoadGoogleMapsScript = (apiKey: string) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById('google-maps-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.id = 'google-maps-script';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsLoaded(true);
      };
      document.head.appendChild(script);
    } else {
      existingScript.onload = () => {
        setIsLoaded(true);
      };
      if (window.google) {
        setIsLoaded(true);
      }
    }
  }, [apiKey]);

  return isLoaded;
};

export default useLoadGoogleMapsScript;
