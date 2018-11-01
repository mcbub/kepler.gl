import React, {Component} from 'react';
import styled from 'styled-components';
import AuthHandlerTile from './auth-handler-tile';
import StatusPanel from './status-panel';
import DropboxHandler from '../../utils/dropbox';

const StyledWrapper = styled.div`
  flex-grow: 1;
  font-family: ff-clan-web-pro,'Helvetica Neue',Helvetica,sans-serif;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.71429;
`;

const StyledDescription = styled.div`
  margin-bottom: 24px;
  
  .title {
    font-size: 24px;
    color: #3A414C;
    margin-bottom: 10px;
    position: relative;
    z-index: 10003;
  }
  .subtitle {
    color: ${props => props.theme.textColor};
    font-size: 11px;
  }
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class CloudStorage extends Component {
  render() {
    const {authTokens, isLoading, info, onExportToDropbox} = this.props;

    return (
      <StyledWrapper>
        <StyledDescription>
          <div className="title">
            Store your Map
          </div>
          <div>
            * Kepler.gl is a client-side application with no server backend. Data lives only on your machine/browser/cloud account (Dropbox).
          </div>
        </StyledDescription>
        <StyledList>
          {!isLoading && [DropboxHandler].map((handler, index) => (
            <AuthHandlerTile
              key={index}
              token={authTokens && authTokens[handler.name]}
              isLoading={isLoading}
              metadata={info && info.metadata}
              onExportToDropbox={onExportToDropbox}
            />
          ))}
        </StyledList>
        {isLoading && (<StatusPanel isLoading={isLoading} {...info} />)}
      </StyledWrapper>
    );
  }
};

export default CloudStorage;
