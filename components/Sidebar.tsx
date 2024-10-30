'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #3c3c3c;
  color: white;
  padding: 20px;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin-bottom: 40px;
`;

const NavItem = styled.div`
  margin-bottom: 15px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo>RED PRODUCT</Logo>
      <nav>
        <NavItem>
          <StyledLink href="/dashboard">Dashboard</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink href="hotelCard">Lister les hotels</StyledLink>
        </NavItem>
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;