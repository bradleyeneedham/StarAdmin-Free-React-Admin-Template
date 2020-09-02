import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';

const App = (props) => {
  const [isFullPageLayout, setIsFullPageLayout] = useState(false)

  useEffect(() => {
    console.log("ROUTE CHANGED");
    console.log(props.location.pathname)
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/user-pages/login-1', '/user-pages/login-2', '/user-pages/register-1', '/user-pages/register-2', '/user-pages/lockscreen', '/user-pages/error-404', '/user-pages/error-500', '/general-pages/landing-page'];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (props.location.pathname === fullPageLayoutRoutes[i]) {
        setIsFullPageLayout(true)
        console.log('setting full page true')
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        setIsFullPageLayout(false)
        console.log('setting full page false')
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }, [isFullPageLayout, props.location.pathname])

  return (
    <div className="container-scroller">
      {!isFullPageLayout ? <Navbar /> : ''}
      <div className="container-fluid page-body-wrapper">
        {!isFullPageLayout ? <Sidebar /> : ''}
        <div className="main-panel">
          <div className="content-wrapper">
            <AppRoutes />
          </div>
          {!isFullPageLayout ? <Footer /> : ''}
        </div>
      </div>
    </div>
  );

}

export default withRouter(App);
