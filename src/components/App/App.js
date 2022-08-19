import { DoctPageLoading } from '@doct-react/app';
import { useEffect } from 'react';
import { AppRoutes } from '../../routes';
import TrackApp from '../TrackApp';

function App() {
  function pageLoad() {
    const loaderEl = document.getElementById('loader');
    if (loaderEl) loaderEl.style.display = `none`;
  }

  useEffect(() => {
    window.addEventListener('load', pageLoad);
    return () => {
      window.removeEventListener('scroll', pageLoad);
    };
  }, []);

  return (
    <TrackApp>
      <div id="loader" className="app-loader">
        <DoctPageLoading />
      </div>
      <AppRoutes />
    </TrackApp>
  );
}

export default App;
