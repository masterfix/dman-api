import { Injectable } from '@nestjs/common';
import { DlcService } from './dlc/dlc.service';

@Injectable()
export class ContainerService {
  constructor(private readonly dlcService: DlcService) {}
}
