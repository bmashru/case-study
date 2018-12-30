import { APP_INITIALIZER, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClientConfigService {
  private loadedConfiguration: any;

  constructor(private http: HttpClient) {
  }

  init(): Promise<void> {
    return this.http.get<any>('conf/client-config.json').forEach(this.update.bind(this));
  }

  update(config: any): void {
    this.loadedConfiguration = config;
  }

  get(): any {
    return this.loadedConfiguration;
  }
}

export const CONFIGURATION_INITIALIZER = {
  provide: APP_INITIALIZER,
  useFactory: (service: ClientConfigService) => () => service.init(),
  deps: [ClientConfigService],
  multi: true
};
