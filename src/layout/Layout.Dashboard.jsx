import React from 'react';
import { Outlet } from 'react-router';
import { Header } from './components';

function LayoutDashboard({ showHeader = true }) {
  return (
    <>
      {showHeader && <Header />}
      <Outlet />
    </>
  );
}

export default LayoutDashboard;
