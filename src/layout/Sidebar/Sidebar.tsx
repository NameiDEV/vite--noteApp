import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Container, MainBox, StyledLogo, ItemsBox } from './Sidebar.styles';
import { FaArchive, FaLightbulb, FaTag, FaTrash } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import getStandardName from '../../utils/getStandardName';
import { v4 } from 'uuid';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleMenu } from '../../store/menu/menuSlice';
import { toggleTagsModal } from '../../store/modal/modalSlice';

const items = [
  {icon : <FaArchive />, title: "Archive", id: v4()},
  {icon : <FaTrash />, title: "Trash", id: v4()}
];

const Sidebar = () => {
  
  const dispatch = useAppDispatch();
  const location = useLocation();
  const {pathname} = location;
  const { isOpen } = useAppSelector((state) => state.menu);
  const {tagsList} = useAppSelector((state) => state.tags);


  if (pathname === "/404") {
    return null;
  }

  return (
    <Container openMenu={isOpen ? "open" : ""}>
      <MainBox openMenu={isOpen ? "open" : ""}>
       <StyledLogo>
        <h1>Keep</h1>
       </StyledLogo>

       <ItemsBox>

       <li onClick={() => dispatch(toggleMenu(false))}>
            <NavLink
              to={"/"}
              state={"notes"}
              className={({ isActive }) => isActive ? "active-item" : "inactive-item"}
            >
            <span>
              <FaLightbulb />
            </span>
            <span>Notes</span>
            </NavLink>
          </li>

        {tagsList?.map(({tag, id}) => (

          <li key={id} onClick={() => dispatch(toggleMenu(false))}>
            <NavLink
              to={`/tag/${tag}`}
              state={`${tag}`}
              className={({ isActive }) => isActive ? "active-item" : "inactive-item"}
            >
            <span>
              <FaTag />
            </span>
            <span>{getStandardName(tag)}</span>
            </NavLink>
          </li>
        ))}

        <li
          className='sidebar__edit-item'
          onClick={() => dispatch(toggleTagsModal({type : "edit" , view : true }))}
        >
          <span><MdEdit/></span>
          <span>Edit Notes</span>
        </li>

        {items.map(({icon, title, id}) => (

          <li key={id} onClick={() => dispatch(toggleMenu(false))}  >
            <NavLink
              to={`/${title.toLowerCase()}`}
              state={`${title}`}
              className={({ isActive }) => isActive ? "active-item" : "inactive-item"}
            >
            <span>{icon}</span>
            <span>
              {title}
            </span>
            </NavLink>
          </li>
          ))}
        

       </ItemsBox>

      </MainBox>
    </Container>
  )
}

export default Sidebar

