import { map, flatten } from 'lodash'

const routes = require.context('../views', true, /routes\.js$/)

export default flatten(map(routes.keys(), key => routes(key).default))
