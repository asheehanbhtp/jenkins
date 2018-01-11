import { AxiosResponse, AxiosStatic } from 'axios';
import { Require, Service } from 'typedi';

@Service()
export class StatusService {
    private axios: AxiosStatic;

    constructor(@Require('axios') axios: AxiosStatic) {
        this.axios = axios;
    }

    public async isGoogleActive(): Promise<boolean> {
        try {
            const resp: AxiosResponse = await this.axios.get('https://www.google.com/search?q=bhtp');

            return resp.status === 200;
        } catch (err) {
            return false;
        }
    }
}
