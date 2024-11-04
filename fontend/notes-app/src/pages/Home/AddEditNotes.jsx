import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';
import UploadForm from '../../components/Input/UploadForm';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {

    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [document, setDocument] = useState(noteData?.document || "");

    const [error, setError] = useState(null);

    //  Add Note
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
                document,
            });

            if (response.data && response.data.note) {
                showToastMessage("อัพโหลดเอกสารสำเร็จ")
                getAllNotes()
                onClose()
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        };
    }


    // Edit Note
    const editNote = async () => {
        const noteId = noteData._id
        try {
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content,
                tags,
            });

            if (response.data && response.data.note) {
                showToastMessage("ลบเอกสารสำเร็จ")
                getAllNotes()
                onClose()
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        };
    };

    const handleAddNote = () => {
        if (!title) {
            setError("Plese enter the title")
            return;
        };

        if (!content) {
            setError("Plese enter the content")
            return;
        };

        setError("");

        if (type === 'edit') {
            editNote()
        } else {
            addNewNote()
        }
    };

    return (
        <div className='relative'>
            <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
                <MdClose className='text-xl text-slate-400' />
            </button>
            <div className='flex flex-col gap-2'>
                <label className='input-lable pridi'>ถึง</label>
                <input
                    type="text"
                    className='text-2xl pridi text-slate-950 outline-none'
                    placeholder='Email'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-lable pridi'>รายละเอียด</label>
                <textarea
                    type='text'
                    className='text-sm pridi text-slate-950 outline-none bg-slate-50 p-2 rounded'
                    placeholder='รายละเอียด'
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>
            <div className="flex justify-between">

                <div className='mt-3'>
                    <lable className="input-lable">TAGS</lable>
                    <TagInput tags={tags} setTags={setTags} />
                </div>

                <div className='mt-3'>
                    <lable className="input-lable">เอกสาร</lable>
                    <UploadForm document={document} setDocument={setDocument} />
                </div>
            </div>
            {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

            <button
                className='btn-primary font-medium mt-5 p-3'
                onClick={handleAddNote}
            >
                {type === 'edit' ? 'UPDATE' : 'ADD'}
            </button>
        </div>
    )
};

export default AddEditNotes