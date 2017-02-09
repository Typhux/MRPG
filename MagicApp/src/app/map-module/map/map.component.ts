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
        new UserLand(this.randomLand(), new LocationMap(0, 0), true),
        new UserLand(this.randomLand(), new LocationMap(0, 1), false),
        new UserLand(this.randomLand(), new LocationMap(1, 0), false),
        new UserLand(this.randomLand(), new LocationMap(-1, 0), false),
        new UserLand(this.randomLand(), new LocationMap(0, -1), false)
      );
      this.currentUserLand = this.userLands[0];
    }
  }

  createMap(): void {
    console.log('---- NEW MAP CREATED ----')
    if (this.landMap.length > 0) {
      this.landMap = Array<UserLand>();
    }
    for (let row = this.currentUserLand.location.row - 1; row < this.zoom; row++) {
      for (let column = this.currentUserLand.location.column - 1; column < this.zoom; column++) {
        let userLand = this.userLands.filter(u => u.location.row == row && u.location.column == column)[0];
        if (userLand) {
          this.landMap.push(userLand);
        } else {
          this.landMap.push(new UserLand(null, new LocationMap(column, row), false));
        }
      }
    }
    console.log('landMap:', this.landMap, 'Userlands:', this.userLands);
  }


  setRandomNumber(): void {
    let min = Math.ceil(0);
    let max = Math.floor(Land_Data.length);
    this.randomNumber = Math.floor(Math.random() * (max - min)) + min;
  }

  findLand(land: LandBase): boolean {
    return land.id == this.randomNumber;
  }

  private randomLand(): LandBase {
    this.setRandomNumber();
    return Land_Data.find(this.findLand, this);
  }

  clickUserLand(userLand: UserLand) {

    if (this.checkLocation(userLand.location)) {

      if (this.userLands.length < 100) {

        if (userLand.location.column < this.currentUserLand.location.column) {

          this.revealLand(new LocationMap(userLand.location.column, userLand.location.row - 1));
          this.revealLand(new LocationMap(userLand.location.column - 1, userLand.location.row));
          this.revealLand(new LocationMap(userLand.location.column + 1, userLand.location.row));

        } else if (userLand.location.column > this.currentUserLand.location.column) {

          this.revealLand(new LocationMap(userLand.location.column, userLand.location.row - 1));
          this.revealLand(new LocationMap(userLand.location.column - 1, userLand.location.row));
          this.revealLand(new LocationMap(userLand.location.column, userLand.location.row + 1));

        } else if (userLand.location.row > this.currentUserLand.location.row) {

          this.revealLand(new LocationMap(userLand.location.column, userLand.location.row + 1));
          this.revealLand(new LocationMap(userLand.location.column + 1, userLand.location.row));
          this.revealLand(new LocationMap(userLand.location.column - 1, userLand.location.row));

        } else {

          this.revealLand(new LocationMap(userLand.location.column, userLand.location.row - 1));
          this.revealLand(new LocationMap(userLand.location.column + 1, userLand.location.row));
          this.revealLand(new LocationMap(userLand.location.column - 1, userLand.location.row));

        }
      }
      this.changeCurrentUserLand(userLand);
      this.createMap();
    }
  }

  private revealLand(location: LocationMap) {
    if (!this.userLands.filter(u => u.location.row == location.row && u.location.column == location.column)[0]) {
      this.userLands.push(new UserLand(this.randomLand(), location, false))
    }
  }

  private changeCurrentUserLand(userland: UserLand) {
    if (userland != this.currentUserLand) {
      this.userLands[this.userLands.indexOf(this.userLands.filter(u => u.location.row == userland.location.row && u.location.column == userland.location.column)[0])].isCurrent = true;
      this.userLands[this.userLands.indexOf(this.userLands.filter(u => u.location.row == this.currentUserLand.location.row && u.location.column == this.currentUserLand.location.column)[0])].isCurrent = false;
      this.currentUserLand = userland;
    }
  }

  private checkLocation(location: LocationMap) : boolean{
    var currentLocation = this.currentUserLand.location;
    if(currentLocation.column == location.column){
      return ((currentLocation.row + location.row == 1) || (currentLocation.row + location.row == -1))
    }else{
      return ((currentLocation.column + location.column == 1) || (currentLocation.column + location.column == -1)) && currentLocation.row == location.row;
    }
  }
}
