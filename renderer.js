const chargeLevel = document.getElementById("charge-level");
const charge = document.getElementById("charge");
const chargingTimeRef = document.getElementById("charging-time");
const button = document.querySelector("button");

window.onload = () => {
    //For browsers that don't support the battery status API
    if (!navigator.getBattery) {
        alert("Battery Status Api Is Not Supported In Your Browser");
        return false;
    }
};

button.addEventListener("click", (e) => {
    window.electronAPI.openMenu(e.x, e.y);
})

navigator.getBattery().then((battery) => {

    const updateChargingInfo = () => {
        chargingTimeRef.innerText = "";
        if (battery.charging) {
            charge.classList.add("active");
            chargingTimeRef.innerText = "Charging...";
        } else {
            charge.classList.remove("active");
            chargingTimeRef.innerText = "Not Charging";
            //Display time left to discharge only when it is a integer value i.e not infinity
            if (parseInt(battery.dischargingTime)) {
                let hr = parseInt(battery.dischargingTime / 3600);
                let min = parseInt(battery.dischargingTime / 60 - hr * 60);
                chargingTimeRef.innerText = `${hr}hr ${min}mins remaining`;
            }
        }
    }

    //Updating battery level
    const updateLevelInfo = () => {
        let batteryLevel = `${parseInt(battery.level * 100)}%`;
        charge.style.width = batteryLevel;
        chargeLevel.textContent = batteryLevel;
    }

    const updateAllBatteryInfo = () => {
        updateChargingInfo();
        updateLevelInfo();
    }
    updateAllBatteryInfo();

    //When the charging status changes
    battery.addEventListener("chargingchange", () => {
        updateAllBatteryInfo();
    });

    //When the Battery Level Changes
    battery.addEventListener("levelchange", () => {
        updateAllBatteryInfo();
    });
});