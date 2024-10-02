import React from 'react'
import { FiMenu } from "react-icons/fi";
import { Container, StyledNav } from './Navbar.styles'
import { ButtonFill } from '../../styles/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import getStandardName from '../../utils/getStandardName';
import { toggleMenu } from '../../store/menu/menuSlice';
import { toggleCreateNoteModal } from '../../store/modal/modalSlice';
import { useLocation } from 'react-router-dom';


const Navbar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const {pathname, state} = location;

  if (pathname === "/404") {
    return null;
  }

  return (
    <StyledNav>
      <div className='nav__menu'>
        <FiMenu onClick={() => dispatch(toggleMenu(true))} />
      </div>

      <Container>
        <div className='nav__page-title'>
          {getStandardName(state)}
          {state !=="Trash" && state !== "Archive" && (
            <ButtonFill
              onClick={()=> dispatch(toggleCreateNoteModal(true))}        
              className='nav__btn'    
            >
              <span>+</span>
            </ButtonFill>
          )}
        </div>
      </Container>
    </StyledNav>
  )
}

export default Navbar