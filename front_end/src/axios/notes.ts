import { NOTES_ENDPOINT } from "../constants";
import axios from "./axios";
import { DeleteNoteResponse, EditNoteResponse, GetNotesResponse, MakeNewNoteResponse } from "./types";

export const searchNotes = async ({
  searchQuery
}: {
  searchQuery: string,
}): Promise<GetNotesResponse> => {
  try {
    const response = await axios.get(`/${NOTES_ENDPOINT}`, {
      params: {
        search: searchQuery
      }
    });
    if (response.status !== 200){
      throw new Error('error searching notes');
    }
    return response.data;
  } catch (error: any){
    throw new Error(error.message);
  }
};

export  const makeNewNote = async ({
  title,
  body
}: {
  title: string,
  body: string,
}): Promise<MakeNewNoteResponse> => {
  try {
    const response = await axios.post(`/${NOTES_ENDPOINT}`, {
      title,
      body,
    });
    if (response.status !== 200){
      throw new Error('error making new note');
    }
    return response.data;
  } catch (error: any){
    throw new Error(error.message);
  }
};

export const editNote = async ({
  noteId,
  title,
  body
}: {
  noteId: number,
  title: string,
  body: string,
}): Promise<EditNoteResponse> => {
  try {
    const response = await axios.put(`/${NOTES_ENDPOINT}/${noteId}`, {
      title,
      body,
    });
    if (response.status !== 200){
      throw new Error(`error editing note: ${noteId}`);
    }
    return response.data;
  } catch (error: any){
    throw new Error(error.message);
  }
};

export const deleteNote = async ({
  noteId,
}: {
  noteId: number,
}): Promise<DeleteNoteResponse> => {
  try {
    const response = await axios.delete(`/${NOTES_ENDPOINT}/${noteId}`);
    if (response.status !== 200){
      throw new Error(`error deleting note: ${noteId}`);
    }
    return response.data;
  } catch (error: any){
    throw new Error(error.message);
  }
};
