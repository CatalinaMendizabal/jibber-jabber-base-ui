import Keycloak, {KeycloakError, KeycloakPromise} from 'keycloak-js';

const _kc = new Keycloak('/keycloak.json')
// @ts-ignore
window['kc'] = _kc;
export default _kc;