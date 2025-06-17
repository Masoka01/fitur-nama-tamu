function generateLink() {
  const baseUrl = document.getElementById("baseUrlInput").value.trim();
  const name = document.getElementById("nameInput").value.trim();
  const eventType = document.getElementById("eventType").value;
  const ayah = document.getElementById("ayahInput").value.trim();
  const ibu = document.getElementById("ibuInput").value.trim();

  if (!baseUrl) {
    document.getElementById("linkOutput").textContent =
      "Silakan masukkan URL undangan.";
    hideOptionalButtons();
    return;
  }

  try {
    const domainName = new URL(baseUrl).hostname.split(".")[0];
    let formattedName = domainName.includes("-")
      ? domainName.split("-").slice(0, 2).map(capitalizeFirstLetter).join(" & ")
      : capitalizeFirstLetter(domainName.split("-")[0]);

    const encodedName = encodeURIComponent(name).replace(/%0A/g, "%0A");
    const singleLineName = name.replace(/\n/g, " ");
    const fullLink = `${baseUrl}?p=${encodedName}`;

    let invitationText = "";

    if (eventType === "wedding") {
      invitationText = `
Assalamu'alaikum Warahmatullahi Wabarakatuh,

Dengan penuh rasa syukur dan kebahagiaan, kami mengundang ${singleLineName} untuk menghadiri acara pernikahan kami.

Detail acara dapat dilihat melalui tautan berikut:

${fullLink}

Kehadiran dan doa restu anda sangat berarti bagi kami.

Hormat kami,
${formattedName}

Wassalamu'alaikum Warahmatullahi Wabarakatuh.
      `.trim();
    } else if (eventType === "khitan") {
      invitationText = `
Assalamu'alaikum Warahmatullahi Wabarakatuh,

Dengan memohon rahmat dan ridho Allah SWT, kami mengundang ${singleLineName} untuk hadir dalam acara khitanan putra kami.

Detail acara dapat dilihat melalui tautan berikut:

${fullLink}

Merupakan suatu kehormatan dan kebahagiaan bagi kami atas kehadiran dan doa restu Anda.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.

Hormat kami,
Bapak ${ayah}
Ibu ${ibu}
      `.trim();
    } else if (eventType === "universal") {
      invitationText = `
Salam Sejahtera,

Dengan penuh suka cita, kami mengundang ${singleLineName} untuk hadir dalam acara spesial kami.

Detail acara dapat dilihat melalui tautan berikut:

${fullLink}

Merupakan kebahagiaan tersendiri bagi kami apabila Anda berkenan hadir dan memberikan doa restu.

Hormat kami,
${formattedName}
      `.trim();
    }

    const linkOutput = document.getElementById("linkOutput");
    linkOutput.textContent = invitationText;
    linkOutput.style.textAlign = "left";
    linkOutput.style.whiteSpace = "pre-wrap";
    linkOutput.style.lineHeight = "1.6";

    showOptionalButtons();
  } catch (error) {
    document.getElementById("linkOutput").textContent =
      "URL tidak valid. Silakan masukkan URL yang benar.";
    hideOptionalButtons();
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function toggleParentInput() {
  const eventType = document.getElementById("eventType").value;
  const container = document.getElementById("parentInputContainer");
  container.style.display = eventType === "khitan" ? "block" : "none";
}

function copyToClipboard() {
  const invitationText = document.getElementById("linkOutput").textContent;
  navigator.clipboard
    .writeText(invitationText)
    .then(() => {
      showNotification("Sudah disalin ke clipboard!");
      document.getElementById("nameInput").value = "";
      document.getElementById("linkOutput").textContent = "";
      hideOptionalButtons();
    })
    .catch((err) => {
      showNotification("Gagal menyalin teks. Silakan coba lagi.");
      console.error("Clipboard write error: ", err);
    });
}

function sendViaWhatsApp() {
  const text = document.getElementById("linkOutput").textContent;
  const encodedText = encodeURIComponent(text);
  const waUrl = `https://wa.me/?text=${encodedText}`;
  window.open(waUrl, "_blank");

  document.getElementById("nameInput").value = "";
  document.getElementById("linkOutput").textContent = "";
  hideOptionalButtons();
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

function showOptionalButtons() {
  document.getElementById("waButton").disabled = false;
  document.getElementById("copyButton").disabled = false;
  document.getElementById("extraButtons").style.display = "flex";
  document.getElementById("copyButton").style.display = "flex";
}

function hideOptionalButtons() {
  document.getElementById("waButton").disabled = true;
  document.getElementById("copyButton").disabled = true;
  document.getElementById("extraButtons").style.display = "none";
  document.getElementById("copyButton").style.display = "none";
}

document
  .getElementById("copyButton")
  .addEventListener("click", copyToClipboard);
