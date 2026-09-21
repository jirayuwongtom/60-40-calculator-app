function calculate() {
    const remainingInput = document.getElementById("remaining").value;
    const priceInput = document.getElementById("price").value;
    const remaining = parseFloat(remainingInput);
    const price = priceInput === "" ? 0 : parseFloat(priceInput);
    const warning = document.getElementById("warning");
    const result = document.getElementById("result");
    const maxPurchaseBox = document.getElementById("maxPurchaseBox");

    warning.style.display = "none";
    result.style.display = "none";
    if (maxPurchaseBox) maxPurchaseBox.style.display = "none";
    
    if (isNaN(remaining) || remainingInput === "") {
        return; 
    }

    if (remaining < 0 || price < 0) {
        warning.innerText = "กรุณาใส่จำนวนเงินที่มากกว่าหรือเท่ากับ 0";
        warning.style.display = "block";
        return;
    }

    if (price === 0) {
        if (remaining > 0) {
            const maxPurchase = remaining / 0.6;
            document.getElementById("maxPurchaseAmount").innerText = formatMoney(maxPurchase) + " บาท";
            maxPurchaseBox.style.display = "block";
        } else {
            warning.innerText = "สิทธิ์ของคุณหมดแล้ว (0 บาท)";
            warning.style.display = "block";
        }
        return;
    }

    const government = price * 0.60;
    const user = price * 0.40;
    const after = remaining - government;

    if (government > remaining) {
        warning.innerText = "สิทธิ์ไม่พอสำหรับการซื้อจำนวนนี้";
        warning.style.display = "block";
        return;
    }

    document.getElementById("totalPrice").innerText = formatMoney(price) + " บาท";
    document.getElementById("governmentPay").innerText = formatMoney(government) + " บาท";
    document.getElementById("userPay").innerText = formatMoney(user) + " บาท";
    document.getElementById("remainingAfter").innerText = formatMoney(after) + " บาท";

    result.style.display = "block";

    if (after > 0) {
        const maxPurchase = after / 0.6;
        document.getElementById("maxPurchaseAmount").innerText = formatMoney(maxPurchase) + " บาท";
        maxPurchaseBox.style.display = "block";
    }
}

function formatMoney(number) {
    return number.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function resetCalculator() {
    document.getElementById("remaining").value = "";
    document.getElementById("price").value = "";
    document.getElementById("warning").style.display = "none";
    document.getElementById("result").style.display = "none";
    
    const maxPurchaseBox = document.getElementById("maxPurchaseBox");

    if (maxPurchaseBox) maxPurchaseBox.style.display = "none";

    document.getElementById("remaining").focus();
}
