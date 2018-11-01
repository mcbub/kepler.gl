const mapURI = 'map?mapUrl=';

export function getMapSharingLink(mapLink) {
  return `/${mapURI}${mapLink}`
}
