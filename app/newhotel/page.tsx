'use client';
import React, { useState } from 'react';
import styled from 'styled-components';


// Types
interface HotelData {
  name: string;
  address: string;
  email: string;
  phone: string;
  price: string;
  currency: string;
  photo: File | null;
}

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
`;

const BackButton = styled.button`
  border: none;
  background: none;
  color: #666;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #333;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #6b7280;
    box-shadow: 0 0 0 2px rgba(107, 114, 128, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
`;

const ImageUploadContainer = styled.div`
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
`;

const PreviewImage = styled.img`
  width: 128px;
  height: 128px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const SubmitButton = styled.button`
  background-color: #374151;
  color: white;
  padding: 8px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-end;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1f2937;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ErrorAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  margin-bottom: 16px;
`;

const SuccessAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: #dcfce7;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  color: #15803d;
  margin-bottom: 16px;
`;

const CreateHotelPage = () => {
  const [hotelData, setHotelData] = useState<HotelData>({
    name: '',
    address: '',
    email: '',
    phone: '',
    price: '',
    currency: 'XOF',
    photo: null,
  });

  const [previewImage, setPreviewImage] = useState<string>('/placeholder-image.png');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHotelData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Réinitialiser l'erreur quand l'utilisateur modifie un champ
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('La taille de l\'image ne doit pas dépasser 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Seules les images sont autorisées');
        return;
      }
      setHotelData(prev => ({
        ...prev,
        photo: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
      setError('');
    }
  };

  const validateData = () => {
    if (!hotelData.name.trim()) {
      setError('Le nom de l\'hôtel est requis');
      return false;
    }
    if (!hotelData.address.trim()) {
      setError('L\'adresse est requise');
      return false;
    }
    if (!hotelData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(hotelData.email)) {
      setError('Email invalide');
      return false;
    }
    if (!hotelData.phone.trim()) {
      setError('Le numéro de téléphone est requis');
      return false;
    }
    if (!hotelData.price.trim() || isNaN(Number(hotelData.price))) {
      setError('Prix invalide');
      return false;
    }
    if (!hotelData.photo) {
      setError('Une photo est requise');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateData()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      Object.entries(hotelData).forEach(([key, value]) => {
        if (key === 'price') {
          formData.append(key, value.toString());
        } else if (key === 'photo' && value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && key !== 'photo') {
          formData.append(key, value.toString());
        }
      });

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/hotels', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'enregistrement');
      }

      setSuccess(true);
      setHotelData({
        name: '',
        address: '',
        email: '',
        phone: '',
        price: '',
        currency: 'XOF',
        photo: null,
      });
      setPreviewImage('/placeholder-image.png');

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => window.history.back()}>←</BackButton>
        <Title>CRÉER UN NOUVEAU HÔTEL</Title>
      </Header>

      {error && (
        <ErrorAlert>
          {error}
        </ErrorAlert>
      )}

      {success && (
        <SuccessAlert>
          L&apos;hôtel a été créé avec succès !
        </SuccessAlert>
      )}

      <Form onSubmit={handleSubmit}>
        <FieldRow>
          <FormGroup>
            <Label>Nom de l&apos;hôtel *</Label>
            <Input
              type="text"
              name="name"
              value={hotelData.name}
              onChange={handleChange}
              placeholder="CAP Marmiane"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Adresse *</Label>
            <Input
              type="text"
              name="address"
              value={hotelData.address}
              onChange={handleChange}
              placeholder="Les îles du saloum, Mar Lodj"
              required
            />
          </FormGroup>
        </FieldRow>

        <FieldRow>
          <FormGroup>
            <Label>E-mail *</Label>
            <Input
              type="email"
              name="email"
              value={hotelData.email}
              onChange={handleChange}
              placeholder="information@gmail.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Numéro de téléphone *</Label>
            <Input
              type="tel"
              name="phone"
              value={hotelData.phone}
              onChange={handleChange}
              placeholder="+221 77 777 77 77"
              required
            />
          </FormGroup>
        </FieldRow>

        <FieldRow>
          <FormGroup>
            <Label>Prix par nuit *</Label>
            <Input
              type="text"
              name="price"
              value={hotelData.price}
              onChange={handleChange}
              placeholder="25000"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Devise</Label>
            <Select
              name="currency"
              value={hotelData.currency}
              onChange={handleChange}
            >
              <option value="XOF">F XOF</option>
              <option value="Euro">Euro</option>
              <option value="Dollar">Dollar</option>
            </Select>
          </FormGroup>
        </FieldRow>

        <FormGroup>
          <Label>Photo de l&apos;hôtel *</Label>
          <ImageUploadContainer>
            {previewImage && (
              <PreviewImage
                src={previewImage}
                alt="Aperçu"
              />
            )}
            <Input
              type="file"
              name="photo"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            <p>PNG, JPG jusqu&apos;à 5MB</p>
          </ImageUploadContainer>
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default CreateHotelPage;