// DROPBOX
import {Dropbox} from 'dropbox';
import {parseQueryString} from './url';

// const DROPBOX_CLIEND_ID = process.env.DropboxClientId;
const DROPBOX_CLIEND_ID = 'jx7ipiwmfen88a2';
const NAME = 'dropbox';
const DOMAIN = 'www.dropbox.com';
const CORS_FREE_DOMAIN = 'dl.dropboxusercontent.com';
const dropbox = new Dropbox({clientId: DROPBOX_CLIEND_ID});

function authLink(path = 'auth') {
  return dropbox.getAuthenticationUrl(
    `${window.location.origin}/${path}`,
    JSON.stringify({handler: 'dropbox'})
  )
}

function getAccessTokenFromUrl() {
  if (!window.location.hash.length) {
    return undefined;
  }
  // dropbox token usually start with # therefore we want to remore the '#'
  const query = window.location.hash.substring(1);

  const token = parseQueryString(query).access_token;
  dropbox.setAccessToken(token);
  return token;
}

/**
 *
 * @param blob
 * @param name
 * @returns {Promise<DropboxTypes.files.FileMetadata>}
 */
function uploadFile(blob, name) {
  return dropbox.filesUpload({
    path: `/keplergl/${blob.name || name}`,
    contents: blob
  })
}

function setAccessToken(token) {
  dropbox.setAccessToken(token);
}

/**
 * It will set access to file to public
 * @param metadata
 * @returns {Promise<DropboxTypes.sharing.FileLinkMetadataReference | DropboxTypes.sharing.FolderLinkMetadataReference | DropboxTypes.sharing.SharedLinkMetadataReference>}
 */
function shareFile(metadata) {
  return dropbox.sharingCreateSharedLinkWithSettings({
    path: metadata.path_display || metadata.path_lower
  });
}

/**
 * Override dropbox sharing url
 * https://www.dropbox.com/s/bxwwdb81z0jg7pb/keplergl_2018-11-01T23%3A22%3A43.940Z.json?dl=0
 * ->
 * https://dl.dropboxusercontent.com/s/bxwwdb81z0jg7pb/keplergl_2018-11-01T23%3A22%3A43.940Z.json
 * @param metadata
 * @returns {{url: string}}
 */
function overrideUrl(metadata) {
  const url = (metadata.url || '');
  return {
    ...metadata,
    url: url.slice(0, url.indexOf('?')).replace(DOMAIN, CORS_FREE_DOMAIN)
  };
}

export default {
  name: NAME,
  authLink,
  getAccessTokenFromUrl,
  uploadFile,
  setAccessToken,
  shareFile,
  overrideUrl
};




