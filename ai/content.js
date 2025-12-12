const browser = window.browser || window.chrome;

console.log("js loaded");

(async () => {
  try {
    const data = await browser.storage.local.get(["turnOn", "apiKey"]);
    console.log("Storage data:", data);

    if (data.turnOn !== true) {
      console.log("TurnOn is not true, stopping execution.");
      return;
    }

    if (!data.apiKey) {
      alert("No API key found, click on the extension to enter API key");
      console.log("No API key");
      return;
    }

    console.log("🟢-◻️-◻️-◻️");
    await new Promise((r) => setTimeout(r, 1000));

    const pageText = document.body.innerText;
    console.log("🟢_🟢_◻️_◻️");

    const result = await mistral_ai(pageText, data.apiKey);

    console.log("🟢_🟢_🟢_◻️");
    await navigator.clipboard.writeText(result);

    console.log("🟢_🟢_🟢_🟢");
  } catch (err) {
    console.error("Error:", err);
    console.log("🔴_🔴_🔴_🔴");
  }

  async function mistral_ai(text, apiKey) {
    try {
      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral-big",
          messages: [
            {
              role: "user",
              content: `Geef me een kort antwoord voor elk van de vragen met 2 enters ertussen, simpel en kort in makkelijke taal: ${text}`,
            },
          ],
          max_tokens: 5000,
          temperature: 0.5  
        }),
      });

      if (!response.ok) {
        console.log("🔴_🔴_◻️_◻️");
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (err) {
      console.error("Fout in mistral_ai:", err);
      console.log("🔴_🔴_🔴_◻️");
      throw err;
    }
  }
})();
