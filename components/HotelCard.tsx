'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
 
  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #f3f4f6;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Address = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const Name = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-weight: 500;
  color: #2d3748;
`;

interface HotelProps {
  hotel: {
    _id: string;
    name: string;
    address: string;
    price: number;
    currency: string;
    photo: string;
  };
}

const HotelCard: React.FC<HotelProps> = ({ hotel }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/uploads/${hotel.photo}`;
 
  return (
    <Card>
      <ImageContainer>
        {!imageError ? (
          <Image
            src={imageUrl}
            alt={hotel.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            onError={() => setImageError(true)}
            priority
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6',
            color: '#666'
          }}>
            Image non disponible
          </div>
        )}
      </ImageContainer>
      <Content>
        <Address>{hotel.address}</Address>
        <Name>{hotel.name}</Name>
        <Price>{hotel.price.toLocaleString()} {hotel.currency}</Price>
      </Content>
    </Card>
  );
};

export default HotelCard;