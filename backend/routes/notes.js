const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE: 1
//Get Loggedin allNotes using GET  "api/notes/fetchallnotes" . LOGIN NEEDED
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    //catch
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

//ROUTE: 2
//Adding new note using POST "api/notes/addnew". LOGIN NEEDED
router.post(
  "/addnew",
  fetchUser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Enter a Valid Description").isLength({ min: 10 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
        
      });
      const savedNote = await note.save();
      return res.json({ note: savedNote });
    } catch (error) {
      //catch
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);


//ROUTE: 3
//Updating existing note using POST "api/notes/updatenote". LOGIN NEEDED
router.put('/updatenote/:id', fetchUser, async (req,res)=>{
    try {
        const { title, description, tag } = req.body;
        const newnote={};
        if(title){
            newnote.title=title;
        }
        if(description){
            newnote.description=description;
        }
        if(tag){
            newnote.tag=tag;
        }

        let note= await Notes.findById(req.params.id)
        if(!note)
        return req.status(404).send("Not Found");
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Unauthorized")
        }
        note =await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
        return res.json(note);
    } catch (error) {
        //catch
        console.error(error.message);
        res.status(500).send("Some Error Occured");
      }
})

router.delete('/deletenote/:id',fetchUser, async(req, res)=>{

    try {
        let note= await Notes.findById(req.params.id);
    if(!note)
    return  req.status(404).send("Not Found");
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Unauthorized")
    }
    note =await Notes.findByIdAndDelete(req.params.id)
    return res.json(note);
} catch (error) {
    //catch
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
})
module.exports = router;
