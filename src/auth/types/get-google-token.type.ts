// https://developers.google.com/identity/protocols/oauth2/web-server?hl=ko#exchange-authorization-code
export type GoogleRequireData = {
  code: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  grant_type: string;
  state: string;
};
