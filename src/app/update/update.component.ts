import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Input() public ID;

  @Output() public upevent = new EventEmitter();
  issues: any;
  constructor(private _DataService: DataService, private _router: Router) { }

  ngOnInit() {
    this.issues = this._DataService.getIssues();
  }

  update(data) {
    console.log(data);
    this._DataService.updateIssue(data).subscribe(res => {
      this._router.navigate(['/issues']);
    }, (err) => {
      console.log(err);
    }
  );
    this.upevent.emit( false );
    // this._router.navigate(['issues']);
  }
}
