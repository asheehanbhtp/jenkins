import { assert } from 'chai';
import { IMock, Mock } from 'typemoq';

import { StatusController } from './status.controller';
import { StatusService } from './status.service';

describe('StatusController', () => {

    let controller: StatusController;
    let serviceMock: IMock<StatusService>;

    beforeEach('Initialize StatusController', () => {
        serviceMock = Mock.ofType<StatusService>();
        serviceMock.setup((s) => s.isGoogleActive()).returns(() => new Promise<boolean>((resolve) => resolve(true)));
        controller = new StatusController(serviceMock.object);
    });

    describe('getStatus', () => {

        it('provides the DeLorean\'s speed, app name, and google availability', async () => {
            const expected = { app: 'Jenkins', deloreanSpeed: '88 mph', google: true };
            const result = await controller.getStatus();

            assert.deepEqual(result, expected);
        });

        it('handles errors from the StatusService', async () => {
            serviceMock.reset();
            serviceMock.setup((s) => s.isGoogleActive()).throws(new Error('oops'));

            const expected = { app: 'Jenkins', deloreanSpeed: '88 mph', google: false };
            const result = await controller.getStatus();

            assert.deepEqual(result, expected);
        });
    });

});
