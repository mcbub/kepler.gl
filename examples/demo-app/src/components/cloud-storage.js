import React, {Component} from 'react';
import styled from 'styled-components';

import DropboxHandler from '../utils/dropbox';

const StyledWrapper = styled.div`
  padding: 30px 36px;
`;

class CloudStorage extends Component {
  render() {

    return (
      <StyledWrapper>
        {!(this.props.authTokens && this.props.authTokens.dropbox) && (
          <a
            href={DropboxHandler.authLink()}
            target="_blank"
          >
            Authenticate with Dropbox
          </a>
        )}
        {(this.props.authTokens && this.props.authTokens.dropbox) && (
          <button onClick={this.props.onExportToDropbox}>
            Export map to Dropbox
          </button>
        )}
      </StyledWrapper>
    );
  }
};

export default CloudStorage;
