import { createAction, props } from "@ngrx/store";

export const initDisneyData = createAction(
  '[Disney] Init disney data',
  props<{characters_array: any, is_downloading_data: boolean}>()
);


export const searchByText = createAction(
  '[Disney] Search disney data',
  props<{searchtxt: string}>()
);
