
import { useParams } from 'react-router-dom';
import { Container, EmptyMsgBox } from '../../styles/styles';
import { useAppSelector } from '../../hooks/redux';
import { Note } from '../../types/note';
import { MainWrapper } from '../../components';

const TagNotes = () => {
  const {name} = useParams() as {name : string};
  const {mainNotes} = useAppSelector((state) => state.notesList);

  let notes:Note[] = [];
  mainNotes.forEach((note) => {
    if (note.tags.find(({tag}) => tag === name )) {
      notes.push(note);
    }
  });

  return (
    <Container>
      {notes.length === 0 ? (
        <EmptyMsgBox>Note is not exist</EmptyMsgBox>
      ) : (
        <MainWrapper notes={notes} type={name} />
      )}
    </Container>
  )
}

export default TagNotes