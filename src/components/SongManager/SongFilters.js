import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { setFilters } from '@store/slices/songsSlice';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Card from '../UI/Card';

const FiltersContainer = styled(Card)`
  margin-bottom: ${props => props.theme.space[4]}px;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.space[4]}px;
  margin-bottom: ${props => props.theme.space[4]}px;
`;

const FilterActions = styled.div`
  display: flex;
  gap: ${props => props.theme.space[3]}px;
  justify-content: flex-end;
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