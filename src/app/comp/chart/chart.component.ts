import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import Highcharts = require('highcharts');
import * as $ from 'jquery';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit{

  @Input() disneyData: any;

  hch: any;
  piechart: any;

  mouseListener: any;


  charactersNameArray: any;
  numberOfMoviesPerCharacter: any;

  chartDataFormatted: any;
  series: any;

  detailsCard: any;


  constructor( private ref: ChangeDetectorRef){
    //listening for internal changes to update the view, cause of onPush
    setInterval(() => { this.ref.detectChanges(); }, 100);

    this.detailsCard = {
      name: '',
      percentage: 0,
      listOfFilms: []
    }
  }

  ngOnInit(){

    $(document).ready(()=>{
      //if click outside chart, close details window
      $('html').on('click', (e)=>{
        if(!$(e.target).hasClass('highcharts-point')){
          $('#details-chart').attr('is-active', 'false');
          $('#details-chart').attr('is-clicked', 'false');
        }
      });

      //if mouse gets out of chart container, close details window
      $('html').on('mouseover', ev => {
        if($(ev.target).hasClass('main-container')){
          $('#details-chart').attr('is-active', 'false');
          $('#details-chart').attr('is-clicked', 'false');
        }
      })
    })

    this.chartDataFormatted = [];

    this.hch = Highcharts;

    this.disneyData.forEach((element: any) => {
      //only show characters that have 1 or more films. Characters with 0 films wont show on the chart
      if(element.films.length > 0 ){
        let obj = {
          name: element.name,
          y: element.films.length,
          listOfFilms: element.films
        }
        this.chartDataFormatted.push(obj);
      }
    });


    this.piechart = {
      series: [
        {
          data: this.chartDataFormatted
        }
      ],
      chart: {
        type: 'pie',
        backgroundColor: 'transparent'
      },
      title: {
        style: {
          display: 'none'
        }
      },
      labels:{
        text: '# films'
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              mouseOver: (event: any)=>{
                this.createMouseListener('true');
                this.showDetails(event);
              },
              mouseOut: (event: any)=>{
                this.createMouseListener('false');
              },
              click: (event: any) => {
                this.detailsCardClicked(event);
              }
            }
          },
          states: {
            inactive: {
              opacity: 0.33
            }
          }
        }
      }
    }
  }

  ngOnChanges(){
    this.ngOnInit();
  }

  createMouseListener(e: any){
    const el = document.getElementById('details-chart')!;
    el?.setAttribute('is-active', e);
    //details window follow mouse movement
    if(e==='true'){
      $('.highcharts-series-group').on('mousemove', (ev)=>{
        el.style.top = `${(ev.clientY + window.scrollY) - el.offsetHeight - 15}px`;
        el.style.left = `${(ev.clientX + window.scrollX) - (el.offsetWidth/2)}px`;
      });

      $('.highcharts-label').on('mousemove', (ev)=>{
        el.style.top = `${(ev.clientY + window.scrollY) - el.offsetHeight - 15}px`;
        el.style.left = `${(ev.clientX + window.scrollX) - (el.offsetWidth/2)}px`;
      });
    }
    else{
      $('.highcharts-series-group').off('mousemove');
      $('.highcharts-label').off('mousemove');
    }

  }

  detailsCardClicked(ev: any){
    //if pie slice clicked, details window stop moving with mouse and gets fixed positioned so mouse can hover over
    const el = document.getElementById('details-chart')!;
    el.style.top = `${(ev.clientY + window.scrollY) - el.offsetHeight - 2}px`;
    el.style.left = `${(ev.clientX + window.scrollX) - (el.offsetWidth/2)}px`;
    el?.setAttribute('is-clicked', 'true');
    $('.highcharts-series-group').off('mousemove');
    $('.highcharts-label').off('mousemove');

  }

  showDetails(event: any){
    this.detailsCard.name = event.target.name;
    this.detailsCard.percentage = parseFloat(event.target.percentage).toFixed(2);
    this.detailsCard.listOfFilms = event.target.listOfFilms;

  }

  exportExcel(){
    let fileName = 'Disney_Characters-' + Math.floor(Math.random() * 15000) +'.xlsx';
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Disney Characters');
    XLSX.writeFile(wb, fileName);
  }

}
