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
  nomap: any;
  //clickArea: any;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getRouteParams();
    //this.setSidebar(this.sidebar);
  }
  getRouteParams(): void {
    const kaart = this.activatedRoute.snapshot.paramMap.get('kaart');

    if (kaart && this.mapListContainsPath(kaart)) {
      this.currentMap.title = kaart.toUpperCase();
      this.currentMap.path = kaart;
      this.setSidebar(true);
    } else {
      if (kaart) {
        this.nomap =
          'Paistab, et soovisite laadida kaarti ' +
          kaart +
          ', mida meie süsteemis (veel/enam) pole.';
      }
      this.currentMap.title = 'Hübriid';
      this.currentMap.path = 'hybriid';
    }
  }
  mapListContainsPath(path: string): boolean {
    let containsPath = false;
    this.getMapList().forEach((map) => {
      if (map.path === path) {
        containsPath = true;
      }
    });
    return containsPath;
  }

  getMapList(): any[] {
    return [
      { title: 'Hübriid', path: 'hybriid' },
      { title: 'Ortofoto', path: 'ortofoto' },
      { title: 'Reljeef', path: 'reljeef' },
      { title: 'Põhikaart', path: 'pohikaart' },
      //{ title: 'Olematu', path: 'olematu' },
    ];
  }
  setSidebar(show: boolean): void {
    this.sidebar = show;
    console.log(this.sidebar);
  }
}
