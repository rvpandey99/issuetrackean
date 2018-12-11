import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  constructor(private _DataService: DataService, private _router: Router) { }
  issues: any;
  default: boolean;
  upd8 = false;
  uid: any;
  customClicked = false;
  filterClicked = false;

  isCD = true;
  isDes = true;
  isSeverity = true;
  isStatus = true;
  isRD = true;

  stafilter = 'none';
  sevfilter = 'none';

  ngOnInit() {
    // this.issues = this._DataService.getIssues();
    this._DataService.getIssues()
    .subscribe(res => {
     // console.log(res);
      this.issues = res;
    }, err => {
      console.log(err);
    });
    if (this.issues.length < 2) {
      this.default = true;
    } else {
      this.default = false;
    }
  }

  customtoggle() {
    this.customClicked = !this.customClicked;
  }

  filtertoggle() {
    this.filterClicked = !this.filterClicked;
  }

  update(id: any) {
    this.upd8 = true;
    this.uid = id;
  }

  delete(id: any) {
    this._DataService.deleteIssue(id)
    .subscribe(res => {
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      }
    );
    if (this.issues.length < 2) {
      // this._router.navigate(['/issues']);
      this.default = true;
    }
  }

}
