import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { axios } from '../../../service/api';

export interface NotesModel {
	_id: string;
	_title: string;
	_description: string;
	_createdAt: string;
	_userId: string;
}

export interface CreateNote {
	title: string;
	description: string;
	token: string;
}

export interface UpdateNote {
	id: string;
	title?: string;
	description?: string;
	token: string;
}

export interface NoteReturn {
	message: string;
	success: boolean;
	note: NotesModel;
}

export interface UpdateNoteReturn {
	message: string;
	success: boolean;
	updatedData: NotesModel;
}

export interface DeletedNoteReturn {
	message: string;
	success: boolean;
	deletedNote: NotesModel;
}

export interface NotesListReturn {
	message: string;
	success: boolean;
	notes: NotesModel[];
}

const notesAdapter = createEntityAdapter<NotesModel>({
	selectId: (state) => state._id,
});

export const createNotesAsyncThunk = createAsyncThunk('notes/create', async (data: CreateNote) => {
	const response = await axios.post('/notes', data, {
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	});

	return response.data as NoteReturn;
});

export const getNotesAsyncThunk = createAsyncThunk('notes/list', async (token: string) => {
	const response = await axios.get('/notes', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response.data as NotesListReturn;
});

export const updateNotesAsyncThunk = createAsyncThunk(
	'user/updateNotes',
	async (data: UpdateNote) => {
		const response = await axios.put(`/notes/${data.id}`, data, {
			headers: {
				Authorization: `Bearer ${data.token}`,
			},
		});

		return response.data as UpdateNoteReturn;
	},
);
export const deleteNotesAsyncThunk = createAsyncThunk(
	'notes/delete',
	async ({ _id, token }: { _id: string; token: string }) => {
		const response = await axios.delete(`/notes/${_id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data as DeletedNoteReturn;
	},
);

export const { selectAll: listAllNotes } = notesAdapter.getSelectors(
	(state: RootState) => state.notes,
);
const notesSlice = createSlice({
	initialState: notesAdapter.getInitialState(),
	name: 'notes',
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.addOne(state, action.payload.note);
			}
		});
		builder.addCase(getNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.setAll(state, action.payload.notes);
			}
		});
		builder.addCase(updateNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.updateOne(state, {
					id: action.payload.updatedData._id,
					changes: action.payload.updatedData,
				});
			}
		});
		builder.addCase(deleteNotesAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				notesAdapter.removeOne(state, action.payload.deletedNote._id);
			}
		});
	},
});

export default notesSlice.reducer;
