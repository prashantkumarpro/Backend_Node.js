const form = document.querySelector('form')
const progress = document.querySelector('p')

form.addEventListener('submit', e => {
  e.preventDefault()
  
  const formData = new FormData(form)
  formData.append("parendDirId", "aslfjdslfjs")
  const xhr = new XMLHttpRequest()

  xhr.open('POST', 'http://localhost:4000/upload')
  xhr.responseType = 'json'

  xhr.onload = () => {
    console.log(xhr.response)
  }

  xhr.upload.onprogress = e => {
    if (e.lengthComputable && progress) {
      const percent = (e.loaded / e.total) * 100
      progress.textContent = percent.toFixed(2) + '%'
    }
  }

  xhr.send(formData)
})
