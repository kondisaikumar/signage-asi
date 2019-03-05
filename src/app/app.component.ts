import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';
import { CustomerService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('video_player') video_player: ElementRef;
  priorityid = 0;
  timeinterval: any;
  playlistid = 416;
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
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private customerService: CustomerService) {
    // this.customerService.getStoreContent(4).subscribe(
    //   (data: any) => {
    //     this.videocontent = data;
    //   });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // this.customerService.getbyPriority(this.priorityid, this.playlistid).subscribe(
    //   (data: any) => {
    //     this.priorityplay(data, 1000);
    //   });
  }
  // priorityplay(datax, timestamp) {
  //   setTimeout(() => {
  //     this.customerService.getbyPriority(datax.PRIORITY, this.playlistid).subscribe(
  //       (data: any) => {
  //         const timeinMl = 0;
  //         this.priorityid = data.PRIORITY;
  //         this.type = data.CONTENTTYPEID;
  //         this.idcontent = data.CONTENTID;
  //         // tslint:disable-next-line:curly
  //         if (this.type === 1) {
  //           this.priorityplay(data, data.DISPLAYTIME);
  //           this.path = data.PATH.replace('file:///D:/Websites/Spirits Signage/API', 'http:\\\\34.207.100.215:8091');
  //         } else if (this.type === 3) {
  //           this.priorityplay(data, data.DISPLAYTIME);
  //           this.path = data.PATH.replace('C:\\NewSignage', 'http:\\\\34.207.100.215:8091');
  //         } else if (this.type === 4) {
  //           for (let k = 0; k < this.videocontent.length; k++) {
  //             console.log('video content', this.videocontent);
  //             if (this.videocontent[k].STORECONTENTID === this.idcontent) {
  //               this.priorityplay(data, this.videocontent[k].SIZE * 1000);
  //               break;
  //             }
  //           }
  //           this.path = data.PATH.replace('D:\\Websites\\Spirits Signage\\API', 'http:\\\\34.207.100.215:8091');
  //         }
  //         console.log(this.path);

  //       });
  //   }, timestamp);
  // }

}
