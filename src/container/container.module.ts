import { Module, HttpModule } from '@nestjs/common';
import { ContainerController } from './container.controller';
import { ContainerService } from './container.service';
import { DlcService } from './dlc/dlc.service';

@Module({
  imports: [HttpModule],
  controllers: [ContainerController],
  providers: [ContainerService, DlcService],
})
export class ContainerModule {}
