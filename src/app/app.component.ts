import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PluginEventType } from './shared/public-api/enums/plugin-event-type';
import { ISiomeApi } from './shared/public-api/interfaces/siome-api.interface';
import { IPluginEvent } from './shared/public-api/plugin-interfaces/plugin-event.interface';
import { SiomeApiProviderService } from './services/siome-api-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SiOME Base Plugin';

  @Output() pluginEvent = new EventEmitter<IPluginEvent>();

  @Input()
  set isPluginCommunicationReady(isReady: boolean) {
    if (isReady) {
      const callback = (siomeApi: ISiomeApi): void => {
        this.siomeApiProvider.siomeApi = siomeApi;
      };
      this.pluginEvent.emit({
        eventType: PluginEventType.REQUEST_API,
        callback,
      });
    }
  }

  constructor(private siomeApiProvider: SiomeApiProviderService) {}
}
