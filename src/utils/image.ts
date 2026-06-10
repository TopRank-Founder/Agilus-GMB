export const optimizeGmbImage = (url: string, opts: { width?: number; height?: number } = {}) => {
  if (!url) return url;
  if (url.includes("googleusercontent.com")) {
    const baseUrl = url.split("=")[0];
    const params: string[] = [];
    if (opts.width) params.push(`w${opts.width}`);
    if (opts.height) params.push(`h${opts.height}`);
    if (!opts.width && !opts.height) {
      params.push("s800");
    } else if (opts.width && opts.height) {
      params.push("c");
    }
    params.push("rw"); // Always force WebP format using Google's GMB Edge CDN!
    return `${baseUrl}=${params.join("-")}`;
  }
  return url;
};
