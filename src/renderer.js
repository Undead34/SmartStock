import "./index.css"
import "./app.jsx"

document.addEventListener("click", function (event) {
  if (event.target.tagName === "A" && event.target.href.startsWith('http')) {
    const url = new URL(event.target.href);
    if (url.origin !== this.location.origin) {
      event.preventDefault()
      window.SmartStock.send("smartstock:open-external", event.target.href)
    }
  }
})