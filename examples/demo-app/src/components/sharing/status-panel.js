import React from 'react';
import {FileType} from 'kepler.gl/components/common/icons';
import LoadingSpinner from 'kepler.gl/components/common/loading-spinner';

const StatusPanel = ({filename, isLoading, status, metadata}) => (
  <div>
    <div>
      <FileType ext="keplergl.json" height="50px" fontSize="9px"/>
      {isLoading && (
        <LoadingSpinner size={20} />
      )}
    </div>
    <div>
      <h4>{filename}</h4>
      <div><span>Status: {status}</span></div>
      <div><span>{status === 'success' && (<span>Your file has been uploaded</span>)}</span></div>
    </div>
    <div>
      url: {metadata && metadata.url}
    </div>
  </div>
);

export default StatusPanel;
