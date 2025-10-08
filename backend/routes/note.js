import express from "express";
import Note from '../models/Note.js';
import {protect} from '../middleware/auth.js';
const router = express.Router();

// Add Note
router.post("/add",protect ,async (req, res) => {
        try {
            const { title, description } = req.body;

            const newNote = new Note({
                title,
                description,
                userId: req.user._id, 
            });

            await newNote.save();

            return res.status(201).json({ message: "Note added successfully", note: newNote });
            
            
        } catch (error) {
            console.log("Error adding note:", error);
            return res.status(500).json({ message: "Error in adding note" });
            
        }
});

    router.get('/', protect, async (req, res) =>{
        try {
            const notes = await Note.find({userId: req.user.id});
            return res.status(200).json({success:true, notes})
        } catch (error) {
            return res.status(500).json({success:false, message:'cant retrive notes'})
        }
    })

    router.put("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    note.title = title || note.title;
    note.description = description || note.description;
    await note.save();

    res.status(200).json({ message: "Note updated successfully", note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const{id} = req.params;
    const updateNote = await Note.findByIdAndDelete(id)
    return res.status(200).json({success:true, updateNote})
  } catch(error) {
    return res.status(500).json({success:false, message: "cant delete note"})

  }
})




export default router;
