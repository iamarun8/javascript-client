import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const withLoaderAndMessage = (WrappedComponent) => {
  function HOC(props) {
    const [loader, setloader] = useState(true);
    const [dataLength, setdataLength ] = useState(0);
    console.log(props);
    return (
      <>
        {loader && (
          <div style={{ marginLeft: '700px', marginTop: '30px' }}>
            <CircularProgress color="secondary" />
          </div>
        )}
        {!dataLength && (
                <div style={{textAlign: 'center'}}>
                    <h2>Oops No more Trainees</h2>
                </div>
            )
        }
        <WrappedComponent {...props} setloader={setloader} loader={loader} dataLength={dataLength} setdataLength={setdataLength} />
      </>
    );
  }
  return HOC;
};
export default withLoaderAndMessage;