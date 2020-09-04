import BaseApi from '../base/';
import apiConfig from 'config/api.config';

const userManagementService = '/dca/api/login';

class AccountApi extends BaseApi {
    static newInstance = () => {
        if (!this.accountApi) this.accountApi = new AccountApi(apiConfig());
        return this.accountApi;
    };
    login = ({username,password}) => {
        return this.axios.post(`${userManagementService}`,{username,password});
    };
}

export default AccountApi