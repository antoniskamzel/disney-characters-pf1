import { createReducer, on, props } from "@ngrx/store";
import { DisneyStateInterface } from "./disneyStateInterface";
import * as DisneyActions from './disneyActions';


export const initialState: DisneyStateInterface = {
  all_characters: [],
  filtered_characters: [],
  is_downloading_data: true
};

export const reducers = createReducer(initialState,

  on(DisneyActions.initDisneyData, (state, props) => {
    return{
      ...state,
      all_characters: props.characters_array,
      filtered_characters: props.characters_array,
      is_downloading_data: props.is_downloading_data
    }
  }),

  on(DisneyActions.searchByText, (state, action) => {
      let filtered = {
        characters_array: []
      }
      filtered = state.all_characters.filter((x: any) => x.name.toUpperCase().includes(action.searchtxt.toUpperCase()) ||
        JSON.stringify(x.tvShows).toUpperCase().includes(action.searchtxt.toUpperCase()));
      return {
        ...state,
        filtered_characters: filtered
      }
    }
  )
)
