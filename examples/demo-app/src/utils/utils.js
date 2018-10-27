import DropboxHandler from './dropbox';


// this should take an handler
// dropbox as default for now
export function validateAndStoreAuth(handler) {

  if (!handler) {
    return null;
  }
  // handler provides a custom method
  if (handler.validateAndStoreAuth) {
    return handler.validateAndStoreAuth();
  }

  const token = handler.getAccessTokenFromUrl();

  if (!token || !localStorage) {
    // TODO: we should return an error message
    return;
  }

  localStorage.setItem(handler.name, token);

  return token;
}

export function retrieveAuthToken(handler) {
  if (!handler) {
    return null;
  }

  if (handler.retrieveToken) {
    return handler.retrieveToken();
  }

  const token = localStorage.getItem(handler.name);

  // TODO: review if this is the best place for this one
  if (handler.setAccessToken) {
    handler.setAccessToken(token)
  }
  return token;
}

export function uploadFile(handler) {
  if (!handler) {
    return null;
  }

  if (handler.uploadFile) {
    return handler.uploadFile();
  }

  return Promise.reject('No auth handler');
}
