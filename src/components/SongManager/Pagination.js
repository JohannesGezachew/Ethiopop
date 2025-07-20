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
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: ${props => props.theme.space[4]}px;
    margin-top: ${props => props.theme.space[6]}px;
    border-radius: ${props => props.theme.radii.lg};
    gap: ${props => props.theme.space[3]}px;
  }
`;

const PaginationInfo = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
  font-weight: ${props => props.theme.fontWeights.medium};
  flex: 1;
  
  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    text-align: center;
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.space[4]}px;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: ${props => props.theme.space[3]}px;
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
  padding: ${props => props.theme.space[3]}px ${props => props.theme.space[4]}px;
  padding-right: ${props => props.theme.space[8]}px;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.radii.lg};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  background-color: ${props => props.theme.colors.white};
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right ${props => props.theme.space[3]}px center;
  background-repeat: no-repeat;
  background-size: 16px;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  appearance: none;
  min-width: 80px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]}, 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
  }
  
  &:hover:not(:focus) {
    border-color: ${props => props.theme.colors.gray[400]};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
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

const NavButton = styled(Button)`
  height: 40px;
  padding: 0 ${props => props.theme.space[4]}px;
  border-radius: ${props => props.theme.radii.lg};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  min-width: auto;
  white-space: nowrap;
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
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
            <NavButton
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </NavButton>
            
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
            
            <NavButton
              variant="secondary"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </NavButton>
          </PageNumbers>
        )}
      </PaginationControls>
    </PaginationContainer>
  );
};

export default Pagination;