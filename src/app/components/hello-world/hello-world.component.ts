/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { SiomeApiProviderService } from '../../services/siome-api-provider.service';
import { ISiomeApi } from '../../shared/public-api/interfaces/siome-api.interface';


@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css'],
})
export class HelloWorldComponent {
  constructor(private siomeApiProvider: SiomeApiProviderService) {}

  private get siomeApi(): ISiomeApi {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.siomeApiProvider.siomeApi!;
  }

  //your code :
  async helloWorld() {
    this.siomeApi.openAlertDialog(
      'Hello World!',
      'Hello World from my custom plugin',
    );
  }  
}
