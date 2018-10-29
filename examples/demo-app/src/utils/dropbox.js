// DROPBOX
import {Dropbox} from 'dropbox';
import {parseQueryString} from './url';

// const DROPBOX_CLIEND_ID = process.env.DropboxClientId;
const DROPBOX_CLIEND_ID = 'jx7ipiwmfen88a2';
const NAME = 'dropbox';
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

function uploadFile() {
  dropbox
  return dropbox.filesUpload({
    path: '/kepler.json',
    contents: new Blob([JSON.stringify({test: '123'})], {type: 'text/json'})
  })
}

function setAccessToken(token) {
  dropbox.setAccessToken(token);
}

function shareFile(metadata) {
  return dropbox.sharingCreateSharedLinkWithSettings({
    path
  });
}

export default {
  name: NAME,
  authLink,
  getAccessTokenFromUrl,
  uploadFile,
  setAccessToken,
  shareFile
};




