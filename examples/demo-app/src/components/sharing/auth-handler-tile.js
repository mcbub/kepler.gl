import React from 'react';
import styled from 'styled-components';
import DropboxHandler from '../../utils/dropbox';
import DropboxIcon from '../icons/dropbox-icon';
import {getMapSharingLink} from '../../utils/share';

const StyledTileWrapper = styled.div`
  display: flex;
`;

const StyledLabel = styled.div`
  font-size: 14px;
  color: ${props => props.theme.textColorLT};
  letter-spacing: 0.2px;
  text-align: center;
  ul {
    padding-left: 12px;
  }
`;

const StyledTile = styled.div`
  width: 64px;
  margin: 12px;
`;

const StyledTileMeta = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #3A414C;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  margin: 12px;
  
  .title {
    margin-bottom: 12px;
  }
`;

const TileButton = styled.button`
  background-color: transparent;
  border-width: 0;
  cursor: pointer;
  padding: 0;
`;

const AuthHandlerTile = ({token, onExportToDropbox, isLoading, metadata}) => {

  const logo = (<DropboxIcon height="64px" />);
  const showMeta = isLoading || (metadata && metadata.url);
  const sharingLink = metadata && metadata.url ?
    getMapSharingLink(metadata.url) : null;

  return (
    <StyledTileWrapper>
      <StyledTile>
        {token ?
          (
            <TileButton onClick={onExportToDropbox}>
              {logo}
            </TileButton>
          ) : (
            <a href={DropboxHandler.authLink()} target="_blank">
              {logo}
            </a>
          )
        }
        <StyledLabel>Dropbox</StyledLabel>
      </StyledTile>
      <StyledTileMeta>
        {showMeta && (
          <div>
            <div className="title">
              <a href={sharingLink} target="_blank">Share your map with other users</a>
            </div>
            <div className="title">
              <a href={metadata.url} target="_blank">Your new saved configuration</a>
            </div>
          </div>
        )}
      </StyledTileMeta>
    </StyledTileWrapper>

  );
};


export default AuthHandlerTile;
