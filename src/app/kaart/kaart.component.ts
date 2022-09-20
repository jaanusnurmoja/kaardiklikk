import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { HTTPParser, HTTPParserConstructor } from 'http-parser-js';
import { HttpClient } from '@angular/common/http';
import * as pathExists from 'path-exists';

@Component({
  selector: 'app-kaart',
  templateUrl: './kaart.component.html',
  styleUrls: ['./kaart.component.css'],
})
export class KaartComponent implements OnInit {
  currentMap: any = { title: 'string', path: 'string' };
  sidebar: boolean = false;
  nomap: any;
  noimg: any;

  //clickArea: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.getRouteParams();
    //this.setSidebar(this.sidebar);
  }
  getRouteParams(): void {
    const kaart = this.activatedRoute.snapshot.paramMap.get('kaart');

    if (kaart && this.mapListContainsPath(kaart)) {
      this.setSidebar(true);
      let imgExists = this.fileExist('/assets/img/map/' + kaart + '.png');
      if (imgExists === true) {
        this.getMapList().forEach((thisMap) => {
          if (thisMap.path === kaart) {
            this.currentMap.title = thisMap.title;
          }
        });
        this.currentMap.path = kaart;
      } else {
        this.currentMap.path = 'hybriid';
        this.getMapList().forEach((thisMap) => {
          this.currentMap.title = thisMap.title;
          if (thisMap.path === kaart) {
            this.noimg =
              'Kaardipilt peaks olemas olema, kuid seda ei õnnestunud laadida. Palume kindlasti probleemist teavitada tugi@misiganes.ee';
          }
        });
      }
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

  fileExist(urlToFile: string) {
    let xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    return xhr.status !== 404;
  }

  getMapList(): any[] {
    return [
      { title: 'Hübriid', path: 'hybriid' },
      { title: 'Ortofoto', path: 'ortofoto' },
      { title: 'Reljeef', path: 'reljeef' },
      { title: 'Põhikaart', path: 'pohikaart' },
      { title: 'Failitu', path: 'failitu' },
    ];
  }
  setSidebar(show: boolean): void {
    this.sidebar = show;
    console.log(this.sidebar);
  }
}
