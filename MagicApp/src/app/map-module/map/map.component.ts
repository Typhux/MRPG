import { Component, OnInit } from '@angular/core';
import { Land_Data } from '../../data/lands';
import { UserLand, LandBase } from '../../models/land';
import { LocationMap } from '../../models/map';

@Component({
  selector: 'map-mrpg',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  private randomNumber: number;
  private userLands: UserLand[];
  landMap: UserLand[];
  currentUserLand: UserLand;
  zoom: number;

  constructor() {
    this.userLands = Array<UserLand>();
    this.landMap = Array<UserLand>();
    this.randomNumber = 0;
    this.currentUserLand = null;
    this.zoom = 2;
  }

  ngOnInit() {
    this.getUserLands();
    if (this.userLands.length >= 0) {
      this.createMap();
    }
  }

  getUserLands(): void {
    if (this.userLands.length == 0) {
      this.userLands.push(
        new UserLand(this.randomLand(), new LocationMap(0, 0)),
        new UserLand(this.randomLand(), new LocationMap(0, 1)),
        new UserLand(this.randomLand(), new LocationMap(1, 0)),
        new UserLand(this.randomLand(), new LocationMap(-1, 0)),
        new UserLand(this.randomLand(), new LocationMap(0, -1))
      );
      this.currentUserLand = this.userLands[0];
    }
  }

  createMap(): void {
    for (let row = this.currentUserLand.location.row - 1; row < this.zoom; row++) {
      for (let column = this.currentUserLand.location.column - 1; column < this.zoom; column++) {
        let userLand = this.userLands.filter(u => u.location.row == row && u.location.column == column)[0];
        if (userLand) {
          this.landMap.push(userLand);
        } else {
          this.landMap.push(new UserLand(null, new LocationMap(column, row)));
        }
      }
    }
  }


  setRandomNumber(): void {
    let min = Math.ceil(0);
    let max = Math.floor(Land_Data.length);
    this.randomNumber = Math.floor(Math.random() * (max - min)) + min;
  }

  findLand(land: LandBase): boolean {
    let min = Math.ceil(0);
    let max = Math.floor(Land_Data.length);
    return land.id == this.randomNumber;
  }

  randomLand(): LandBase {
    this.setRandomNumber();
    return Land_Data.find(this.findLand, this);
  }
}
