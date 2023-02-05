import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {

  @Input() details: any;
  @Output() closeModal = new EventEmitter<any>();

  constructor(){

  }

  ngOnInit(){

    $(document).ready(()=>{
      $('#info-cont').attr('will-hide', 'false');

      $('#modal-dead-space').on('click', (ev)=>{
        $('#info-cont').attr('will-hide', 'true');
        setTimeout(() => {
          this.closeModal.emit(true);
        }, 300);
      });
    });

  }

  closeModalFun(){
    $('#info-cont').attr('will-hide', 'true');
    setTimeout(() => {
      this.closeModal.emit(true);
    }, 300);
  }
}
