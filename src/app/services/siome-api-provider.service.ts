import { Injectable } from '@angular/core';
import { ISiomeApi } from '../shared/public-api/interfaces/siome-api.interface';

@Injectable({
  providedIn: 'root',
})
export class SiomeApiProviderService {
  private _siomeApi?: ISiomeApi;

  get siomeApi(): ISiomeApi | undefined {
    return this._siomeApi;
  }

  set siomeApi(siomeApi: ISiomeApi) {
    this._siomeApi = siomeApi;
  }
}
