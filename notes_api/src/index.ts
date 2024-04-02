import express, {urlencoded, json} from 'express';
import cors from 'cors';
import notesRouter from './routes'

const PORT = 3001;

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json()); 

app.use('/notes', notesRouter)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
