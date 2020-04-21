import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
import { GaugeChartModule } from "angular-gauge-chart";
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: "broker.hivemq.com",
  port: 8000,
  path: "/mqtt",
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GaugeChartModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
