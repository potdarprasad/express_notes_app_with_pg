const router = require('express').Router();
const isLoggedIn = require('../middlewares/isUserLoggedIn');
const notesService = require('../services/notes.service');

router.get('/', isLoggedIn, notesService.getAllNotesForUser);

router.route('/create').get(isLoggedIn, (req, res) => {
    res.render('notes/note', { id: null, note: null });
}).post(isLoggedIn, notesService.createNewNote);

router.get('/edit/:id', isLoggedIn, notesService.getNoteById);
router.post('/edit', isLoggedIn, notesService.editNoteById);

router.get('/delete/:id', isLoggedIn, notesService.deleteNoteById);
module.exports = router;