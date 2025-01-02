import React from 'react';
import './Services.css';
import personalized from './personalizedLrbg.png';
import booking from './BookingSessionsrbg.png';
import secure from './SecurePaymentsrbg.png';
import study from './resourcesrbg.png';
import parent from './ParentalControlrbg.png';
import online from './OnlineTestsrbg.png'


const Services = () => {
  const images = [
    { src: personalized, label: 'Personalized Learning' },
    { src: booking, label: 'Booking Sessions' },
    { src: secure, label: 'Secure Payments' },
    { src: study, label: 'Study Materials' },
    { src: parent, label: 'Parental Control' },
    { src: online, label: 'Online Tests' }
  ];

  return (
    <div id = 'services-section'>
      <div className='services'>
        Services
      </div>

      <div className='servicesContainer'>
        <div className="image-grid-container">
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.src} alt={image.label} className="grid-image" />
              <div className="image-label">{image.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services;
