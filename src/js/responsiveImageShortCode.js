const Image = require("@11ty/eleventy-img");
const path = require("path");

async function responsiveImage(src, alt) {
    const projectRoot = process.cwd();
    const imagePath =path.join(projectRoot, "_site", src) 
    console.log("图片路径为：" + imagePath);
    
    const metadata = await Image(imagePath, {
      widths: [400, 800, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/img/",
      urlPath: "/img/",
      src: imagePath,

      filenameFormat: (hash, _src, width, format) => {
        
        const ext = path.extname(_src);
        const name = path.basename(_src, ext);
        console.log("格式化后: " + `${name}-${width}w.${format}`);
        return `${name}-${width}w.${format}`;
      }
    });

    const originalUrl = metadata.jpeg[metadata.jpeg.length - 1].url;
    const fixedSrc = originalUrl.replace(/\\/g, "/");

    return `<div class="gallery-item">
      ${Image.generateHTML(metadata, {
        alt,
        sizes: "(min-width: 768px) 50vw, 100vw",
        loading: "lazy",
        decoding: "async",
        class: "thumbnail",
        "data-original": fixedSrc,
      })}
    </div>`;
  };

  module.exports = responsiveImage;