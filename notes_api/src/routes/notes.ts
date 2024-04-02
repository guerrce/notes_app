import express from 'express';
import prisma from '../client';
import { validateNote } from '../helpers/validateNote';

const router = express.Router();

const selectNoteWithoutDelete = {
  id: true,
  title: true,
  body: true,
};

router.get('/', async (req, res) => {
  const { search }: { search?: string } = req.query;
  const searchQuery = search || "";
  const filteredPosts = await prisma.note.findMany({
    where: {
      deleted: false,
      OR: [
        {
          title: {
            contains: searchQuery,
          },
        },
        {
          body: {
            contains: searchQuery,
          },
        },
      ],
    },
    select: selectNoteWithoutDelete,
  })
  res.json(filteredPosts)
});

router.post('/', async (req, res) => {
  const { title, body } = req.body;

  if (!validateNote(body)){
    res.status(400).json({message: 'Invalid note body.'});
  } else{
    const newNote = await prisma.note.create({
      data: { title, body },
      select: selectNoteWithoutDelete,
    });
    res.json(newNote);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const idNum = parseInt(id);
  if (typeof idNum !== 'number'){
    res.status(400).json({message: 'id is not a number.'})
  } else if (!validateNote(body)){
    res.status(400).json({message: 'Invalid note body.'});
  } else {
    try {
      const editedNote = await prisma.note.update({
        where: {id: idNum},
        data: { title, body },
        select: selectNoteWithoutDelete,
      });
    
      res.json(editedNote);
    } catch(error) {
      next(error)
    }
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const idNum = parseInt(id);
  if (!id){
    res.status(400).send("No id.")
  }
  else if (typeof idNum !== 'number'){
    res.status(400).send('id is not a number.')
  } else {
    try {
      await prisma.note.update({
        where: {id: idNum},
        data: {deleted: true},
      });

      res.send(`Deleted note with id: ${id}`)
    } catch(error){
      next(error)
    }
  }
});

export default router;
