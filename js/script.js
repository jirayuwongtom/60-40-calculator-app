function calculate() {
    const remaining = parseFloat(document.getElementById("remaining").value);
    const price = parseFloat(document.getElementById("price").value);

    const warning = document.getElementById("warning");
    const result = document.getElementById("result");

    warning.style.display = "none";
    result.style.display = "none";

    // ตรวจสอบข้อมูล
    if (isNaN(remaining) || isNaN(price)) {
        warning.innerText = "กรุณากรอกข้อมูลให้ครบ";
        warning.style.display = "block";
        return;
    }

    if (remaining < 0 || price < 0) {
        warning.innerText = "กรุณาใส่จำนวนเงินที่มากกว่าหรือเท่ากับ 0";
        warning.style.display = "block";
        return;
    }

    // รัฐช่วย 60%
    const government = price * 0.60;

    // เราจ่าย 40%
    const user = price * 0.40;

    // สิทธิ์คงเหลือ
    const after = remaining - government;

    // ถ้าสิทธิ์ไม่พอ
    if (government > remaining) {
        warning.innerText = "สิทธิ์ไม่พอสำหรับการซื้อจำนวนนี้";
        warning.style.display = "block";
        return;
    }

    // แสดงผล
    document.getElementById("totalPrice").innerText = formatMoney(price) + " บาท";
    document.getElementById("governmentPay").innerText = formatMoney(government) + " บาท";
    document.getElementById("userPay").innerText = formatMoney(user) + " บาท";
    document.getElementById("remainingAfter").innerText = formatMoney(after) + " บาท";

    result.style.display = "block";

    const maxPurchaseBox = document.getElementById("maxPurchaseBox");
    
    if (after > 0) {
        // คำนวณยอดซื้อสูงสุด: นำสิทธิ์ที่เหลือ (after) มาหารด้วย 0.6
        const maxPurchase = after / 0.6;
        document.getElementById("maxPurchaseAmount").innerText = formatMoney(maxPurchase) + " บาท";
        maxPurchaseBox.style.display = "block"; // แสดงกล่อง
    } else {
        maxPurchaseBox.style.display = "none"; // ซ่อนกล่องถ้าสิทธิ์เหลือ 0
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

    document.getElementById("maxPurchaseBox").style.display = "none";
}

// กด Enter เพื่อคำนวณ
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        calculate();
    }
});