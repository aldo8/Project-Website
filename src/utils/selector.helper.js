import _ from 'lodash';

const createLoadingSelector = actions => state =>  {
    //return true only when all actions is not loading
    return _(actions).some(action => _.get(state, `loading.${action}`));
}
const createErrorMessageSelector = actions => state =>  {
    // returns the first error messages for actions
    // * We assume when any request fails on a page that
    //   requires multiple API calls, we shows the first error
  return (
    _(actions)
      .map(action => _.get(state, `error.${action}`))
      .compact()
      .first() || ''
  );
    
}
export {createLoadingSelector,createErrorMessageSelector};