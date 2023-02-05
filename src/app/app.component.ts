import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { lastValueFrom, Observable } from 'rxjs';
import { AppStateInterface } from './disneyState/AppStateInterface';
import * as DisneyActions from './disneyState/disneyActions';
import { selectFilteredData, selectIsDownloadingData } from './disneyState/disneySelectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  downloadedData: any;

  isDownloadingData$!: Observable<any>;

  dataToShow$: Observable<any> | undefined;

  searchTxt: any;

  showModal: any;
  detailsForModal: any;

  constructor(
    private store: Store<AppStateInterface>,
    private http: HttpClient
  ){

  }

  async ngOnInit() {

    this.isDownloadingData$ = this.store.pipe(select(selectIsDownloadingData));

    this.downloadedData = [];
    let i=1;

    //download the first i pages of disney characters data
    while(i<6){
      try{
        let down: any;
        down = await lastValueFrom(this.http.get(`https://api.disneyapi.dev/characters?page=${i}`));
        if(down.data.length === 0){
          break;
        }
        this.downloadedData.push.apply(this.downloadedData, down.data);
        i++;
      }
      catch(err){
        break;
      }
    }



    if(this.downloadedData.length === 0){
      alert('The API call did not succeed (Probably a Network Error of the API). Try again later!');
    }

    //State management get initiliazed and then the search logic uses the apps state to update the search results accordingly
    this.store.dispatch(DisneyActions.initDisneyData({characters_array: this.downloadedData, is_downloading_data: false}));
    this.dataToShow$ = this.store.pipe(select(selectFilteredData));

  }

  triggerSearch(){
    this.store.dispatch(DisneyActions.searchByText({searchtxt: this.searchTxt}));
    this.dataToShow$ = this.store.pipe(select(selectFilteredData));
  }

  showModalFunction(ev: any){
    this.detailsForModal = ev;
    this.showModal = true;
  }

  closeModalFunction(){
    this.showModal = false;
  }
}
