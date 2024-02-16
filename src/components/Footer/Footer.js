import React from 'react';
import { Container, Grid, Link } from '@mui/material';
import config from '../../config.json';
import './Footer.scss';

const Footer = () => {
  return (
    <footer id='footer' className='footer'>
      <Container maxWidth='md'>
        <Grid container className='grid-container'>
          <Grid item xs={12} md={2} className='item'>
            <Link href={config.url.HOME} className='logo'>
              <img src={require('../../assets/biohaven-logo-footer.svg').default} alt='Site Logo' width={120} />
            </Link>
          </Grid>
          <Grid item xs={12} md={5} className='item copyright'>
            &copy; 2022 Biohaven Pharmaceuticals
          </Grid>
          <Grid item xs={12} md={5} className='item fnav'>
            <Link href={config.url.PRIVACY} target='_blank'>
              Privacy Policy
            </Link>
            <Link href={config.url.TERMS} target='_blank'>
              Terms &amp; Conditions
            </Link>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
