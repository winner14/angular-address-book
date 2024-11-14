import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshContactServiceService {
  private refreshSubject = new Subject<void>();

  get refresh$() {
    return this.refreshSubject.asObservable();
  }

  constructor() { }

  refresh() {
    this.refreshSubject.next();
  }
}
