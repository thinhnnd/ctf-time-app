import * as ctfEventApi from './ctf-event.api';
import * as auth from './auth.api';

export default API_HELPERS = {
    ...ctfEventApi,
    ...auth
}