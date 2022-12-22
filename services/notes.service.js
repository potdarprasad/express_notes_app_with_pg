const pool = require('../config/db.config');

class NotesService {
    async createNewNote(req, res) {
        try {
            const { note } = req.body;
            const { userId } = req.session;
            await pool.query(`INSERT INTO notes (note, user_id) VALUES ($1, $2)`, [note, userId]);
            res.redirect('/notes');
        } catch (error) {
            res.render('error', { message: error.message, error });
        }
    }

    async getAllNotesForUser(req, res) {
        try {
            const notes = (await (await pool.query(`SELECT id, note FROM notes WHERE user_id = $1`, [req.session.userId]))).rows;
            res.render('notes/index', { notes })
        } catch (error) {
            res.render('error', { message: error.message, error });
        }
    }

    async getNoteById(req, res) {
        try {
            const notes = (await pool.query(`SELECT id, note FROM notes WHERE id = $1`, [req.params.id])).rows[0];
            res.render('notes/note', { id: notes.id, note: notes.note })
        } catch (error) {
            res.render('error', { message: error.message, error });
        }
    }

    async editNoteById(req, res) {
        try {
            const { note, id } = req.body;
            (await pool.query(`UPDATE notes SET note = $1 WHERE id = $2`, [note, id]));
            res.redirect('/notes');
        } catch (error) {
            res.render('error', { message: error.message, error });
        }
    }

    async deleteNoteById(req, res) {
        try {
            const { id } = req.params;
            (await pool.query(`DELETE FROM notes  WHERE id = $1`, [ id ]));
            res.redirect('/notes');
        } catch (error) {
            res.render('error', { message: error.message, error });
        }
    }
}

module.exports = new NotesService();