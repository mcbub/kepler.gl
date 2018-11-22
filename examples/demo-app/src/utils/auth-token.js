// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import DropboxHandler from './dropbox';

export const AUTH_HANDLERS = {
  [DropboxHandler.name]: DropboxHandler
};

/**
 * This method will validate and store the auth token received by the third party service
 * @param {Object} [handler=DropboxHandler] Handler to collect and set authorization tokens.
 * @returns {string} The auth token
 */
export function validateAndStoreAuth(handler = DropboxHandler) {

  if (!handler) {
    return null;
  }

  // TODO: kill the next 3 statements. The handler should take care of everything
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

/**
 * This method will retrieve the auth token
 * @param {Object} [handler=DropboxHandler] Handler to collect and set authorization tokens.
 * @returns {string} The auth token
 */
export function retrieveAuthToken(handler = DropboxHandler) {
  if (!handler) {
    return null;
  }

  // TODO: kill the next 3 statements. The handler should take care of everything
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

/**
 * This method handle uploading file to the cloud by providing the third party service handler
 * @param {FileBloc} fileBlob File Blob to upload
 * @param {string} name Name of the file
 * @param {Object} handler
 * @returns {*}
 */
export function uploadFile(fileBlob, name, handler = DropboxHandler) {
  if (!handler) {
    return null;
  }

  if (handler.uploadFile) {
    return handler.uploadFile(fileBlob, name);
  }

  return Promise.reject('No auth handler');
}

/**
 *
 * @param {Object} metadata
 * @param {Object} [handler=DropboxHandler] Handler to collect and set authorization tokens.
 * @returns {*}
 */
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
 * @param {Object} metadata
 * @param {Object} [handler=DropboxHandler] Handler to collect and set authorization tokens.
 * @returns {string} the url to fetch the static file
 */
export function overrideUrl(metadata, handler = DropboxHandler) {
  if (!handler) {
    return null;
  }

  if (handler.overrideUrl) {
    return handler.overrideUrl(metadata);
  }
}
