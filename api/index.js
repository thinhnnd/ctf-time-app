import * as ctfEventApi from './ctf-event.api';
import * as auth from './auth.api';
import * as teamsApi from './team.api';
import * as usersApi from './users.api';
import * as TeamRegEvents from './team-reg-event.api'
export default API_HELPERS = {
    ...ctfEventApi,
    ...auth,
    ...teamsApi,
    ...usersApi,
    ...TeamRegEvents
}