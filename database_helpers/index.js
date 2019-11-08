import * as tokenHelper from './token.store';
import * as userHelper from './user.store';
export default DATABASE_HELPERS = {
    ...tokenHelper,
    ...userHelper
}