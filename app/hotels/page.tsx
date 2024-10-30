'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FaChartBar, FaHotel, FaSearch, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import HotelCard from '@/components/HotelCard';
import { hotelService } from '@/services/hotelService';

// Sidebar Styles
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fb;
`;

const Sidebar = styled.aside`
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #3c3c3c;
  color: white;
  padding: 20px;
`;

const Logo = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:before {
    content: "◥";
  }
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  color: white;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'none'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    margin-right: 12px;
  }
`;

// Main Content Styles
const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 20px 40px;
  background-color: #f5f7fb;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background-color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TitleSection = styled.div`
  h1 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .subtitle {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 16px 8px 40px;
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #3c3c3c;
    box-shadow: 0 0 0 2px rgba(60, 60, 60, 0.1);
  }
`;

const CreateButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  color: #333;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const HotelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      setLoading(true);
      const response = await hotelService.getAllHotels();

      if (response.success) {
        setHotels(response.data);
      } else {
        setError(response.error || 'Erreur de chargement');
      }
    } catch (err) {
      setError('Erreur lors du chargement des hôtels');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <Container>
      <Sidebar>
        <Logo>RED PRODUCT</Logo>
        <NavItem onClick={() => window.location.href = '/dashboard'}>
          <FaChartBar /> Dashboard
        </NavItem>
        <NavItem active>
          <FaHotel /> Liste des hôtels
        </NavItem>
      </Sidebar>

      <MainContent>
        <TopBar>
          <TitleSection>
            <h1>Liste des hôtels</h1>
            <div className="subtitle">
              <span>Hôtels</span>
              <span className="text-gray-400">{hotels.length}</span>
            </div>
          </TitleSection>

          <Actions>
            <SearchBar>
              <FaSearch 
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#999'
                }}
              />
              <SearchInput
                type="text"
                placeholder="Rechercher un hôtel..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>

            <CreateButton href="/newhotel">
              <span>+</span>
              <span>Créer un nouveau hôtel</span>
            </CreateButton>
          </Actions>
        </TopBar>

        <HotelsGrid>
          {hotels.map(hotel => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </HotelsGrid>
      </MainContent>
    </Container>
  );
};

export default HotelsPage;
