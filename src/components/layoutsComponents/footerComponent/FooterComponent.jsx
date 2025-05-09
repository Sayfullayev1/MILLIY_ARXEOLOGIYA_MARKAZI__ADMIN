import React from 'react';
import './footerComponent.scss';

export default function FooterComponent() {
  return (
    <footer className='footer'>
      <div className='footer__content'>
        <p>&copy; 2023 MyApp. All rights reserved.</p>
        <nav className='footer__nav'>
          <ul>
            <li><a href='/privacy'>Privacy Policy</a></li>
            <li><a href='/terms'>Terms of Service</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
