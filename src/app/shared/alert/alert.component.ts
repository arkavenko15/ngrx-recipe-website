import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"],
})
export class AlertComponent implements OnInit {
  @Input() public message: string;
  @Output() public close = new EventEmitter<void>();
  constructor() {}

  public ngOnInit(): void {}

  public onClose(): void {
    this.close.emit();
  }
}
