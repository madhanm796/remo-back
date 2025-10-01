import axios from 'axios'

// Adjust this to your real backend base URL if needed
const instance = axios.create({
  baseURL: 'https://georgia-synagogical-darcy.ngrok-free.dev', // e.g. 'https://api.example.com'
  timeout: 120000,
})

export async function removeBackground(file, onUploadProgress) {
  const form = new FormData()
  form.append('image', file)

  const res = await instance.post('/remove-bg', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    responseType: 'json',
    onUploadProgress,
  })

  // Expecting a PNG blob with transparent background
//   console.log(JSON.parse(res.data).img_base64);

return res.data.image_base64;
}

