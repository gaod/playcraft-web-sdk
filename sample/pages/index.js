import {Player} from 'playcraft'
import config from '../config'

if (!global.document) {
  global.document = {}

}

const Sample = () => (
  <div>
    <Player
      host={config.playbackApiBaseUrl}
      content={{
        contentType: 'videos',
        contentId: '1',
      }}
      accessToken="paas12@gmail.com"
      deviceId="sample-device-0"
      customHeader={{
        'X-Device-Type': 'web'
      }}
      // licenseKey is not used in local development
      // please set this when deploying to some environment
      licenseKey='<license key is not used in local development>'
      onLogging={() => {}}
    />
  </div>
)

export default Sample
