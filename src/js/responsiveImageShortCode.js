const Image = require("@11ty/eleventy-img");
const path = require("path");

async function responsiveImage(src, alt) {

    const projectRoot = process.cwd();
    const imageSrc =path.join(projectRoot, 'src', src) 
    console.log("源图片路径为：" + imageSrc);
    
    const outputPath = process.env.OUTPUT_PATH || "_site";
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

    const basePath = process.env.BASE_PATH || "/";
    const fixedSrc = path.join( basePath,originalUrl.replace(/\\/g, "/"));
    console.log("生成图片链接为：" + fixedSrc);

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