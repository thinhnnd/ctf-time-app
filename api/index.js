import * as ctfEventApi from './ctf-event.api';
import * as auth from './auth.api';
import * as teamsApi from './teams.api';

export default API_HELPERS = {
    ...ctfEventApi,
    ...auth,
    ...teamsApi
}