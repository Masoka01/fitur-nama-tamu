function generateLink() {
  const baseUrl = document.getElementById("baseUrlInput").value.trim();
  const name = document.getElementById("nameInput").value.trim();

  if (baseUrl) {
    try {
      const domainName = new URL(baseUrl).hostname.split(".")[0];
      let formattedName = domainName.includes("-")
        ? domainName
            .split("-")
            .slice(0, 2) // Ambil hanya 2 bagian pertama
            .map((part) => capitalizeFirstLetter(part))
            .join(" & ")
        : capitalizeFirstLetter(domainName.split("-")[0]); // Ambil hanya bagian pertama

      // Encode nama dengan baris baru untuk URL
      const encodedName = encodeURIComponent(name).replace(/%0A/g, "%0A");

      // Gabungkan nama menjadi satu baris untuk undangan
      const singleLineName = name.replace(/\n/g, " ");
      const fullLink = `${baseUrl}?p=${encodedName}`;

      const invitationText = `
Assalamu'alaikum Warahmatullahi Wabarakatuh,

Dengan penuh rasa syukur dan kebahagiaan, kami mengundang ${singleLineName} untuk menghadiri acara pernikahan kami.

Detail acara dapat dilihat melalui tautan berikut:

${fullLink}

Kehadiran dan doa restu anda sangat berarti bagi kami.

Hormat kami,
${formattedName}

Wassalamu'alaikum Warahmatullahi Wabarakatuh.
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
