import React, {Component} from 'react';
import styled from 'styled-components';
import AuthHandlerTile from './auth-handler-tile';
import DropboxHandler from '../utils/dropbox';

const StyledWrapper = styled.div`
  flex-grow: 1;
  padding: 32px;
  background-color: ${props => props.theme.panelBackgroundLT};
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

const StatusPanel = ({filename, isLoading, status, metadata}) => (
  <div>
    <ul>
      <li>
        filename: {filename}
      </li>
      <li>
        <span>status: {status}</span><br/>
        {status === 'success' && (<span>Your file has been uploaded</span>)}
      </li>
      {isLoading && (
        <li>Uploading</li>
      )}
      <li>
        url: {metadata && metadata.url}
      </li>
    </ul>
  </div>
);

class CloudStorage extends Component {
  render() {
    const {authTokens, isLoading, info} = this.props;

    return (
      <StyledWrapper>
        <StyledDescription>
          <div className="title">
            Store your Map
          </div>
          <div>
            * The file will be stored in your own account
          </div>
        </StyledDescription>
        <StyledList>
          {[DropboxHandler].map((handler, index) => (
            <AuthHandlerTile
              key={index}
              token={authTokens && authTokens[handler.name]}
              {...this.props}
            />
          ))}
        </StyledList>
        <StatusPanel isLoading={isLoading} {...info} />
      </StyledWrapper>
    );
  }
};

export default CloudStorage;
