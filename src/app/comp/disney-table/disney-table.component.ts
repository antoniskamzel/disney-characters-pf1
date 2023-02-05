import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-disney-table',
  templateUrl: './disney-table.component.html',
  styleUrls: ['./disney-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisneyTableComponent implements OnInit {

  @Input() disneyData: any;

  @Output() showDetailsTrigger = new EventEmitter<any>();

  currentPage: any;
  itemsPerPageInput: any;

  sortKey!: boolean;

  dataToShow: any;

  constructor(
  ){ }

  ngOnInit(){
    this.sortKey = false;
    this.currentPage = 1;
    this.itemsPerPageInput = 50;

    //init sort ascending
    this.sort();
  }


  setPageNumber(num: any, ev: any){
    $('.set-page-number').removeClass('active');
    this.itemsPerPageInput = num;
    ev.target.classList.add('active');
  }

  sort(){

    let temp = [...this.disneyData];

    this.disneyData = temp.sort((a:any ,b: any) => {
      if(!this.sortKey){
        if(a.name > b.name){
          return 1;
        }
        else{
          return -1;
        }
      }
      else{
        if(a.name < b.name){
          return 1;
        }
        else{
          return -1;
        }
      }
    });
    this.sortKey = !this.sortKey;

  }

  showDetails(item: any){
    this.showDetailsTrigger.emit(item);
  }




}
