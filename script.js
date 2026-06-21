const SUPABASE_URL = "https://ntjwefbqjvosqxkmrhyv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_sU621bjh-7CyNA3Rh6HD8Q_vTOKg1kV";

const supabaseClient =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

const MARKUP = 1.25;
const PARTS = {
  "custom_part": {
    "baseName": "Custom",
    "displaySuffix": "dele",
    "prices": {
      "S": 8507,
      "A": 3573,
      "B": 1106,
      "C": 289,
      "D": 148
    },
    "images": {
      "S": "assets/custom_part_s.png",
      "A": "assets/custom_part_a.png",
      "B": "assets/custom_part_b.png",
      "C": "assets/custom_part_c.png",
      "D": "assets/custom_part_d.png"
    }
  },
  "suspension": {
    "baseName": "Affjedrings",
    "displaySuffix": "dele",
    "prices": {
      "S": 14888,
      "A": 6254,
      "B": 1936,
      "C": 506,
      "D": 257
    },
    "images": {
      "S": "assets/suspension_s.png",
      "A": "assets/suspension_a.png",
      "B": "assets/suspension_b.png",
      "C": "assets/suspension_c.png",
      "D": "assets/suspension_d.png"
    }
  },
  "brakes": {
    "baseName": "Bremse",
    "displaySuffix": "dele",
    "prices": {
      "S": 14888,
      "A": 6254,
      "B": 1936,
      "C": 506,
      "D": 257
    },
    "images": {
      "S": "assets/brakes_s.png",
      "A": "assets/brakes_a.png",
      "B": "assets/brakes_b.png",
      "C": "assets/brakes_c.png",
      "D": "assets/brakes_d.png"
    }
  },
  "turbo": {
    "baseName": "Turbo",
    "displaySuffix": "dele",
    "prices": {
      "S": 25523,
      "A": 10719,
      "B": 3318,
      "C": 868,
      "D": 441
    },
    "images": {
      "S": "assets/turbo_s.png",
      "A": "assets/turbo_a.png",
      "B": "assets/turbo_b.png",
      "C": "assets/turbo_c.png",
      "D": "assets/turbo_d.png"
    }
  },
  "engine_tune": {
    "baseName": "Motor",
    "displaySuffix": "dele",
    "prices": {
      "S": 26586,
      "A": 11166,
      "B": 3457,
      "C": 905,
      "D": 458
    },
    "images": {
      "S": "assets/engine_tune_s.png",
      "A": "assets/engine_tune_a.png",
      "B": "assets/engine_tune_b.png",
      "C": "assets/engine_tune_c.png",
      "D": "assets/engine_tune_d.png"
    }
  },
  "armor": {
    "baseName": "Armor",
    "displaySuffix": "dele",
    "prices": {
      "S": 67393,
      "A": 28287,
      "B": 8756,
      "C": 2289,
      "D": 1163
    },
    "images": {
      "S": "assets/armor_s.png",
      "A": "assets/armor_a.png",
      "B": "assets/armor_b.png",
      "C": "assets/armor_c.png",
      "D": "assets/armor_d.png"
    }
  },
  "transmission": {
    "baseName": "Koblings",
    "displaySuffix": "dele",
    "prices": {
      "S": 19142,
      "A": 8039,
      "B": 2489,
      "C": 652,
      "D": 330
    },
    "images": {
      "S": "assets/transmission_s.png",
      "A": "assets/transmission_a.png",
      "B": "assets/transmission_b.png",
      "C": "assets/transmission_c.png",
      "D": "assets/transmission_d.png"
    }
  },
  "stance_parts": {
    "baseName": "Stance",
    "displaySuffix": "dele",
    "prices": {
      "S": 8000,
      "A": 3600,
      "B": 1520,
      "C": 480,
      "D": 240
    },
    "images": {
      "S": "assets/stance_parts_s.png",
      "A": "assets/stance_parts_a.png",
      "B": "assets/stance_parts_b.png",
      "C": "assets/stance_parts_c.png",
      "D": "assets/stance_parts_d.png"
    }
  },
  "paint": {
    "baseName": "Tuner Spraydåse",
    "displaySuffix": "",
    "prices": {
      "S": 3200,
      "A": 1600,
      "B": 800,
      "C": 280,
      "D": 120
    },
    "images": {
      "S": "assets/tuner_spray_can.png",
      "A": "assets/tuner_spray_can.png",
      "B": "assets/tuner_spray_can.png",
      "C": "assets/tuner_spray_can.png",
      "D": "assets/tuner_spray_can.png"
    }
  }
};

function money(value) {
  return `${Math.round(value).toLocaleString("da-DK")} kr.`;
}

function getDisplayName(key, carClass) {
  const part = PARTS[key];
  if (key === "paint") return part.baseName;
  return `${carClass}-${part.baseName}${part.displaySuffix}`;
}

function getInvoiceName(key, carClass) {
  const part = PARTS[key];
  if (key === "paint") return part.baseName;
  return `${carClass}-${part.baseName}del`;
}

function unitPrice(key, carClass) {
  return Math.round(PARTS[key].prices[carClass] * MARKUP);
}

function renderParts() {
  const container = document.getElementById("parts");
  const carClass = document.getElementById("carClass").value;

  document.getElementById("partsTitle").textContent = `${carClass}-Klasse dele`;
  container.innerHTML = "";

  Object.entries(PARTS).forEach(([key, part]) => {
    const card = document.createElement("article");
    card.className = "part-card";
    card.innerHTML = `
      <div class="part-title">${getDisplayName(key, carClass)}</div>
      <img class="part-image" src="${part.images[carClass]}" alt="${getDisplayName(key, carClass)}" />
      <div class="part-meta">${money(unitPrice(key, carClass))} pr. stk.</div>
      <div class="qty">
        <button type="button" onclick="changeAmount('${key}', -1)">−</button>
        <input id="${key}-amount" type="number" min="0" value="0" oninput="updateLinePrices()" />
        <button type="button" onclick="changeAmount('${key}', 1)">+</button>
      </div>
      <div class="line-price" id="${key}-line">0 kr.</div>
    `;
    container.appendChild(card);
  });

  updateLinePrices();
}

function changeAmount(key, delta) {
  const input = document.getElementById(`${key}-amount`);
  input.value = Math.max(0, Number(input.value || 0) + delta);
  updateLinePrices();
}

function getItems() {
  const carClass = document.getElementById("carClass").value;

  return Object.entries(PARTS)
    .map(([key]) => {
      const amount = Number(document.getElementById(`${key}-amount`)?.value || 0);
      const unit = unitPrice(key, carClass);

      return {
        key,
        name: getInvoiceName(key, carClass),
        display_name: getDisplayName(key, carClass),
        car_class: carClass,
        amount,
        unit_price: unit,
        total_price: amount * unit,
        image: PARTS[key].images[carClass]
      };
    })
    .filter(item => item.amount > 0);
}

function updateLinePrices() {
  const carClass = document.getElementById("carClass").value;
  const items = getItems();

  Object.keys(PARTS).forEach(key => {
    const amount = Number(document.getElementById(`${key}-amount`)?.value || 0);
    const line = amount * unitPrice(key, carClass);
    const el = document.getElementById(`${key}-line`);
    if (el) el.textContent = money(line);
  });

  const total = items.reduce((sum, item) => sum + item.total_price, 0);
  document.getElementById("totalPrice").textContent = money(total);
  document.getElementById("modalTotalPrice").textContent = money(total);
}

function buildInvoiceText(items) {
  return items.map(item => `${item.amount}x ${item.name}`).join(", ");
}

async function openConfirmModal() {
  const items = getItems();
  const status = document.getElementById("status");

  if (items.length === 0) {
    status.textContent = "Vælg mindst én del først.";
    return;
  }

  const invoiceText = buildInvoiceText(items);
  const total = items.reduce((sum, item) => sum + item.total_price, 0);

  document.getElementById("invoiceText").value = invoiceText;
  document.getElementById("modalTotalPrice").textContent = money(total);

  status.textContent = "Sender Discord-log...";
  await sendDiscordInvoiceLog(items, total, document.getElementById("carClass").value);

  resetSaveButton();
  document.getElementById("invoiceModal").classList.remove("hidden");
  status.textContent = "Discord-log sendt. Faktura klar til gem/kopi.";
}

let saveConfirmPending = false;

function resetSaveButton() {
  saveConfirmPending = false;
  const saveButton = document.getElementById("saveInvoiceBtn");
  if (saveButton) {
    saveButton.textContent = "Gem faktura";
    saveButton.classList.remove("confirming");
  }
}

function closeModal() {
  document.getElementById("invoiceModal").classList.add("hidden");
  resetSaveButton();
}

async function approveInvoice() {
  const saveButton = document.getElementById("saveInvoiceBtn");
  const status = document.getElementById("status");

  if (!saveConfirmPending) {
    saveConfirmPending = true;
    if (saveButton) {
      saveButton.textContent = "Sikker?";
      saveButton.classList.add("confirming");
    }
    status.textContent = "Tryk på Sikker? for at gemme fakturaen.";
    return;
  }

  if (saveButton) {
    saveButton.disabled = true;
    saveButton.textContent = "Gemmer...";
  }

  await saveInvoiceAndReset();

  if (saveButton) {
    saveButton.disabled = false;
  }
}

function formatInvoiceDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString("da-DK", {
    timeZone: "Europe/Copenhagen",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  const time = now.toLocaleTimeString("da-DK", {
    timeZone: "Europe/Copenhagen",
    hour: "2-digit",
    minute: "2-digit"
  });
  return `${date} - ${time}`;
}

function loadCanvasImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function cleanDiscordItemName(item, carClass) {
  return String(item.display_name || item.name || "Del")
    .replace(`${carClass}-`, "")
    .replace("Motordele", "Motorblokke");
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawRoundedImage(ctx, img, x, y, size, radius) {
  ctx.save();
  roundRect(ctx, x, y, size, size, radius);
  ctx.clip();

  if (img) {
    const scale = Math.max(size / img.width, size / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    ctx.drawImage(img, x + (size - w) / 2, y + (size - h) / 2, w, h);
  } else {
    ctx.fillStyle = "#20242d";
    ctx.fillRect(x, y, size, size);
    ctx.fillStyle = "#8b5cf6";
    ctx.font = "700 34px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("?", x + size / 2, y + size / 2);
  }

  ctx.restore();
}

async function createDiscordInvoiceImage(items, total, carClass, dateTime) {
  const compactItems = items.filter(item => Number(item.amount || 0) > 0);
  const rowHeight = 104;
  const width = 900;
  const height = Math.max(520, 340 + compactItems.length * rowHeight);
  const scale = 2;

  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#151922");
  gradient.addColorStop(1, "#0b0d12");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#8b5cf6";
  ctx.fillRect(0, 0, 8, height);

  ctx.fillStyle = "rgba(255,255,255,0.035)";
  roundRect(ctx, 18, 18, width - 36, height - 36, 18);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 42px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("🧾 Ny Faktura", 62, 72);

  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(54, 122);
  ctx.lineTo(width - 54, 122);
  ctx.stroke();

  ctx.font = "400 30px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("🔧 Klasse:", 62, 172);

  ctx.fillStyle = "rgba(139,92,246,0.28)";
  roundRect(ctx, 232, 143, 56, 56, 10);
  ctx.fill();
  ctx.fillStyle = "#a78bfa";
  ctx.font = "700 34px Arial";
  ctx.textAlign = "center";
  ctx.fillText(carClass, 260, 172);
  ctx.textAlign = "left";

  ctx.fillStyle = "#ffffff";
  ctx.font = "400 30px Arial";
  ctx.fillText("💰 Total:", 62, 224);
  ctx.fillStyle = "#7ee787";
  ctx.font = "700 31px Arial";
  ctx.fillText(money(total).replace(" kr.", " kr"), 232, 224);

  ctx.fillStyle = "#ffffff";
  ctx.font = "400 30px Arial";
  ctx.fillText("🕒 Dato & Tid:", 62, 276);
  ctx.font = "400 29px Arial";
  ctx.fillText(dateTime, 290, 276);

  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(54, 324);
  ctx.lineTo(width - 54, 324);
  ctx.stroke();

  const loaded = await Promise.all(compactItems.map(item => loadCanvasImage(item.image)));

  compactItems.forEach((item, index) => {
    const y = 356 + index * rowHeight;
    const img = loaded[index];

    drawRoundedImage(ctx, img, 62, y - 28, 78, 14);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 28px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(cleanDiscordItemName(item, carClass), 172, y + 11);

    const badgeW = 86;
    const badgeH = 54;
    const badgeX = width - 62 - badgeW;
    const badgeY = y - 16;
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 14);
    ctx.fill();
    ctx.fillStyle = "#a78bfa";
    ctx.font = "700 30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${item.amount}x`, badgeX + badgeW / 2, badgeY + badgeH / 2 + 1);
  });

  return canvas.toDataURL("image/png", 0.92);
}


async function sendDiscordInvoiceLog(items, total, carClass) {
  const status = document.getElementById("status");
  const invoiceText = buildInvoiceText(items);
  const dateTime = formatInvoiceDateTime();

  try {
    const discordResponse = await fetch("/.netlify/functions/send-discord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        carClass,
        total,
        invoiceText,
        items,
        dateTime
      })
    });

    if (!discordResponse.ok) {
      const discordErrorText = await discordResponse.text();
      console.error("Discord webhook fejl:", discordErrorText);
      if (status) status.textContent = "Faktura klar, men Discord-log fejlede. Tjek Netlify Function Logs.";
      return false;
    }

    return true;
  } catch (discordError) {
    console.error("Discord webhook fejl:", discordError);
    if (status) status.textContent = "Faktura klar, men Discord-log fejlede. Tjek Netlify Function Logs.";
    return false;
  }
}

async function saveInvoiceAndReset() {
  const items = getItems();
  const carClass = document.getElementById("carClass").value;
  const status = document.getElementById("status");

  if (items.length === 0) {
    status.textContent = "Vælg mindst én del først.";
    closeModal();
    return;
  }

  const invoiceText = buildInvoiceText(items);
  const total = items.reduce((sum, item) => sum + item.total_price, 0);

  document.getElementById("invoiceText").value = invoiceText;
  document.getElementById("totalPrice").textContent = money(total);
  document.getElementById("modalTotalPrice").textContent = money(total);

  if (supabaseClient) {
    const { data: order, error: orderError } = await supabaseClient
      .from("tuner_orders")
      .insert({
        mechanic: "",
        plate: "",
        car_class: carClass,
        invoice_text: invoiceText,
        total_price: total
      })
      .select()
      .single();

    if (orderError) {
      status.textContent = "Faktura lavet, men kunne ikke gemmes i Supabase.";
      console.error(orderError);
      return;
    }

    const rows = items.map(item => ({
      order_id: order.id,
      part_key: item.key,
      part_name: item.name,
      car_class: item.car_class,
      amount: item.amount,
      unit_price: item.unit_price,
      total_price: item.total_price
    }));

    const { error: itemError } = await supabaseClient
      .from("tuner_order_items")
      .insert(rows);

    if (itemError) {
      status.textContent = "Faktura gemt, men dele kunne ikke gemmes.";
      console.error(itemError);
      return;
    }
  }


  try {
    await navigator.clipboard.writeText(invoiceText);
    status.textContent = "Faktura gemt, tekst kopieret og valg nulstillet.";
  } catch (error) {
    status.textContent = "Faktura gemt og valg nulstillet, men teksten kunne ikke kopieres automatisk.";
    console.error(error);
  }

  resetForm("Faktura gemt, tekst kopieret og valg nulstillet.");
}
async function copyInvoice() {
  const text = document.getElementById("invoiceText").value;
  const status = document.getElementById("status");

  if (!text) {
    status.textContent = "Lav en faktura før du kopierer.";
    return;
  }

  await navigator.clipboard.writeText(text);
  status.textContent = "Faktura tekst kopieret.";
}

function resetForm(message = "Klar til ny faktura.") {
  Object.keys(PARTS).forEach(key => {
    const input = document.getElementById(`${key}-amount`);
    if (input) input.value = 0;
  });

  document.getElementById("invoiceText").value = "";
  document.getElementById("status").textContent = message;
  closeModal();
  updateLinePrices();
}

document.getElementById("carClass").addEventListener("change", renderParts);
renderParts();
