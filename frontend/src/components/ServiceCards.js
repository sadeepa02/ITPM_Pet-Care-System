import React from 'react';
import ServiceCard from './ServiceCard';
import { FaHeartbeat, FaStethoscope, FaSyringe, FaUserMd } from 'react-icons/fa';

const ServiceCards = () => {
  const services = [
    {
      icon: <FaHeartbeat />,
      title: 'Wellness Exams',
      description: 'Regular check-ups and preventative care to keep your pet healthy and happy for years to come.'
    },
    {
      icon: <FaStethoscope />,
      title: 'Vaccinations',
      description: 'Protection against common and serious pet diseases with our vaccination protocols.'
    },
    {
      icon: <FaSyringe />,
      title: 'Surgery',
      description: 'From routine procedures to complex surgeries, our skilled veterinary team provides expert care.'
    },
    {
      icon: <FaUserMd />,
      title: 'Lab Services',
      description: 'Advanced diagnostic testing to help identify and treat your pets health concerns.'
    }
  ];

  return (
    <section id="services" style={{ display: 'flex', justifyContent: 'center', padding: '50px 20px', gap: '30px' }}>
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          icon={service.icon}
          title={service.title}
          description={service.description}
        />
      ))}
    </section>
  );
};

export default ServiceCards;