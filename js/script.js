function calculate() {
    const monthlyElem = document.getElementById("monthlyRemaining");
    const dailyElem = document.getElementById("dailyRemaining");
    const priceElem = document.getElementById("price");

    [monthlyElem, dailyElem, priceElem].forEach(elem => {
        if (elem.value.includes('.')) {
            let parts = elem.value.split('.');
    
            if (parts[1].length > 2) {
                elem.value = parts[0] + '.' + parts[1].substring(0, 2);
            }
        }
    });

    if (parseFloat(monthlyElem.value) > 1000) monthlyElem.value = 1000;
    if (parseFloat(dailyElem.value) > 200) dailyElem.value = 200;
  


    const monthlyInput = monthlyElem.value;
    const dailyInput = dailyElem.value;
    const priceInput = priceElem.value;

    const monthlyRemaining = parseFloat(monthlyInput);

    const dailyRemaining = dailyInput === "" ? 200 : parseFloat(dailyInput);
    const price = priceInput === "" ? 0 : parseFloat(priceInput);

    const warning = document.getElementById("warning");
    const result = document.getElementById("result");
    const maxPurchaseBox = document.getElementById("maxPurchaseBox");

    warning.style.display = "none";
    result.style.display = "none";
    if (maxPurchaseBox) maxPurchaseBox.style.display = "none";
    

    if (isNaN(monthlyRemaining) || monthlyInput === "") {
        return; 
    }


    if (monthlyRemaining < 0 || dailyRemaining < 0 || price < 0) {
        warning.innerText = "กรุณาใส่จำนวนเงินที่มากกว่าหรือเท่ากับ 0";
        warning.style.display = "block";
        return;
    }

    if (dailyRemaining > monthlyRemaining) {
        warning.innerText = "สิทธิ์วันนี้ ต้องไม่มากกว่า สิทธิ์ทั้งเดือนที่เหลืออยู่";
        warning.style.display = "block";
        return;
    }

    const availableSubsidy = Math.min(monthlyRemaining, dailyRemaining);

    if (price === 0) {
        if (monthlyRemaining > 0) {
            const maxToday = availableSubsidy / 0.6;
            const maxTotal = monthlyRemaining / 0.6;

            let html = `<div style="margin-bottom: ${maxTotal > maxToday ? '15px' : '0'};">
                ซื้อได้อีกสูงสุด <strong>เฉพาะวันนี้</strong><br>
                <strong style="color: #2563eb; font-size: 24px; display: block; margin-top: 5px;">${formatMoney(maxToday)} บาท</strong>
            </div>`;

            if (maxTotal > maxToday) {
                html += `<div style="border-top: 1px dashed #ccc; padding-top: 15px;">
                    ยอดซื้อเพื่อใช้สิทธิ์ <strong>ทั้งเดือน</strong> ให้หมดพอดี<br>
                    <span style="font-size: 13px; color: #777;">(ต้องแบ่งสแกนวันอื่นด้วย)</span>
                    <strong style="color: #7e22ce; font-size: 24px; display: block; margin-top: 5px;">${formatMoney(maxTotal)} บาท</strong>
                </div>`;
            }

            maxPurchaseBox.innerHTML = html;
            maxPurchaseBox.style.display = "block";
        } else {
            warning.innerText = "สิทธิ์ของคุณหมดแล้ว (0 บาท)";
            warning.style.display = "block";
        }
        return;
    }

    let government = price * 0.60;

    if (government > availableSubsidy) {
        government = availableSubsidy; 
        warning.innerText = `เกินโควตา! รัฐจะช่วยสูงสุดที่ ${formatMoney(availableSubsidy)} บาท ส่วนต่างคุณต้องจ่ายเองทั้งหมด`;
        warning.style.display = "block";
    }

    const user = price - government;
    const newMonthly = monthlyRemaining - government;
    const newDaily = dailyRemaining - government;

    document.getElementById("totalPrice").innerText = formatMoney(price) + " บาท";
    document.getElementById("governmentPay").innerText = formatMoney(government) + " บาท";
    document.getElementById("userPay").innerText = formatMoney(user) + " บาท";
    document.getElementById("remainingDailyAfter").innerText = formatMoney(newDaily) + " บาท";
    document.getElementById("remainingMonthlyAfter").innerText = formatMoney(newMonthly) + " บาท";

    result.style.display = "block";

    if (newMonthly > 0) {
        const nextAvailable = Math.min(newMonthly, newDaily);
        const maxToday = nextAvailable / 0.6;
        const maxTotal = newMonthly / 0.6;

        let html = "";
        if (nextAvailable > 0) {
            html += `<div style="margin-bottom: ${maxTotal > maxToday ? '15px' : '0'};">
                สแกนครั้งต่อไปได้สูงสุด <strong>ในวันนี้</strong><br>
                <strong style="color: #2563eb; font-size: 24px; display: block; margin-top: 5px;">${formatMoney(maxToday)} บาท</strong>
            </div>`;
        }
        
        if (maxTotal > maxToday && maxTotal > 0) {
            html += `<div style="${nextAvailable > 0 ? 'border-top: 1px dashed #ccc; padding-top: 15px;' : ''}">
                ยอดซื้อเพื่อใช้สิทธิ์ <strong>ทั้งเดือน</strong> ให้หมดพอดี<br>
                <strong style="color: #7e22ce; font-size: 24px; display: block; margin-top: 5px;">${formatMoney(maxTotal)} บาท</strong>
            </div>`;
        }

        if (html !== "") {
            maxPurchaseBox.innerHTML = html;
            maxPurchaseBox.style.display = "block";
        }
    }
}

function formatMoney(number) {
    return number.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function resetCalculator() {
    document.getElementById("monthlyRemaining").value = "";
    document.getElementById("dailyRemaining").value = "";
    document.getElementById("price").value = "";
    document.getElementById("warning").style.display = "none";
    document.getElementById("result").style.display = "none";
    
    const maxPurchaseBox = document.getElementById("maxPurchaseBox");
    if (maxPurchaseBox) maxPurchaseBox.style.display = "none";

    document.getElementById("monthlyRemaining").focus();
}