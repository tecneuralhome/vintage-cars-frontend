import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private collectionClickedSource = new Subject<void>();

  collectionClicked$ = this.collectionClickedSource.asObservable();

  triggerCollectionClick() {
    this.collectionClickedSource.next();
  }
}
