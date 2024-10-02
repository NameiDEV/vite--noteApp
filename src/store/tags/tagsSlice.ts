import { Tag } from './../../types/tag';
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { v4 } from 'uuid';



interface TagState {
    tagsList: Tag[];
}

const initialState : TagState = {
    tagsList: [
        { tag: "coding", id: v4() },
        { tag: "exercise", id: v4() },
        { tag: "quotes", id: v4() }
    ]
}

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
      addTags : (state, {payload}) => {
        if (state.tagsList.find(({tag}) => tag === payload.tag)) {
            toast.warning("Tag is already Exist");
        } else {
            state.tagsList.push(payload);
            toast.info("New Tag added");
        }
      },
      deleteTags : (state, {payload}) => {
        state.tagsList = state.tagsList.filter(({id})=> id !== payload );
        toast.info("Tag is deleted");
      },
    }
})


export const {
    addTags,
    deleteTags
} = tagsSlice.actions;

export default tagsSlice.reducer;