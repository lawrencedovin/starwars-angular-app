import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  // Logs everytime we change the side of a character.
  writeLog(logText: string) {
    console.log(logText);
  }
}
