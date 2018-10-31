import React from 'react';
import styled from 'styled-components';
import DropboxHandler from '../../utils/dropbox';
import DropboxIcon from '../icons/dropbox-icon';

export const StyledLabel = styled.div`
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
`;

const TileButton = styled.button`
  background-color: transparent;
  border-width: 0;
  cursor: pointer;
  padding: 0;
`;

const AuthHandlerTile = ({isLoading, token, onExportToDropbox}) => {

  const logo = (<DropboxIcon height="64px" />);

  return (
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
  );
};


export default AuthHandlerTile;
