import React from 'react';
export default function Drawer({ children, SetIsDrawerOpen, isDrawerOpen }) {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  const body = document.body;

  const handleScrollbar = React.useCallback(() => {
    if (isDrawerOpen) {
      body.style.paddingRight = scrollBarWidth + 'px';
      body.style.overflow = 'hidden';
    } else {
      body.style.paddingRight = 0;
      body.style.overflow = 'initial';
    }
  }, [isDrawerOpen, body.style.paddingRight, body.style.overflow, scrollBarWidth]);

  React.useEffect(() => {
    handleScrollbar();
  }, [isDrawerOpen, handleScrollbar]);

  return (
    <React.Fragment>
      <div className={`${isDrawerOpen ? 'd-block' : 'd-none'} drawer`}>
        <div className="drawer-back-drop" onClick={() => SetIsDrawerOpen(false)}></div>
      </div>
      <div
        className={`${
          isDrawerOpen ? 'drawer-content drawer-content-open' : 'drawer-content'
        } drawer-content`}
      >
        {children}
      </div>
      <style jsx>{`
        .drawer {
          z-index: 10000;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
        .drawer-back-drop {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: -1;
        }
        .drawer-content {
          z-index: 10001;
          width: 220px;
          position: fixed;
          margin-left: auto;
          top: 0;
          left: 0;
          bottom: 0;
          right: -220px;
          background: white;
          transition: 0.3s ease;
        }
        .drawer-content-open {
          right: 0;
          box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14),
            0px 6px 30px 5px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </React.Fragment>
  );
}
