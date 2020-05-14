const Note = require('../models/Note');
const notesCtrl = {};

notesCtrl.renderNoteForm = (req, res)=>{
    res.render('notes/new_note');
};

notesCtrl.createNewNote = async (req, res)=>{
    
    const {title, description} = req.body;
    const newNote = new Note({
        title,
        description
    });
    newNote.user= req.user._id;
    await newNote.save();
    req.flash('success_msg','Note added successfully');

    res.redirect('/notes');
};


notesCtrl.renderNotes = async (req, res)=>{
    
    const notes = await Note.find({user:req.user._id}).sort({createdAt:'desc'}).lean();
    res.render('notes/all_notes', {notes});
};

notesCtrl.renderEditForm = async (req, res)=>{
    const note = await Note.findById(req.params.id).lean();
    if(note.user != req.user._id){
        req.flash('error_msg', 'Not authorized');
        return res.redirect('/notes')
    }
    res.render('notes/edit-note', {note});
};


notesCtrl.updateNote = async (req, res)=>{
    const id = req.params.id;
    const {title, description} =req.body;
    await Note.findByIdAndUpdate(id, {title, description});
    req.flash('success_msg','Note updated successfully');
    res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res)=>{
    const id = req.params.id;
    await Note.findByIdAndDelete(id);
    req.flash('success_msg','Note deleted successfully');
    res.redirect('/notes');
};


module.exports = notesCtrl;