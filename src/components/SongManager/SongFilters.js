import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { setFilters } from '@store/slices/songsSlice';
import Input from '../UI/Input';
import Button from '../UI/Button';

const FiltersContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.radii.xl};
  padding: ${props => props.theme.space[6]}px;
  margin-bottom: ${props => props.theme.space[8]}px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.space[4]}px;
    margin-bottom: ${props => props.theme.space[6]}px;
    border-radius: ${props => props.theme.radii.lg};
  }
`;

const FiltersTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[900]};
  margin: 0 0 ${props => props.theme.space[5]}px 0;
  
  @media (max-width: 768px) {
    font-size: ${props => props.theme.fontSizes.base};
    margin-bottom: ${props => props.theme.space[4]}px;
  }
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${props => props.theme.space[5]}px;
  margin-bottom: ${props => props.theme.space[6]}px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.space[4]}px;
    margin-bottom: ${props => props.theme.space[5]}px;
  }
`;

const FilterActions = styled.div`
  display: flex;
  gap: ${props => props.theme.space[3]}px;
  justify-content: flex-end;
  padding-top: ${props => props.theme.space[4]}px;
  border-top: 1px solid ${props => props.theme.colors.gray[100]};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${props => props.theme.space[2]}px;
    padding-top: ${props => props.theme.space[3]}px;
  }
`;

const SongFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.songs);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      artist: '',
      album: '',
      year: '',
    };
    setLocalFilters(clearedFilters);
    dispatch(setFilters(clearedFilters));
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value.trim() !== '');

  return (
    <FiltersContainer>
      <FiltersTitle>Filter Songs</FiltersTitle>
      <FiltersGrid>
        <Input
          label="Search"
          placeholder="Search songs or artists..."
          value={localFilters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
        <Input
          label="Artist"
          placeholder="Filter by artist..."
          value={localFilters.artist}
          onChange={(e) => handleFilterChange('artist', e.target.value)}
        />
        <Input
          label="Album"
          placeholder="Filter by album..."
          value={localFilters.album}
          onChange={(e) => handleFilterChange('album', e.target.value)}
        />
        <Input
          label="Year"
          placeholder="Filter by year..."
          type="number"
          value={localFilters.year}
          onChange={(e) => handleFilterChange('year', e.target.value)}
        />
      </FiltersGrid>
      <FilterActions>
        <Button
          variant="secondary"
          onClick={handleClearFilters}
          disabled={!hasActiveFilters}
        >
          Clear Filters
        </Button>
        <Button onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </FilterActions>
    </FiltersContainer>
  );
};

export default SongFilters;