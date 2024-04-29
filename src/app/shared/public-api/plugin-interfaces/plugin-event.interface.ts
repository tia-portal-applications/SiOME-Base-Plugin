import { PluginEventType } from "../enums/plugin-event-type";
import { ISiomeApi } from "../interfaces/siome-api.interface";

export interface IPluginEvent {
  eventType: PluginEventType;
  callback(pluginService: ISiomeApi): void;
}
