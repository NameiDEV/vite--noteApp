import React from 'react'

import { DeleteBox, FixedContainer } from '../Modal.styles';
import { Box, Container, TopBox } from './FilterModal.styles';
import { useAppDispatch } from '../../../hooks/redux';
import { toggleFiltersModal } from '../../../store/modal/modalSlice';
import { FaTimes } from 'react-icons/fa';

interface FiltersModalProps {
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  filter: string;
}

const FiltersModal = ({ handleFilter, handleClear, filter }: FiltersModalProps) => {

  const disapatch = useAppDispatch();

  return (
    <FixedContainer>
      <Container>
        <DeleteBox
          onClick={() => disapatch(toggleFiltersModal(false))}
          className='filters__close'
        >
          <FaTimes />
        </DeleteBox>

        <TopBox>
          <div className='filters__title'>정렬</div>
          <small onClick={handleClear} className='filters__delete'>
            CLEAR
          </small>
        </TopBox>

        <Box>
        <div className='filters__subtitle'>DATE</div>
          <div className='filters__check'>
            <input
              type="radio"
              name="filter"
              value="latest"
              id="new"
              checked={filter === "latest"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor='new'>Sort by Latest</label>
          </div>
          <div className='filters__check'>
            <input
              type="radio"
              name="filter"
              value="created"
              id="create"
              checked={filter === "created"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor='create'>Sort by Created</label>
          </div>
          <div className='filters__check'>
            <input
              type="radio"
              name="filter"
              value="edited"
              id="edit"
              checked={filter === "edited"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor='edit'>Sort by Edited</label>
          </div>
        </Box>
      </Container>
    </FixedContainer>
  )
}

export default FiltersModal