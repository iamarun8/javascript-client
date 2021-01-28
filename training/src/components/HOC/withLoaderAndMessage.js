// import React from 'react';
// import CircularProgress from '@material-ui/core/CircularProgress';

// const hoc = (WrappedComponent) => (props) => {
//     const { loader , count, ...rest } = props;
//     if (loader) {
//         return (
//             <div paddingLeft="50%">
//                 <CircularProgress />
//             </div>
//         );
//     }
//     if (!count) {
//         return (
//             <div paddingLeft={50}>
//                 <h2>Oops No more Trainees</h2>
//             </div>
//         );
//     }
//     return (<WrappedComponent loader={loader} count={count} {...rest} />);
// };

// export default hoc;


import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const IsLoadingHOC = (WrappedComponent) => {
  function HOC(props) {
    const [isLoading, setLoading] = useState(true);

    const setLoadingState = (isComponentLoading) => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && (
          <div style={{ marginLeft: '700px', marginTop: '30px' }}>
            <CircularProgress color="secondary" />
          </div>
        )}
        <WrappedComponent {...props} setLoading={setLoadingState} currentState={isLoading} />
      </>
    );
  }
  return HOC;
};
export default IsLoadingHOC;