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
  const filteredPosts = await prisma.note.findMany({
    where: {
      deleted: false,
      OR: [
        {
          title: {
            contains: search,
          },
        },
        {
          body: {
            contains: search,
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
    res.status(400).send('Invalid note body.');
  }

  const newNote = await prisma.note.create({
    data: { title, body },
    select: selectNoteWithoutDelete,
  });
  res.json(newNote);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const idNum = parseInt(id);
  if (typeof idNum !== 'number'){
    res.status(400).send('id is not a number ')
  }
  if (!validateNote(body)){
    res.status(400).send('Invalid note body.');
  }

  const editedNote = await prisma.note.update({
    where: {id: idNum},
    data: { title, body },
    select: selectNoteWithoutDelete,
  });

  res.json(editedNote);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const idNum = parseInt(id);
  if (typeof idNum !== 'number'){
    res.status(400).send('id is not a number ')
  }

  await prisma.note.update({
    where: {id: idNum},
    data: {deleted: true},
  });

  res.send(`Deleted note with id: ${id}`)

});

export default router;
