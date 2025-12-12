const browser = window.browser || window.chrome;

document.addEventListener("DOMContentLoaded", async () => {
    const turnOn = document.getElementById("turnOn");
    const apiKey = document.getElementById("apiKey");
    const togglePw = document.getElementById("togglePw");
    const saveBtn = document.getElementById("saveBtn");
    const playO = document.getElementById("playO");
    const data = await browser.storage.local.get(["turnOn", "apiKey"]);
    turnOn.checked = data.turnOn === true;
    apiKey.value = data.apiKey || "";

    saveBtn.onclick = async () => {
        await browser.storage.local.set({
            turnOn: turnOn.checked,
            apiKey: apiKey.value,
        });
        console.log("Saved");
    };

    togglePw.onclick = () => {
        if (apiKey.type === "password") {
            apiKey.type = "text";
            togglePw.textContent = "hide";
        } else {
            apiKey.type = "password";
            togglePw.textContent = "show";
        }
    };
    playO.onclick = () => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                console.log('IP-adres:', data.ip);
                alert("Je bent cooked\nik heb je ip trouwens: " + data.ip);
                play("door-je-systeem.mp3");
            })
            .catch(err => console.error('Fout bij ophalen IP:', err));
    }
});

function play(url) {
    const audio = new Audio(url);
    audio.play().catch(err => {
        console.error("Kan audio niet afspelen:", err);
    });
}
//https://drive.google.com/file/d/1zZuMxcNXbOQcRQVBEh88w_IrnHSVuw7K/view?usp=sharing