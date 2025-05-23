const Image = require("@11ty/eleventy-img");
const path = require("path");

async function responsiveImage(src, alt) {
    const outputPath = process.env.OUTPUT_PATH || "_site";
    const projectRoot = process.cwd();
    const imageSrc =path.join(projectRoot, 'src', src) 
    console.log("图片路径为：" + imageSrc);
    
    const metadata = await Image(imageSrc, {
      widths: [400, 800, 1200],
      formats: ["webp", "jpeg"],
      outputDir: outputPath + "/img/",
      urlPath: "/img/",
      src: imageSrc,

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