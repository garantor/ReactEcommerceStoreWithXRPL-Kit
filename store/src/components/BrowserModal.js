

export default function openPopWindow(url, height, width) {
  console.log("thius is is it ", url)
  // Remove the `http://localhost:3000/` part of the URL.
  const absoluteUrl = new URL(url, window.location.href).toString();
  const newWindow = window.open(absoluteUrl, "Sign Xumm", "height=" + height + ",width=" + width);

  newWindow.addEventListener("message", (event) => {
    console.log(event.data);
  });
}