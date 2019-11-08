import * as ctfEventApi from './ctf-event.api';
import * as auth from './auth.api';
import * as teamsApi from './team.api';
export default API_HELPERS = {
    ...ctfEventApi,
    ...auth,
    ...teamsApi
}