'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #3c3c3c;
`;

const LogoText = styled.div`
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

const TitleText = styled.h1`
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

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #f1c40f;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`

const SignUpContainer = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  color: #3c3c3c;
  font-size: 0.9rem;
`;

const RegisterLink = styled(Link)`
  color: #f1c40f;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData.email, formData.password);
      
      if (response.success && response.data?.token) {
        console.log('Connexion réussie');
        router.push('/dashboard');
      } else {
        setError(response.error || 'Erreur de connexion');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Erreur de connexion:', err);
      setError('Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <LogoText>RED PRODUCT</LogoText>
      <FormContainer>
        <TitleText>Connectez-vous en tant que Admin</TitleText>
        
        {error && (
          <div style={{
            color: 'red',
            backgroundColor: '#ffebee',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
          <Button 
            type="submit" 
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>

        <StyledLink href="/forgot-password">
          Mot de passe oublié?
        </StyledLink>

        <SignUpContainer>
          <span>Vous n&apos;avez pas de compte? </span>
          <RegisterLink href="/register">
            S&apos;inscrire
          </RegisterLink>
        </SignUpContainer>
      </FormContainer>
    </PageContainer>
  );
}