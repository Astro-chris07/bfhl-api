// api/bfhl.js

export default function handler(req, res) {
  // Only allow POST requests
  if (req.method === "POST") {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    // ✅ Your details
    const fullName = "christeen_k_denny";   // lowercase full name with underscores
    const dob = "07072004";                 // ddmmyyyy
    const email = "cd072004@gmail.com";
    const rollNumber = "22BCE3032";

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    // Process input array
    data.forEach((item) => {
      if (!isNaN(item)) {
        // number
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // alphabet(s)
        alphabets.push(item.toUpperCase());
      } else {
        // special character
        special_characters.push(item);
      }
    });

    // Helper: alternating caps reverse concat
    const concat_string = alphabets.join("")
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    // Send JSON response
    return res.status(200).json({
      is_success: true,
      user_id: `${fullName}_${dob}`,
      email,
      roll_number: rollNumber,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });

  } else if (req.method === "GET") {
    // Optional health check
    return res.status(200).json({ operation_code: 1 });
  } else {
    // Method not allowed
    return res.status(405).json({ is_success: false, message: "Method not allowed" });
  }
}
