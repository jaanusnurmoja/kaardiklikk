import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kaart',
  templateUrl: './kaart.component.html',
  styleUrls: ['./kaart.component.css'],
})
export class KaartComponent implements OnInit {
  currentMap: any = { title: 'string', path: 'string' };
  sidebar: boolean = false;
  //clickArea: any;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getRouteParams();
    //this.setSidebar(this.sidebar);
  }
  getRouteParams(): void {
    const kaart = this.activatedRoute.snapshot.paramMap.get('kaart');

    if (kaart) {
      this.currentMap.title = kaart.toUpperCase();
      this.currentMap.path = kaart;
      this.setSidebar(true);
    } else {
      this.currentMap.title = 'Hübriid';
      this.currentMap.path = 'hybriid';
    }
  }
  getMapList(): any[] {
    return [
      { title: 'Hübriid', path: 'hybriid' },
      { title: 'Ortofoto', path: 'ortofoto' },
      { title: 'Reljeef', path: 'reljeef' },
      { title: 'Põhikaart', path: 'pohikaart' },
    ];
  }
  setSidebar(show: boolean): void {
    this.sidebar = show;
    console.log(this.sidebar);
  }
}
