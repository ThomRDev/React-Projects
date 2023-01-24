export const fileUpload = async (file:File) => {
  if(!file) return null
  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dpixlfrmo/upload"
  const formData = new FormData()
  formData.append("upload_preset","react-journal")
  formData.append("file",file)
  try {
    const response = await fetch(cloudinaryUrl,{
      method : "POST",
      body:formData
    })

    if(!response.ok) throw new Error("No se pudo subir imagenes")
    const imagesResponse = await response.json()
    return imagesResponse.secure_url
  } catch (error) {
    // return (error as Error).message
    return null
  }
}

// https://github.com/motdotla/dotenv/issues/389
// https://cloudinary.com/documentation/image_upload_api_reference