import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/ContextProvider';

const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [showError, setShowError] = useState(false);

    useEffect(()=> {
        if(currentNote){
            setFormData({
                title: currentNote.title,
                description: currentNote.description
            })
        }
        
    }, [currentNote])

    const { user } = UserAuth();
    

    function handleChange (e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

 
      const handleSubmit = async (event) => {
    event.preventDefault();
    if(currentNote) {
        editNote(currentNote._id, formData.title, formData.description)
    } else {
        addNote(formData.title, formData.description);
    }
    if (!user) {
      setShowError(true);
      return;
    }
    
    
  };

  return (
    <div className="fixed inset-0 bg-gray-800/75 flex justify-center items-center">
        <div className='bg-white p-8 rounded-lg'>
           {showError && (
          <p className="text-red-500 mb-4 text-sm">Please login first to add notes</p>
        )}
            <h2 className='text-xl font-bold mb-4'>{currentNote ? "Edit Note" : "Add New Note"}</h2>
             
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={formData.title}
                    name="title"
                    onChange={handleChange}
                    placeholder='Note Title'
                    className='w-full p-2 mb-4 border rounded outline-none'
                />
                <textarea
                    type="text"
                    value={formData.description}
                    name="description"
                    onChange={handleChange}
                    placeholder='Note Description'
                    className='w-full p-2 mb-4 border rounded outline-none'
                />
                <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                   {currentNote ? "Update Note" :
                   "Add Note"}
                </button>
            </form>
            <button onClick={closeModal} className='mt-4 text-red-500 '>Cancel</button>
        </div>
    </div>
  )
}

export default NoteModal