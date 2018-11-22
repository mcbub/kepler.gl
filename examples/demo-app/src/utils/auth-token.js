import DropboxHandler from './dropbox';

export const AUTH_HANDLERS = {
  [DropboxHandler.name]: DropboxHandler
};

// this should take an handler
// dropbox as default for now
export function validateAndStoreAuth(handler = DropboxHandler) {

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

export function uploadFile(fileBlob, name, handler = DropboxHandler) {
  if (!handler) {
    return null;
  }

  if (handler.uploadFile) {
    return handler.uploadFile(fileBlob, name);
  }

  return Promise.reject('No auth handler');
}

export function shareFile(metadata, handler = DropboxHandler) {
  if (!handler) {
    return null;
  }

  if (handler.shareFile) {
    return handler.shareFile(metadata);
  }

  return Promise.reject('No auth handler');
}

/**
 * In certain cases we want to override response URLs to avoid CORS
 * or other restrictions
 * @param metadata
 * @param handler
 * @returns {*}
 */
export function overrideUrl(metadata, handler = DropboxHandler) {
  if (!handler) {
    return null;
  }

  if (handler.overrideUrl) {
    return handler.overrideUrl(metadata);
  }
}
