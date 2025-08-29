export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ is_success: false, message: 'Method Not Allowed' });
  }

  try {
    // ✅ Your details
    const fullName = "christeen_k_denny";
    const dob = "07072004";
    const email = "cd072004@gmail.com";
    const rollNumber = "22BCE3032";

    // 🔹 Helper: alternating caps reverse concat
    const alternateCapsReverse = (arr) => {
      const alphabets = arr.join("").split("").reverse();
      return alphabets
        .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
        .join("");
    };

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
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    const concat_string = alternateCapsReverse(alphabets);

    res.status(200).json({
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
  } catch (err) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
}
