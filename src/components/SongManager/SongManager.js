import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { fetchSongsRequest } from '@store/slices/songsSlice';
import SongHeader from './SongHeader';
import SongFilters from './SongFilters';
import SongTable from './SongTable';
import SongModals from './SongModals';
import Pagination from './Pagination';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space[6]}px;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space[4]}px;
`;

const SongManager = () => {
  const dispatch = useDispatch();
  const { 
    currentPage, 
    pageSize, 
    filters, 
    loading
  } = useSelector(state => state.songs);

  useEffect(() => {
    dispatch(fetchSongsRequest({ 
      page: currentPage, 
      pageSize, 
      filters 
    }));
  }, [dispatch, currentPage, pageSize, filters]);

  return (
    <Container>
      <SongHeader />
      <SongFilters />
      <ContentArea>
        <SongTable />
        <Pagination />
      </ContentArea>
      <SongModals />
    </Container>
  );
};

export default SongManager;