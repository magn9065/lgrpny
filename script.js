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
      "S": "assets/custom_part_S.png",
      "A": "assets/custom_part_A.png",
      "B": "assets/custom_part_B.png",
      "C": "assets/custom_part_C.png",
      "D": "assets/custom_part_D.png"
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
      "S": "assets/engine_tune_S.png",
      "A": "assets/engine_tune_A.png",
      "B": "assets/engine_tune_B.png",
      "C": "assets/engine_tune_C.png",
      "D": "assets/engine_tune_D.png"
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
      "S": "assets/transmission_S.png",
      "A": "assets/transmission_A.png",
      "B": "assets/transmission_B.png",
      "C": "assets/transmission_C.png",
      "D": "assets/transmission_D.png"
    }
  },
  "paint": {
    "baseName": "Tuner Spraydåse",
    "displaySuffix": "",
    "prices": {
      "S": 122,
      "A": 122,
      "B": 122,
      "C": 122,
      "D": 122
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
        total_price: amount * unit
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

function openConfirmModal() {
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
  document.getElementById("invoiceModal").classList.remove("hidden");
  status.textContent = "Faktura klar til godkendelse.";
}

function closeModal() {
  document.getElementById("invoiceModal").classList.add("hidden");
}

async function approveInvoice() {
  const confirmed = confirm("Er du sikker på, at fakturaen skal gemmes? Teksten kopieres automatisk, og alle valg nulstilles bagefter.");

  if (!confirmed) {
    return;
  }

  await saveInvoiceAndReset();
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


function normalizeOcrText(text) {
  return text.replace(/[•·]/g, " ").replace(/[|]/g, "1").replace(/\s+/g, " ").trim();
}

function parseBennysList(rawText) {
  const text = normalizeOcrText(rawText);
  const result = { carClass: null, items: {} };

  const classMatch = text.match(/klasse[:\s]+([SABCD])/i) || text.match(/\b([SABCD])[-\s]*klasse\b/i);
  if (classMatch) result.carClass = classMatch[1].toUpperCase();

  const matchers = [
    { key: "custom_part", patterns: ["custom"] },
    { key: "suspension", patterns: ["affjedring", "affjedrings", "suspension"] },
    { key: "brakes", patterns: ["bremse", "brakes"] },
    { key: "turbo", patterns: ["turbo"] },
    { key: "engine_tune", patterns: ["motor"] },
    { key: "armor", patterns: ["armor"] },
    { key: "transmission", patterns: ["kobling", "koblings", "transmission"] },
    { key: "paint", patterns: ["spray", "spraydåse", "spraydaase", "lakering"] }
  ];

  const segments = text.split(/(?=\b\d+\s*x\b)/i).map(s => s.trim()).filter(Boolean);

  for (const segment of segments) {
    const quantityMatch = segment.match(/\b(\d+)\s*x\b/i);
    if (!quantityMatch) continue;

    const amount = Number(quantityMatch[1]);
    const segmentLower = segment.toLowerCase();

    for (const matcher of matchers) {
      if (matcher.patterns.some(p => segmentLower.includes(p))) {
        result.items[matcher.key] = (result.items[matcher.key] || 0) + amount;

        if (!result.carClass) {
          const itemClassMatch = segment.match(/\b([SABCD])\s*[-–]\s*/i) || segment.match(/\bcustom\s+([SABCD])\b/i);
          if (itemClassMatch) result.carClass = itemClassMatch[1].toUpperCase();
        }
        break;
      }
    }
  }

  // Backup: search full text if OCR removed spacing badly
  for (const matcher of matchers) {
    if (result.items[matcher.key]) continue;
    for (const pattern of matcher.patterns) {
      const regex = new RegExp("(\\d+)\\s*x.{0,35}" + pattern, "i");
      const match = text.match(regex);
      if (match) {
        result.items[matcher.key] = Number(match[1]);
        break;
      }
    }
  }

  return result;
}

function buildScanSummary(parsed) {
  const labels = {
    custom_part: "Customdele",
    suspension: "Affjedringsdele",
    brakes: "Bremsedele",
    turbo: "Turbodele",
    engine_tune: "Motordele",
    armor: "Armordele",
    transmission: "Koblingsdele",
    paint: "Tuner Spraydåse"
  };

  const lines = [parsed.carClass ? `Klasse: ${parsed.carClass}` : "Klasse: Ikke fundet", ""];
  Object.entries(parsed.items).forEach(([key, amount]) => lines.push(`${labels[key] || key}: ${amount}`));
  return lines.join("\n");
}

function applyParsedList(parsed) {
  if (parsed.carClass) {
    document.getElementById("carClass").value = parsed.carClass;
    renderParts();
  }

  Object.keys(PARTS).forEach(key => {
    const input = document.getElementById(`${key}-amount`);
    if (input) input.value = parsed.items[key] || 0;
  });

  updateLinePrices();
}

async function scanBennysList() {
  const status = document.getElementById("status");

  if (!window.Tesseract) {
    status.textContent = "OCR kunne ikke indlæses. Genindlæs siden og prøv igen.";
    return;
  }

  try {
    status.textContent = "Vælg FiveM-vinduet i browserens skærmdeling.";

    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { cursor: "never" },
      audio: false
    });

    const video = document.getElementById("screenVideo");
    const canvas = document.getElementById("screenCanvas");
    video.srcObject = stream;

    await new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play();
        setTimeout(resolve, 800);
      };
    });

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    stream.getTracks().forEach(track => track.stop());

    // Crop center area where the Bennys list is normally shown.
    const cropX = Math.round(canvas.width * 0.34);
    const cropY = Math.round(canvas.height * 0.32);
    const cropW = Math.round(canvas.width * 0.32);
    const cropH = Math.round(canvas.height * 0.32);

    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = cropW * 2;
    cropCanvas.height = cropH * 2;

    const cropCtx = cropCanvas.getContext("2d");
    cropCtx.imageSmoothingEnabled = true;
    cropCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropCanvas.width, cropCanvas.height);

    status.textContent = "Aflæser Bennys indkøbsliste...";

    const result = await Tesseract.recognize(cropCanvas, "dan+eng", {
      logger: progress => {
        if (progress.status === "recognizing text") {
          status.textContent = `Aflæser liste... ${Math.round(progress.progress * 100)}%`;
        }
      }
    });

    const parsed = parseBennysList(result.data.text);
    const foundCount = Object.keys(parsed.items).length;

    if (!parsed.carClass && foundCount === 0) {
      status.textContent = "Kunne ikke finde dele på listen. Prøv igen med FiveM-vinduet valgt.";
      console.log("OCR text:", result.data.text);
      return;
    }

    const ok = confirm(`Fundet fra Bennys liste:\n\n${buildScanSummary(parsed)}\n\nVil du udfylde fakturaen med dette?`);

    if (!ok) {
      status.textContent = "Aflæsning annulleret.";
      return;
    }

    applyParsedList(parsed);
    status.textContent = "Bennys liste aflæst og udfyldt.";
  } catch (error) {
    console.error(error);
    status.textContent = "Aflæsning blev annulleret eller fejlede.";
  }
}


document.getElementById("carClass").addEventListener("change", renderParts);
renderParts();
