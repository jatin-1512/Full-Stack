// test_concurrent.js
import axios from "axios";

const BASE = "http://localhost:3000";
const seatId = "A1";

// Simulate multiple users trying to lock the same seat at the same time
async function tryLock(userId) {
  try {
    const resp = await axios.post(`${BASE}/lock`, { seatId, userId }, { timeout: 5000 });
    return { userId, status: "success", data: resp.data };
  } catch (err) {
    if (err.response) {
      return { userId, status: "error", code: err.response.status, data: err.response.data };
    } else {
      return { userId, status: "error", message: err.message };
    }
  }
}

async function run() {
  // Create 6 concurrent attempts
  const users = ["U1", "U2", "U3", "U4", "U5", "U6"];
  const promises = users.map((u) => tryLock(u));
  const results = await Promise.all(promises);

  console.log("Lock attempt results:");
  results.forEach((r) => console.log(JSON.stringify(r, null, 2)));

  console.log("\nNow show seat state from server:");
  const seats = (await axios.get(`${BASE}/seats`)).data;
  console.log(JSON.stringify(seats, null, 2));

  // Optionally, one of the successful lockers confirms booking
  const success = results.find((r) => r.status === "success");
  if (success) {
    console.log(`\nUser ${success.userId} will now confirm booking...`);
    const confirmResp = await axios.post(`${BASE}/confirm`, { seatId, userId: success.userId });
    console.log(confirmResp.data);

    const finalSeats = (await axios.get(`${BASE}/seats`)).data;
    console.log("\nFinal seats:");
    console.log(JSON.stringify(finalSeats, null, 2));
  } else {
    console.log("No one got the lock (unexpected).");
  }
}

run().catch((e) => console.error(e));
