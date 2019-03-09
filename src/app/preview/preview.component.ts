import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { CustomerService } from '../services/login.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @ViewChild('video_player') video_player: ElementRef;
  priorityid = 0;
  timeinterval = 0;
  playlistid = 421;
  deviceDetails: any;
  searchText: any;
  getplaylistdata: any;
  path: string[] = ['company'];
  order = 1; // 1 asc, -1 desc;
  id: any;
  type: any;
  videocontent: any;
  idcontent: any;
  videointerval: number;
  pathtemp: any;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private customerService: CustomerService) {
    // this.customerService.getStoreContent(4).subscribe(
    //   (data: any) => {
    //     this.videocontent = data;
    //   });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.playContent();
    // this.customerService.getbyPriority(this.priorityid, this.playlistid).subscribe(
    //   (data: any) => {
    //     this.priorityplay(data, this.timeinterval);
    //   });
  }
playContent() {
  this.customerService.getbyPriority(this.priorityid, this.playlistid).subscribe(
    (data: any) => {
      console.log('Time interval and priority', this.timeinterval + ' ' + data.PRIORITY);
      this.priorityplay(data, this.timeinterval);
    });
}
  priorityplay(datax, timestamp) {
    setTimeout(() => {
          const timeinMl = 0;
          this.priorityid = datax.PRIORITY;
          this.type = datax.CONTENTTYPEID;
          this.idcontent = datax.CONTENTID;
          // tslint:disable-next-line:curly
          if (this.type === 1) {
            this.priorityplay(datax, datax.DISPLAYTIME);
            const pathsai = datax.PATH;
            const num = pathsai.indexOf('N');
            console.log(num);
            if (num === 11) {
              const pathtem = datax.PATH.replace('file:///C:', 'C');
              this.pathtemp = pathtem.replace('C/NewSignage', 'http:\\\\34.207.100.215:8091');
            } else {
            this.pathtemp = datax.PATH.replace('file:///D:/Websites/Spirits Signage/API', 'http:\\\\34.207.100.215:8091');
            }
            console.log(this.pathtemp);
          } else if (this.type === 3) {
            this.timeinterval = datax.DISPLAYTIME;
            this.playContent();
            // this.priorityplay(datax, datax.DISPLAYTIME);
            this.path = datax.PATH.replace('C:\\NewSignage', 'http:\\\\34.207.100.215:8091');
          } else if (this.type === 4) {
            this.timeinterval = datax.SIZEORPRODUCTLISTID * 1000;
            this.playContent();
            // this.priorityplay(datax, datax.SIZEORPRODUCTLISTID * 1000);
            // for (let k = 0; k < this.videocontent.length; k++) {
            //   console.log('video content', this.videocontent);
            //   if (this.videocontent[k].STORECONTENTID === this.idcontent) {
            //     this.timeinterval = this.videocontent[k].SIZE * 1000;
            //     // this.priorityplay(datax, this.videocontent[k].SIZE * 1000);
            //     break;
            //   }
            // }
            this.path = datax.PATH.replace('C:\\NewSignage', 'http:\\\\183.82.43.147/SIGNAGE');
            // this.path = data.PATH.replace('D:\\Websites\\Spirits Signage\\API', 'http:\\\\34.207.100.215:8091');
          }
          console.log(this.path);


    }, timestamp);
  }

}
