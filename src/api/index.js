import auctionsApi from './auctionsApi'
import bidsApi from './bidsApi'
import commentsApi from './commentsApi'
import imagesApi from './imagesApi'
import tagsApi from './tagsApi'
import usersApi from './usersApi'
import documentsApi from './documentsApi'

export default {
  ...auctionsApi,
  ...usersApi,
  ...tagsApi,
  ...bidsApi,
  ...commentsApi,
  ...imagesApi,
  ...documentsApi
}

// export default class Api {
//
//   //?
//   static async getOwnerImage(idImage) {
//     return await Api.sendJson(Api.root + 'images/owner', {
//       id: idImage
//     })
//   }
//
//   //?

//}


