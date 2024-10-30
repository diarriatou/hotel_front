'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #3c3c3c;
  padding: 20px;
`;

const Logo = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #3c3c3c;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  
  &:focus {
    border-color: #3c3c3c;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3c3c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #2c2c2c;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  color: #3c3c3c;
  font-size: 0.9rem;
`;

const StyledLinkYellow = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #f1c40f;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SignUpContainer = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  color: #3c3c3c;
  font-size: 0.9rem;
`;

const StyledLinkYellowInline = styled.a`
  color: #f1c40f;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    //console.log('Connexion:', { email, password, rememberMe });
    const formData = {email: email, password: password }
    
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
        ...formData
        })
      });

      const data = await response.json();
      if(data.success && data?.data.token) {
        localStorage.setItem('userInfos', JSON.stringify(data.data))
        window.location.href = '/dashboard';
      } else if(data?.success === false && data.error) {
        window.alert(data.error)
      }
      else {
        window.alert('Impossible de se connecter')
      }
    } catch (error) {
      console.log(error)
      window.alert('Impossible de se connecter')
    } finally {
      setLoading(false)
    }
  };

  return (
    <PageContainer>
      <Logo>RED PRODUCT</Logo>
      <FormContainer>
        <Title>Connectez-vous en tant que Admin</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <CheckboxLabel>Gardez-moi connecté</CheckboxLabel>
          </CheckboxContainer>
          <Button type="submit">
            {
              loading ? 'Connexion en cours' : 'Se connecter'
            }
          </Button>
        </form>
        <StyledLinkYellow href="/forgot-password">
          Mot de passe oublié?
        </StyledLinkYellow>
        <SignUpContainer>
          Vous navez pas de compte?{' '}
          <StyledLinkYellowInline href="/register">
            Sinscrire
          </StyledLinkYellowInline>
        </SignUpContainer>
      </FormContainer>
    </PageContainer>
  );
};

export default Login;