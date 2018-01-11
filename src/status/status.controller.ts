import { Get, JsonController } from 'routing-controllers';
import { StatusService } from './status.service';

@JsonController('/status')
export class StatusController {
    private statusService: StatusService;

    constructor(statusService: StatusService) {
        this.statusService = statusService;
    }

    @Get()
    public async getStatus(): Promise<object> {
        let statusSuccessful: boolean;
        try {
            statusSuccessful = await this.statusService.isGoogleActive();
        }
        catch (err) {
            statusSuccessful = false;
        }

        return {
            app: 'Jenkins',
            deloreanSpeed: '88 mph',
            google: statusSuccessful
        };
    }
}
