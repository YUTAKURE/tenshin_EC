import React from 'react';
import IframeComponent from '../components/IframeComponent';

const GoogleMap: React.FC = () => {
  return (
    <div className="relative w-full pb-custom-pb mt-40">
      <IframeComponent
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3257.022132601645!2d138.915745075828!3d35.28057597271914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f60.0!3m3!1m2!1s0x601977ccf06c226d%3A0xcdc17be8f7e2fedc!2z5Lit6I-vIOWkqeW_gw!5e0!3m2!1sja!2sca!4v1721716374679!5m2!1sja!2sca"
        style={{ border: '0' }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></IframeComponent>
    </div>
  );
};

export default GoogleMap;
