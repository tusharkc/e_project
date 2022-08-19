import { useEffect, useState } from 'react';

const useGenerateRandomColor = () => {
  const [color, setColor] = useState('');

  useEffect(() => {
    setColor(Math.random().toString(16).substr(-6));
  }, []);

  return { color };
};
export default useGenerateRandomColor;
