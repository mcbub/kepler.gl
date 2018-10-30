import React, {Component} from 'react';
import styled from 'styled-components';

import DropboxHandler from '../utils/dropbox';

const StyledWrapper = styled.div`
  padding: 30px 36px;
`;

class CloudStorage extends Component {
  render() {
    const {isLoading, authTokens, metadata, onExportToDropbox, status} = this.props;

    const actionComponent = isLoading ?
      (
        <div>
          <p>Loading...</p>
          <p>${status}</p>
        </div>
      ) :
      (
        <button onClick={onExportToDropbox}>
          Export map to Dropbox
        </button>
      );

    return (
      <StyledWrapper>
        {!(authTokens && authTokens.dropbox) && (
          <a
            href={DropboxHandler.authLink()}
            target="_blank"
          >
            Authenticate with Dropbox
          </a>
        )}
        {(authTokens && authTokens.dropbox) && actionComponent}
        {metadata && (
          <div>
            ${JSON.stringify(metadata, null, 2)}
          </div>
        )}
      </StyledWrapper>
    );
  }
};

export default CloudStorage;
