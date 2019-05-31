import { Injectable, HttpService } from '@nestjs/common';
import * as url from 'url';
import * as path from 'path';
import * as fs from 'fs';
import * as request from 'request';
import * as FormData from 'form-data';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const DCRYPT_URL = 'http://dcrypt.it/';
const UPLOAD_URL = url.resolve(DCRYPT_URL, '/decrypt/upload');
const CONTAINER_URL = url.resolve(DCRYPT_URL, '/decrypt/container');
const CNL_URL = url.resolve(DCRYPT_URL, '/decrypt/cnl');
const PASTE_URL = url.resolve(DCRYPT_URL, '/decrypt/paste');

@Injectable()
export class DlcService {
  constructor(private readonly httpService: HttpService) {}

  decryptFile(fileBuffer: Buffer, fileName: string): Observable<string[]> {
    const form = new FormData();
    form.append('dlcfile', fileBuffer, fileName);
    return this.httpService
      .post(UPLOAD_URL, form, {
        headers: form.getHeaders(),
      })
      .pipe(
        map(response => {
          //console.log('fist response:', response.data);
          const json = JSON.parse(
            response.data.replace(/<(\/|)textarea>/g, ''),
          );
          return json.success.links;
        }),
      );
  }

  async decryptUrl() {}

  async decryptText() {}
}
