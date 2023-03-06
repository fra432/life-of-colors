import {crossOrigin} from 'next.config'
import {CorsOriginError} from 'sanity'
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'tdq96y0q',
    dataset: 'production',
  },
  cors: {
    origins: ['http://localhost:3000'],
  },
})
