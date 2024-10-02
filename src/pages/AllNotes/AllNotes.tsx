import React, { useState } from 'react'

import { ButtonOutline, Container, EmptyMsgBox } from '../../styles/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Box, InputBox, TopBox } from './AllNotes.styles';
import { toggleFiltersModal } from '../../store/modal/modalSlice';
import getAllNotes from '../../utils/getAllNotes';
import { FiltersModal } from '../../components';


const AllNotes = () => {
  const dispatch = useAppDispatch();
  const {mainNotes} = useAppSelector((state) => state.notesList);
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("");
  const { viewFiltersModal } = useAppSelector((state) => state.modal);

  const filterhandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }
  const clearhandler = () => {
    setFilter("");
  }


  return (
    <Container>

      {viewFiltersModal && (
        <FiltersModal 
          handleFilter={filterhandler}
          handleClear={clearhandler}
          filter={filter}
        />
      )}
      {mainNotes.length === 0 ? (
        <EmptyMsgBox>
          Note is not Exist
        </EmptyMsgBox>
      ) : (
        <>
          <TopBox>
            <InputBox>
              <input 
                type="text"
                value={searchInput}
                onChange={(e) =>setSearchInput(e.target.value) }
                placeholder='please enter search letters'
                autoComplete='off'
                id="id"
              />
            </InputBox>

            <div className='notes__filter-btn'>
              <ButtonOutline
                className='nav__btn'
                onClick={() => dispatch(toggleFiltersModal(true))}
              >
                <span>정렬</span>
              </ButtonOutline>
            </div>
          </TopBox>

          <Box>
            {getAllNotes(mainNotes, filter)}
          </Box>
        </>
      )}
    </Container>
  )
}

export default AllNotes