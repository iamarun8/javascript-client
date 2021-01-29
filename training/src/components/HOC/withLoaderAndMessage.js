// import React from 'react';
// import CircularProgress from '@material-ui/core/CircularProgress';

// const withLoaderAndMessage = (WrappedComponent) => (props) => {
//     const { loader , dataLength, ...rest } = props;
//     console.log('-loading-', props);
//     if (loader) {
//         return (
//             <div paddingLeft="50%">
//                 <CircularProgress />
//             </div>
//         );
//     }
//     if (!dataLength) {
//         return (
            // <div paddingLeft={50}>
            //     <h2>Oops No more Trainees</h2>
            // </div>
//         );
//     }
//     return (<WrappedComponent loader={loader} dataLength={dataLength} {...rest} />);
// };

// export default withLoaderAndMessage;


import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const withLoaderAndMessage = (WrappedComponent) => {
  function HOC(props) {
    const [loader, setloader] = useState(true);
    const [dataLength, setdataLength ] = useState(0);
    return (
      <>
        {loader && (
          <div style={{ marginLeft: '700px', marginTop: '30px' }}>
            <CircularProgress color="secondary" />
          </div>
        )}
        {!dataLength && (
                <div paddingLeft={50}>
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