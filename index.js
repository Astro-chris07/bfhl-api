import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ✅ Your details
const fullName = "christeen_k_denny";   // lowercase full name with underscores
const dob = "07072004";                 // ddmmyyyy
const email = "cd072004@gmail.com";
const rollNumber = "22BCE3032";

// 🔹 Helper: alternating caps reverse concat
function alternateCapsReverse(arr) {
  const alphabets = arr.join("").split("").reverse();
  return alphabets
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

// ✅ Root route (fixes Cannot GET /)
app.get("/", (req, res) => {
  res.send("✅ BFHL API is running! Use POST /bfhl to test.");
});

// ✅ POST /bfhl route
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      if (!isNaN(item)) {
        // number
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // alphabet(s)
        alphabets.push(item.toUpperCase());
      } else {
        // special char
        special_characters.push(item);
      }
    });

    const concat_string = alternateCapsReverse(alphabets);

    res.json({
      is_success: true,
      user_id: `${fullName}_${dob}`,   // ✅ Correct format full_name_ddmmyyyy
      email: email,
      roll_number: rollNumber,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

// ✅ GET /bfhl for health check
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
