import React, {useState} from 'react'
import './styles.css'
import { notes } from './notes';
import Blocks from './Blocks';

const App = () => {
  const [notesList, setNotesList] = useState(notes); 
  const [content, setContent] = useState(""); 
  const [title, setTitle] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const handleAddNote = (e) => {
    e.preventDefault();
    console.log("title: ", title);
    console.log("content: ", content);
  
    const newNote = {
      id: notesList.length + 1,
      title: title,
      content: content,
    };
  
    setNotesList([newNote, ...notesList]);
    setTitle("");
    setContent("");
  };
  
  const handleSelectedNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };
  

  const handleUpdateNote = (e) => {
    e.preventDefault();

    if (!selectedNote){
      return;
    }

    const updatedNote = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNotesList = notesList.map((note) => (note.id === selectedNote.id ? updatedNote : note));
    setNotesList(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);

  }

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (e, noteId) => {
    e.stopPropagation();
  
    const updatedNotes = notesList.filter((note) => note.id !== noteId);
  
    setNotesList(updatedNotes);
  };
  
  return (
    <>
    <div className='app-container m-[20px] bg-purple-50'>
      <form 
      className='note-form flex flex-col gap-4'
      onSubmit= {(e) => (selectedNote ? handleUpdateNote(e) : handleAddNote (e))}
      >
        <input 
        name='title'  
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
        required 
        />
        <textarea 
        name='notes'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content" 
        rows={10} 
        required 
        />

        {selectedNote ? (
        <div className='edit-buttons'>
          <button type="submit">Save</button>
          <button onClick={handleCancel}>Cancel</button>
          </div> )
          : (
            <button className=" bg-purple-400 rounded-md border-none p-[10px] text-base text-white hover:cursor-pointer hover:bg-purple-300" 
            type="submit">Add Note</button>
          )} 
      </form>


      <div className='notes-grid'>
        {notesList.map((note) =>(
        <div 
        key={note.id}
        className='notes-item flex flex-col cursor-pointer border border-solid border-gray-300 p-[10px] rounded-md'
        onClick={() => handleSelectedNote(note)}
        >

        <div className="notes-header flex justify-end ">
            <button 
            className='max-w-fit-content font-sm bg-transparent border-none cursor-pointer '
            onClick={(e) => deleteNote(e, note.id)}
            >x</button>
        </div>

          <h2 className='m-0 font-bold'>{note.title}</h2>
          <p>{note.content}</p>
        </div>
        ))}
      </div>


    </div>
    <div>      <div className='mt-5'>
    <Blocks />
</div>
</div>
</>
  )
}

export default App