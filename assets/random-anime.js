const categorySelect = document.getElementById('anime-category')
const fetchBtn = document.getElementById('anime-btn')
const resultDiv = document.getElementById('anime-result')

fetchBtn.addEventListener('click', fetchRandomAnime)

async function fetchRandomAnime() {
  const category = categorySelect.value

  resultDiv.innerHTML = '<div class="anime-loading"><i class="fas fa-spinner fa-spin"></i><span>加载中...</span></div>'

  try {
    const res = await fetch(`https://api.nekosia.cat/api/v1/images/${category}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()

    const img = new Image()
    img.onload = () => {
      resultDiv.innerHTML = '<div class="anime-image-wrapper"><img id="anime-image" src="' + data.image.compressed.url + '" alt="Random anime image"></div>'
    }
    img.onerror = () => {
      resultDiv.innerHTML = '<div class="anime-error"><i class="fas fa-exclamation-triangle"></i><span>图片加载失败，请重试</span></div>'
    }
    img.src = data.image.compressed.url
  } catch (err) {
    resultDiv.innerHTML = '<div class="anime-error"><i class="fas fa-exclamation-triangle"></i><span>请求失败，请检查网络后重试</span></div>'
  }
}
