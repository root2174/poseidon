import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";
import { IMqttMessage, MqttService } from "ngx-mqtt";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  private tempSubscription: Subscription;
  private umidSubscription: Subscription;

  public canvasWidth = 300;

  public centralLabel = "";
  public temperatura: string = "0";
  public temperaturaInt: number = 0;
  public umidade: string = "0";
  public umidadeInt: number = 0;

  public options = {
    hasNeedle: true,
    needleColor: "gray",
    needleUpdateSpeed: 1000,
    arcColors: ["rgb(44, 151, 222)", "lightgray"],
    arcDelimiters: [30],
    rangeLabel: ["0", "100"],
    needleStartValue: 50,
  };

  constructor(private _mqttService: MqttService) {
    this.tempSubscription = this._mqttService
      .observe("poseidon/geren/temperatura")
      .subscribe((message: IMqttMessage) => {
        this.temperatura = message.payload.toString();
        this.temperaturaInt = parseInt(message.payload.toString());

        if (parseInt(this.temperatura) <= 12) {
          this.sendmsg("poseidon2/cliente/temperatura", "Temperatura Baixa.");
        }
      });

    this.umidSubscription = this._mqttService
      .observe("poseidon/geren/umidade")
      .subscribe((message: IMqttMessage) => {
        this.umidade = message.payload.toString();
        this.umidade = message.payload.toString();
        this.umidadeInt = parseInt(message.payload.toString());
      });
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, { qos: 1, retain: true });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.tempSubscription.unsubscribe();
    this.umidSubscription.unsubscribe();
  }

  sendmsg(topic: any, msg: any): void {
    this._mqttService.unsafePublish(topic, msg, { qos: 1, retain: true });
    msg = "";
  }
}
