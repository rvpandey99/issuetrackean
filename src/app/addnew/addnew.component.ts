import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent {
  date = new Date();
  public createdDate = this.date.toString();
  public issueId = (this.date.getTime()).toString();
  constructor(private _DataService: DataService, private _router: Router) {
  }
  description: string;
  newDate: any;
  issues: any;
  status = 'Open';
  severity = 'Minor';
  addNew(data: any) {
    // this.issues.push(data);
    console.log(data);
    this._DataService.postIssue(data)
    .subscribe(res => {
        // let id = res['Id'];
        this._router.navigate(['/issues']);
      }, (err) => {
        console.log(err);
      });
    // alert('You have added a new issue. Please note down the issue id: ' + this.issueId);
    // this._router.navigate(['/issues']);
  }

  // ngOnInit() {
  //   this.issues = this._localjsonService.getJSON();
  // }

}

