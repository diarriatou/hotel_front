'use client';
import React from 'react';
import styled from 'styled-components';
import { 
  FaWpforms, 
  FaEnvelope, 
  FaUsers, 
  FaHotel, 
  FaChartBar, 
  FaSearch, 
  FaBell, 
  FaUser, 
  FaSignOutAlt 
} from 'react-icons/fa';

// Sidebar Styles
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

const NavItem = styled.button<{ active?: boolean }>`
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
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fb;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
`;

const ContentWrapper = styled.div`
  padding: 20px 40px;
`;

// Navbar Styles
const NavBar = styled.nav`
  background-color: white;
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 8px 16px;
  width: 300px;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  margin-left: 10px;
  flex: 1;
  outline: none;
  font-size: 14px;
  
  &::placeholder {
    color: #999;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #666;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

// Dashboard Content Styles
const WelcomeSection = styled.div`
  margin: 40px 0;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 16px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 14px;
`;

// Dashboard Component
const Dashboard = () => {
  const stats = [
    { label: 'Formulaires', value: 125, color: '#8e44ad', icon: FaWpforms },
    { label: 'Messages', value: 40, color: '#2ecc71', icon: FaEnvelope },
    { label: 'Utilisateurs', value: 600, color: '#f1c40f', icon: FaUsers },
    { label: 'E-mails', value: 25, color: '#e74c3c', icon: FaEnvelope },
    { label: 'Hôtels', value: 40, color: '#3498db', icon: FaHotel },
    { label: 'Entrées', value: 2, color: '#34495e', icon: FaChartBar },
  ];

  const handleLogout = () => {
    localStorage.removeItem('userInfos')
    window.location.href = '/';
  };

  const navigateToHotels = () => {
    window.location.href = '/hotels';
  };

  return (
    <Container>
      <Sidebar>
        <Logo>RED PRODUCT</Logo>
        <NavItem active onClick={() => window.location.href = '/dashboard'}>
          <FaChartBar /> Dashboard
        </NavItem>
        <NavItem onClick={navigateToHotels}>
          <FaHotel /> Liste des hôtels
        </NavItem>
      </Sidebar>

      <MainContent>
        <NavBar>
          <SearchContainer>
            <FaSearch color="#999" />
            <SearchInput placeholder="Rechercher..." />
          </SearchContainer>

          <NavActions>
            <IconButton>
              <FaBell size={20} />
            </IconButton>
            <IconButton>
              <FaUser size={20} />
            </IconButton>
            <IconButton onClick={handleLogout}>
              <FaSignOutAlt size={20} />
            </IconButton>
          </NavActions>
        </NavBar>

        <ContentWrapper>
          <WelcomeSection>
            <Title>Bienvenue sur RED Product</Title>
            <Subtitle>Vue densemble de votre activité</Subtitle>
          </WelcomeSection>

          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard key={index}>
                <IconWrapper color={stat.color}>
                  {React.createElement(stat.icon, { color: 'white', size: 24 })}
                </IconWrapper>
                <StatInfo>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </StatInfo>
              </StatCard>
            ))}
          </StatsGrid>
        </ContentWrapper>
      </MainContent>
    </Container>
  );
};

export default Dashboard;