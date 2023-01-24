import { fileUpload } from './../../helpers/fileUpload';
// como la parte de testing solo esta del lado de desarrollo
// tendremos que usar el SDK de cloudinary como en node
// https://cloudinary.com/documentation/node_integration#installation_and_setup
// https://cloudinary.com/documentation/admin_api#delete_resources
// npm i cloudinary -D
// y colocamos las apikey y todo lo demas para poder eliminar la imagen en el panel de admin

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name: 'dpixlfrmo', 
  api_key: '518641718979736', 
  api_secret: 'QK3guc4munA5O5ZfBBFNTnLIE3g',
  secure: true
});

describe('Test in fileUpload file', () => {
  test('should post the file to cloudinary correctly', async () => {
    const imageUrl = 'https://media-cdn.tripadvisor.com/media/photo-s/15/a4/9b/77/legacy-hotel-at-img-academy.jpg'
    const responseImage = await fetch(imageUrl)
    const blobImg = await responseImage.blob()
    const file = new File([blobImg],'Imagen.jpg')
    const url = await fileUpload(file)
    expect(typeof url).toBe("string")
    
    const segments = url.split('/')
    const imageId = segments.at(-1).replace('.jpg','')

    const cloudResponse = await cloudinary.api.delete_resources([`journal_app/${imageId}`],{
      resource_type:"image"
    })
    // console.log("🚀 ~ file: fileUpload.test.ts ~ line 33 ~ test ~ cloudResponse", cloudResponse)
    expect(Object.values(cloudResponse.deleted)[0]).toBe("deleted")
  })
  
  test('should return null', async () => {
    const file = new File([],'Imagen.jpg')
    const url = await fileUpload(file)
    expect(url).toBe(null)
  })
})

