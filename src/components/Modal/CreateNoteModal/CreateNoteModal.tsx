
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleCreateNoteModal, toggleTagsModal } from '../../../store/modal/modalSlice';
import { setEditNote, setMainNotes } from '../../../store/notesList/notesListSlice';
import { ButtonFill, ButtonOutline } from '../../../styles/styles';

import { DeleteBox, FixedContainer } from '../Modal.styles';
import { AddedTagsBox, Box, OptionsBox, StyledInput, TopBox } from './CreateNoteModal.styles';
import { useState } from 'react';
import TagsModal from '../TagsModal/TagsModal';
import { v4 } from 'uuid';
import TextEditor from '../../TextEditor/TextEditor';
import { toast } from 'react-toastify';
import dayjs, { Dayjs } from 'dayjs';
import { Note } from '../../../types/note';

const CreateNoteModal = () => {

  const dispatch = useAppDispatch();
  const {editNote} = useAppSelector( (state) => state.notesList );

  const [noteTitle, setNoteTitle] = useState(editNote?.title || "");
  const [noteColor, setNoteColor] = useState(editNote?.color || "");
  const [priority, setPriority] = useState(editNote?.priority || "low");

  const [addedTags, setAddedTags] = useState(editNote?. tags || []);
  const [value, setValue] = useState(editNote?.content || "");
  
  const closeCreateNoteModal = () => {
    dispatch(toggleCreateNoteModal(false));
    dispatch(setEditNote(null));
  }

  const {viewAddTagsModal} = useAppSelector((state) => state.modal);

  const tagsHandler = (tag: string, type: string) => {
    const newTag = tag.toLowerCase();

    if(type === "add") {
      setAddedTags((prev) => [...prev, {tag : newTag, id : v4()}]);
    } else {
      setAddedTags(addedTags.filter(({tag}) => tag !== newTag))
    }
  }
//////  
  const createNoteHandler = () => {
    if (!noteTitle) {
      toast.error("Must enter a title");
      return;
    } else if (value === "<p><br><br>") {
      toast.error("Must write note");
      return;
    }

    const date = dayjs().format("DD/MM/YY h:mm A");

    let note : Partial<Note> = {
      title : noteTitle,
      content : value,
      tags : addedTags,
      color : noteColor,
      priority,
      editedTime : new Date().getTime(),
    };

    if (editNote) {
      note = {...editNote, ...note};
    } else {
      note = {
        ...note,
        date,
        createdTime : new Date().getTime(),
        editedTime : null,
        isPinned : false,
        isRead : false,
        id : v4()
      }
    }

    dispatch(setMainNotes(note));
    dispatch(toggleCreateNoteModal(false));
    dispatch(setEditNote(null));
  };

  return (
    <FixedContainer>

      {viewAddTagsModal && (
        <TagsModal type='add' addedTags={addedTags} handleTags={tagsHandler} />
      )}

      <Box>
        <TopBox>
          <div className='createNote__title'>Create Note</div>

        <DeleteBox className='createNote__close-btn' onClick={closeCreateNoteModal}>
          <FaTimes/>
        </DeleteBox>
        </TopBox>

        <StyledInput
          type="text"
          value={noteTitle}
          name='title'
          placeholder='Title...'
          onChange={(e) => setNoteTitle(e.target.value)}
        />

        <div>
          <TextEditor value={value} setValue={setValue} color={noteColor}/>
        </div>


          <div className='createNote__create-btn'>
            <ButtonFill onClick={createNoteHandler}>
              {editNote ? (
                <span>Save</span>
              ) : (
                <>
                  <FaPlus /> <span>Create</span>
                </>
              )}
            </ButtonFill>
          </div>
       
          
        <AddedTagsBox>
          {addedTags.map(({tag, id}) => (
            <div key={id}>
              <span className='createNote__tag' >{tag}</span>
              <span className='createNote__tag-remove'
                    onClick={() => tagsHandler(tag, "remove") }
              > <FaTimes /></span>
            </div>
          ))
          }
        </AddedTagsBox>

        <OptionsBox>
          <ButtonOutline
            onClick={() => dispatch(toggleTagsModal({type : "add", view : true}))}
          >
            Add Tag
          </ButtonOutline>

          <div>
            <label htmlFor='color'>배경색 : </label>
            <select
              value={noteColor}
              id="color"
              onChange={(e) => setNoteColor(e.target.value)}
            >
              <option value="">White</option>
              <option value="#ffcccc">Red</option>
              <option value="#ccffcc">Green</option>
              <option value="#cce0ff">Blue</option>
              <option value="ffffcc">Yellow</option>
       
            </select>
          </div>

          <div>
            <label htmlFor='priority'>우선순위 : </label>
            <select
              value={priority}
              id='priority'
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low" >Low</option>
              <option value="high" >High</option>
            </select>
          </div>
        </OptionsBox>
      </Box>
    </FixedContainer>
  )
}

export default CreateNoteModal