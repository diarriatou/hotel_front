'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #3c3c3c;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #3c3c3c;;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #3498db;
  text-decoration: none;
`;

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    acceptTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
        ...formData,
        role: 'admin'
        })
      });
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response not JSON");
      }
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Erreur d'inscription");
      }
  
      localStorage.setItem('token', data.token);
      router.push('/login');
  
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageContainer>
      <FormContainer>
        <Title>Inscrivez-vous en tant quAdmin</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            required
          />
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={e => setFormData({...formData, acceptTerms: e.target.checked})}
              required
            />
            <label>Accepter les termes et la politique</label>
          </CheckboxContainer>
          <Button type="submit" disabled={loading}>
            {loading ? 'Inscription...' : "S'inscrire"}
          </Button>
        </form>
        <StyledLink href="/login">Vous avez déjà un compte? Se connecter</StyledLink>
      </FormContainer>
    </PageContainer>
  );
};

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  text-align: center;
`;

export default Register;
