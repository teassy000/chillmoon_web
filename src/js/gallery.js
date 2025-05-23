document.addEventListener('DOMContentLoaded', () => {
    // 仅查找画廊容器内的缩略图
    const gallery = document.querySelector('.gallery-container');
    if (!gallery) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
  
    gallery.querySelectorAll('.thumbnail').forEach(img => {
      img.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = img.dataset.original;
        console.log("点击了缩略图，原始链接为：" + img.dataset.original);
      });
    });

    lightboxImg.onload = () => {
        console.log('图片加载成功');
        lightboxImg.style.opacity = 1;
    };
    lightboxImg.onerror = () => {
        console.error('图片加载失败:', lightboxImg.src);
        lightboxImg.alt = '图片加载失败，请检查路径';
    };

    closeBtn.onclick = () => lightbox.style.display = 'none';
    lightbox.onclick = (e) => {
        if (e.target !== lightboxImg) lightbox.style.display = 'none';
    };
});