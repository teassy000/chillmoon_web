const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const responsiveImage = require("./src/js/responsiveImageShortCode");
const { format } = require("@11ty/eleventy-img/src/adapters/sharp");

module.exports = async function(eleventyConfig) {
  const basePath = process.env.BASE_PATH || "/";
  const outputPath = process.env.OUTPUT_PATH || "_site";

  console.log("当前基础路径为：" + basePath);
  console.log("当前输出路径为：" + outputPath);
  console.log("当前环境变量为：" + JSON.stringify(process.env));
  
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/_data/fonts");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/img");

  // 导入图片处理插件
  eleventyConfig.addAsyncShortcode("responsiveImage", responsiveImage);

	const { I18nPlugin } = await import("@11ty/eleventy");
	eleventyConfig.addPlugin(I18nPlugin, {
        defaultLanguage: "zh",
        locales: ["en", "zh"],
        // Rename the default universal filter names
		filters: {
			// transform a URL with the current page’s locale code
			url: "locale_url",

			// find the other localized content for a specific input file
			links: "locale_links",
		},

		// When to throw errors for missing localized content files
		errorMode: "strict", // throw an error if content is missing at /en/slug
		// errorMode: "allow-fallback", // only throw an error when the content is missing at both /en/slug and /slug
		// errorMode: "never", // don’t throw errors for missing content
    });

  return {
    dir: {
        input: "src",
        includes: "_includes",
        data: "_data",
        output: outputPath,
        formats: ["css", "md", "njk"],
    },
    pathPrefix: basePath
  };
};