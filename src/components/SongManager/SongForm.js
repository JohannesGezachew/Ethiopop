import React from 'react';
import styled from '@emotion/styled';
import Input from '../UI/Input';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space[4]}px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.space[4]}px;
  
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.space[3]}px ${props => props.theme.space[4]}px;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.radii.md};
  font-size: ${props => props.theme.fontSizes.base};
  background-color: ${props => props.theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.gray[50]};
    color: ${props => props.theme.colors.gray[500]};
    cursor: not-allowed;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space[2]}px;
`;

const Label = styled.label`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray[700]};
`;

const ErrorMessage = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.red[600]};
`;

const SongForm = ({ id, formData, setFormData, errors, onSubmit }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Form id={id} onSubmit={onSubmit}>
      <Input
        label="Song Title"
        placeholder="Enter song title..."
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        error={errors.title}
        required
      />
      
      <Input
        label="Artist"
        placeholder="Enter artist name..."
        value={formData.artist}
        onChange={(e) => handleChange('artist', e.target.value)}
        error={errors.artist}
        required
      />
      
      <Input
        label="Album"
        placeholder="Enter album name..."
        value={formData.album}
        onChange={(e) => handleChange('album', e.target.value)}
        error={errors.album}
        required
      />
      
      <Input
        label="Description"
        placeholder="Enter song description..."
        value={formData.description || ''}
        onChange={(e) => handleChange('description', e.target.value)}
        multiline
        rows={3}
      />
      
      <Input
        label="YouTube Link (Optional)"
        placeholder="https://www.youtube.com/watch?v=..."
        value={formData.youtubeUrl || ''}
        onChange={(e) => handleChange('youtubeUrl', e.target.value)}
        error={errors.youtubeUrl}
      />
      
      <FormRow>
        <Input
          label="Year"
          type="number"
          placeholder="2024"
          min="1900"
          max={new Date().getFullYear() + 1}
          value={formData.year}
          onChange={(e) => handleChange('year', parseInt(e.target.value) || '')}
          error={errors.year}
          required
        />
        
        <SelectContainer>
          <Label>Genre</Label>
          <Select
            value={formData.genre}
            onChange={(e) => handleChange('genre', e.target.value)}
            required
          >
            <option value="">Select genre...</option>
            <option value="Traditional">Traditional</option>
            <option value="Jazz">Jazz</option>
            <option value="Pop">Pop</option>
            <option value="Folk">Folk</option>
            <option value="Reggae">Reggae</option>
            <option value="Hip-Hop">Hip-Hop</option>
            <option value="R&B">R&B</option>
            <option value="Rock">Rock</option>
            <option value="Blues">Blues</option>
            <option value="Gospel">Gospel</option>
          </Select>
          {errors.genre && <ErrorMessage>{errors.genre}</ErrorMessage>}
        </SelectContainer>
      </FormRow>
      
      <FormRow>
        <Input
          label={`Duration (seconds) - ${formatDuration(formData.duration)}`}
          type="number"
          placeholder="180"
          min="1"
          max="3600"
          value={formData.duration}
          onChange={(e) => handleChange('duration', parseInt(e.target.value) || '')}
          error={errors.duration}
          required
        />
        
        <SelectContainer>
          <Label>Language</Label>
          <Select
            value={formData.language}
            onChange={(e) => handleChange('language', e.target.value)}
            required
          >
            <option value="Amharic">Amharic</option>
            <option value="Tigrinya">Tigrinya</option>
            <option value="Oromo">Oromo</option>
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
            <option value="Somali">Somali</option>
            <option value="Afar">Afar</option>
            <option value="Gurage">Gurage</option>
          </Select>
          {errors.language && <ErrorMessage>{errors.language}</ErrorMessage>}
        </SelectContainer>
      </FormRow>
    </Form>
  );
};

export default SongForm;