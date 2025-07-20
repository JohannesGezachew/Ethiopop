import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { setCurrentPage, setPageSize } from '@store/slices/songsSlice';
import Button from '../UI/Button';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.space[4]}px;
  flex-wrap: wrap;
  margin-top: ${props => props.theme.space[8]}px;
  padding: ${props => props.theme.space[6]}px;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.radii.xl};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
`;

const PaginationInfo = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
  font-weight: ${props => props.theme.fontWeights.medium};
  flex: 1;
  
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    margin-bottom: ${props => props.theme.space[4]}px;
    flex: none;
    width: 100%;
  }
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[4]}px;
  
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const PageSizeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[2]}px;
`;

const PageSizeLabel = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const PageSizeSelector = styled.select`
  padding: ${props => props.theme.space[2]}px ${props => props.theme.space[3]}px;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.radii.lg};
  font-size: ${props => props.theme.fontSizes.sm};
  background-color: ${props => props.theme.colors.white};
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]}, 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.gray[400]};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
`;

const PageNumbers = styled.div`
  display: flex;
  gap: ${props => props.theme.space[1]}px;
`;

const PageButton = styled(Button)`
  min-width: 40px;
  height: 40px;
  padding: 0;
  border-radius: ${props => props.theme.radii.lg};
`;

const Pagination = () => {
  const dispatch = useDispatch();
  const { 
    currentPage, 
    totalPages, 
    totalSongs, 
    pageSize
  } = useSelector(state => state.songs);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  const handlePageSizeChange = (e) => {
    dispatch(setPageSize(parseInt(e.target.value)));
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalSongs === 0) {
    return null;
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalSongs);
  const visiblePages = getVisiblePages();

  return (
    <PaginationContainer>
      <PaginationInfo>
        Showing {startItem} to {endItem} of {totalSongs} songs
      </PaginationInfo>
      
      <PaginationControls>
        <PageSizeContainer>
          <PageSizeLabel>Show:</PageSizeLabel>
          <PageSizeSelector
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </PageSizeSelector>
        </PageSizeContainer>
        
        {totalPages > 1 && (
          <PageNumbers>
            <PageButton
              variant="secondary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </PageButton>
            
            {visiblePages.map((page, index) => (
              <PageButton
                key={index}
                variant={page === currentPage ? 'primary' : 'secondary'}
                size="sm"
                disabled={page === '...'}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
              >
                {page}
              </PageButton>
            ))}
            
            <PageButton
              variant="secondary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </PageButton>
          </PageNumbers>
        )}
      </PaginationControls>
    </PaginationContainer>
  );
};

export default Pagination;