import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ContainerService } from './container.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFileInfo } from './upload-file-info';
import { DlcService } from './dlc/dlc.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('container')
export class ContainerController {
  constructor(
    private readonly containerService: ContainerService,
    private readonly dlcService: DlcService,
  ) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFile(@UploadedFiles() files: UploadFileInfo[]) {
    const observables = files.map(file =>
      this.dlcService.decryptFile(file.buffer, file.originalname).pipe(
        map(links => {
          return { file: file.originalname, links };
        }),
      ),
    );

    return forkJoin(observables);

    /*console.log('observables:', observables);

    files.forEach(file => {
      console.log('uploaded file:', file.originalname);
      this.dlcService
        .decryptFile(file.buffer, file.originalname)
        .subscribe(links => {
          console.log('got links:', links);
        });
    });*/
  }
}
