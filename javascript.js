const audio = document.getElementById("backgroundAudio");
const audioControlBtn = document.getElementById("audioControlBtn");
const audioIcon = document.getElementById("audioIcon");

audioControlBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    audioIcon.classList.remove("bi-play-fill");
    audioIcon.classList.add("bi-pause-fill");
  } else {
    audio.pause();
    audioIcon.classList.remove("bi-pause-fill");
    audioIcon.classList.add("bi-play-fill");
  }
});

function generateLink() {
  const baseUrl = document.getElementById("baseUrlInput").value.trim();
  const name = document.getElementById("nameInput").value.trim();

  if (baseUrl) {
    try {
      const domainName = new URL(baseUrl).hostname.split(".")[0];
      let formattedName = domainName.includes("-")
        ? domainName
            .split("-")
            .map((part) => capitalizeFirstLetter(part))
            .join(" & ")
        : capitalizeFirstLetter(domainName);

      // Encode nama dengan baris baru untuk URL
      const encodedName = encodeURIComponent(name).replace(/%0A/g, "%0A");

      // Gabungkan nama menjadi satu baris untuk undangan
      const singleLineName = name.replace(/\n/g, " ");
      const fullLink = `${baseUrl}?p=${encodedName}`;

      const invitationText = `
Assalamu’alaikum Warahmatullahi Wabarakatuh,

Dengan penuh rasa syukur dan kebahagiaan, kami mengundang ${singleLineName} untuk menghadiri acara pernikahan kami.

Detail acara dapat dilihat melalui tautan berikut:

${fullLink}

Kehadiran dan doa restu anda sangat berarti bagi kami.

Hormat kami,
${formattedName}

Wassalamu’alaikum Warahmatullahi Wabarakatuh.
      `.trim();

      const linkOutput = document.getElementById("linkOutput");
      linkOutput.textContent = invitationText;
      linkOutput.style.textAlign = "left";
      linkOutput.style.whiteSpace = "pre-wrap";
      linkOutput.style.lineHeight = "1.6";

      document.getElementById("copyButton").style.display = "inline-block";
    } catch (error) {
      const linkOutput = document.getElementById("linkOutput");
      linkOutput.textContent =
        "URL tidak valid. Silakan masukkan URL yang benar.";
      document.getElementById("copyButton").style.display = "none";
    }
  } else {
    const linkOutput = document.getElementById("linkOutput");
    linkOutput.textContent = "Silakan masukkan URL undangan.";
    document.getElementById("copyButton").style.display = "none";
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function copyToClipboard() {
  const linkOutput = document.getElementById("linkOutput").textContent;
  navigator.clipboard
    .writeText(linkOutput)
    .then(() => {
      showNotification("Sudah disalin ke clipboard!");

      // Kosongkan kolom input untuk nama tamu
      document.getElementById("nameInput").value = "";

      // Hapus output link
      document.getElementById("linkOutput").textContent = "";

      // Sembunyikan tombol salin
      document.getElementById("copyButton").style.display = "none";
    })
    .catch((err) => {
      showNotification("Gagal menyalin teks. Silakan coba lagi.");
      console.error("Clipboard write error: ", err);
    });
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.bottom = "15rem";
  notification.style.left = "50%";
  notification.style.transform = "translateX(-50%)";
  notification.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  notification.style.color = "white";
  notification.style.padding = "10px 20px";
  notification.style.borderRadius = "5px";
  notification.style.opacity = "1";
  notification.style.transition = "opacity 0.5s ease";
  notification.style.zIndex = "999";

  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 2000);
}

document
  .getElementById("copyButton")
  .addEventListener("click", copyToClipboard);

let heartCount = 0;
const maxHearts = 10; // Batas maksimal heart di layar

function createHeart() {
  if (heartCount >= maxHearts) return; // Stop jika sudah mencapai batas

  const heart = document.createElement("div");
  heart.classList.add("heart");
  document.body.appendChild(heart);
  heartCount++; // Tambah jumlah heart

  const randomLeft = Math.random() * window.innerWidth;
  const randomDuration = Math.random() * 3 + 2;
  const randomColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
  const randomSize = Math.random() * 8 + 8; // Ukuran lebih kecil (8px - 16px)

  heart.style.left = `${randomLeft}px`;
  heart.style.animationDuration = `${randomDuration}s`;
  heart.style.width = `${randomSize}px`;
  heart.style.height = `${randomSize}px`;

  heart.style.backgroundColor = randomColor;
  heart.style.boxShadow = `0 0 5px 2px ${randomColor}`; // Shadow lebih ringan

  setTimeout(() => {
    heart.remove();
    heartCount--; // Kurangi jumlah heart saat dihapus
  }, randomDuration * 1000);
}

setInterval(createHeart, 500); // Interval lebih lama (500ms)
