import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import config from '../../config.json';
import './Header.scss';

const Header = () => {
  return (
    <>
      <header>
        <Container maxWidth='lg' className='header-container'>
          <Container maxWidth='md'>
            <Link href={config.url.HOME} className='logo'>
              <img src={require('../../assets/biohaven-logo-header.svg').default} alt='Site Logo' width={180} />
            </Link>
            <Typography className='heading'>BIOHAVEN SCIENTIFIC PRESENTATIONS PORTAL</Typography>
          </Container>
        </Container>
      </header>
      <Typography sx={{ fontWeight: 'bold', fontSize: 18 }} className='message'>
        <div className='p1'>
          This site contains Biohaven presentations that were presented at <span className='nowrap'>scientific congresses.</span>
        </div>
        <div className='p2'>
          Use the search bar or filter topics below to locate <span className='nowrap'>presentations of interest.</span>
        </div>
      </Typography>
    </>
  );
};

export default Header;
