import beautify from "beautify";

export function beautify_html(html) {
  return beautify(html, {format: "html"})
}

export function canvas_image(canvas) {
  return Buffer.from(canvas.toDataURL().replace(/^data:image\/\w+;base64,/, ""), "base64")
}
