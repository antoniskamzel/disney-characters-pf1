import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "./AppStateInterface";
import { DisneyStateInterface } from "./disneyStateInterface";


export const selectFeature = (state: AppStateInterface) => state.disneyData;


export const selectFilteredData = createSelector(
    selectFeature,
    (state: DisneyStateInterface) => state.filtered_characters
);

export const selectIsDownloadingData = createSelector(
  selectFeature,
  (state: DisneyStateInterface) => state.is_downloading_data
);
