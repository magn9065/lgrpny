function formatMoney(value) {
  return `${Math.round(Number(value || 0)).toLocaleString("da-DK")} kr`;
}

function safeText(value, fallback = "Ukendt") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function formatDateTime() {
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

const PART_EMOJIS = {
  custom_part: "<:Del1:1508229541804507296>",
  suspension: "<:Del2:1508229599950012456>",
  brakes: "<:Del3:1508229651674173450>",
  turbo: "<:Del4:1508229687195865208>",
  engine_tune: "<:Del5:1508229731903082720>",
  armor: "<:Del6:1508229781005533314>",
  transmission: "<:Del7:1508229819698253915>",
  stance_parts: "<:Del9:1508539003702476860>",
  paint: "<:Del8:1508229867328634962>"
};

const PART_NAMES = {
  custom_part: "Customdele",
  suspension: "Affjedringsdele",
  brakes: "Bremsedele",
  turbo: "Turbodele",
  engine_tune: "Motordele",
  armor: "Armordele",
  transmission: "Koblingsdele",
  stance_parts: "Stancedele",
  paint: "Tuner Spraydåse"
};

const PART_ORDER = [
  "custom_part",
  "suspension",
  "brakes",
  "turbo",
  "engine_tune",
  "armor",
  "transmission",
  "stance_parts",
  "paint"
];

function getItemKey(item) {
  return String(item.key || "").trim();
}

function getItemName(item) {
  const key = getItemKey(item);
  return PART_NAMES[key] || safeText(item.display_name || item.name, "Del").replace(/^[A-Z]-/, "");
}

function getItemEmoji(item) {
  return PART_EMOJIS[getItemKey(item)] || "▫️";
}

function buildCleanEmojiEmbed(data) {
  const items = Array.isArray(data.items)
    ? data.items.filter((item) => Number(item.amount || 0) > 0)
    : [];

  const carClass = safeText(data.carClass, "?");
  const total = Number(data.total || 0);
  const dateTime = safeText(data.dateTime, formatDateTime());

  const sortedItems = [...items].sort((a, b) => {
    const aIndex = PART_ORDER.indexOf(getItemKey(a));
    const bIndex = PART_ORDER.indexOf(getItemKey(b));
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  const itemLines = sortedItems.length
    ? sortedItems
        .map((item) => `${getItemEmoji(item)} **${getItemName(item)}** — **${Number(item.amount || 0)}x**`)
        .join("\n")
    : "Ingen dele valgt";

  return {
    username: "Kontordamen",
    embeds: [
      {
        title: "🧾 Ny Faktura",
        color: 10053375,
        description: [
          `🔧 **Klasse:** ${carClass}`,
          `💰 **Total:** ${formatMoney(total)}`,
          `🕒 **Dato & Tid:** ${dateTime}`,
          "",
          itemLines
        ].join("\n"),
        footer: {
          text: "LGRP Ignite"
        }
      }
    ]
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: "Method not allowed" })
    };
  }

  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error("DISCORD_WEBHOOK_URL mangler i Netlify Environment Variables");
    }

    const data = JSON.parse(event.body || "{}");
    const payload = buildCleanEmojiEmbed(data);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Discord svarede ${response.status}: ${text}`);
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error("Discord function fejl:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
