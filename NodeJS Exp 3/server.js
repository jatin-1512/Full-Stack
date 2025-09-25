// server.js
// Node 18+ recommended
import express from "express";

const app = express();
app.use(express.json());

/**
 Seat model (in-memory):
 {
   id: string,
   state: "available" | "locked" | "booked",
   lockedBy: string | null,
   lockExpiresAt: number | null, // timestamp ms
   _timeoutId: Timeout | null // for auto-expire, not serialized
 }
*/

const LOCK_DURATION_MS = 60_000; // 1 minute lock

// Initialize seats
const seats = new Map();
// Example: create 12 seats labeled A1..A12
for (let i = 1; i <= 12; i++) {
  seats.set(`A${i}`, {
    id: `A${i}`,
    state: "available",
    lockedBy: null,
    lockExpiresAt: null,
    _timeoutId: null,
  });
}

/** Utility: clear lock timeout and state cleanup */
function clearLock(seat) {
  if (seat._timeoutId) {
    clearTimeout(seat._timeoutId);
    seat._timeoutId = null;
  }
  seat.lockedBy = null;
  seat.lockExpiresAt = null;
  if (seat.state === "locked") seat.state = "available";
}

/** Endpoint: Get all seats (with lock info) */
app.get("/seats", (req, res) => {
  const result = Array.from(seats.values()).map((s) => ({
    id: s.id,
    state: s.state,
    lockedBy: s.lockedBy,
    lockExpiresAt: s.lockExpiresAt,
  }));
  res.json({ seats: result });
});

/** Endpoint: Lock a seat
 * body: { seatId, userId }
 */
app.post("/lock", (req, res) => {
  const { seatId, userId } = req.body;
  if (!seatId || !userId) {
    return res.status(400).json({ error: "seatId and userId are required." });
  }

  const seat = seats.get(seatId);
  if (!seat) {
    return res.status(404).json({ error: "Seat not found." });
  }

  // Important: keep check+set synchronous to avoid subtle races.
  if (seat.state === "booked") {
    return res.status(409).json({ error: "Seat already booked." });
  }
  if (seat.state === "locked") {
    // if locked by same user and still valid, extend/refresh lock
    const now = Date.now();
    if (seat.lockedBy === userId && seat.lockExpiresAt && seat.lockExpiresAt > now) {
      // Refresh lock expiry
      clearTimeout(seat._timeoutId);
      seat.lockExpiresAt = now + LOCK_DURATION_MS;
      seat._timeoutId = setTimeout(() => {
        // expire lock
        if (seat.state === "locked") {
          clearLock(seat);
        }
      }, LOCK_DURATION_MS);
      return res.json({ success: true, message: "Lock refreshed for your seat.", seatId, lockedBy: userId, lockExpiresAt: seat.lockExpiresAt });
    }
    return res.status(409).json({ error: `Seat is currently locked by another user (${seat.lockedBy}).` });
  }

  // seat is available -> lock it
  seat.state = "locked";
  seat.lockedBy = userId;
  seat.lockExpiresAt = Date.now() + LOCK_DURATION_MS;

  // set auto-expiry timeout
  seat._timeoutId = setTimeout(() => {
    // safety: only clear if still locked
    if (seat.state === "locked") {
      clearLock(seat);
      console.log(`Lock expired for seat ${seat.id}`);
    }
  }, LOCK_DURATION_MS);

  return res.json({ success: true, message: "Seat locked.", seatId, lockedBy: userId, lockExpiresAt: seat.lockExpiresAt });
});

/** Endpoint: Confirm booking of a locked seat
 * body: { seatId, userId }
 */
app.post("/confirm", (req, res) => {
  const { seatId, userId } = req.body;
  if (!seatId || !userId) {
    return res.status(400).json({ error: "seatId and userId are required." });
  }

  const seat = seats.get(seatId);
  if (!seat) return res.status(404).json({ error: "Seat not found." });

  if (seat.state === "booked") {
    return res.status(409).json({ error: "Seat already booked." });
  }

  if (seat.state !== "locked") {
    return res.status(409).json({ error: "Seat is not locked. You must lock the seat before confirming." });
  }

  const now = Date.now();
  if (!seat.lockExpiresAt || seat.lockExpiresAt < now) {
    // lock expired
    clearLock(seat);
    return res.status(409).json({ error: "Lock expired. Please try locking again." });
  }

  if (seat.lockedBy !== userId) {
    return res.status(403).json({ error: "You do not hold the lock for this seat." });
  }

  // All checks passed -> confirm booking
  clearTimeout(seat._timeoutId);
  seat._timeoutId = null;
  seat.lockExpiresAt = null;
  seat.lockedBy = null;
  seat.state = "booked";

  return res.json({ success: true, message: "Seat booking confirmed.", seatId });
});

/** Optional endpoint: release/cancel lock (if user chooses to cancel) */
app.post("/release", (req, res) => {
  const { seatId, userId } = req.body;
  if (!seatId || !userId) return res.status(400).json({ error: "seatId and userId are required." });

  const seat = seats.get(seatId);
  if (!seat) return res.status(404).json({ error: "Seat not found." });

  if (seat.state !== "locked") return res.status(409).json({ error: "Seat is not locked." });
  if (seat.lockedBy !== userId) return res.status(403).json({ error: "You do not hold the lock for this seat." });

  clearLock(seat);
  return res.json({ success: true, message: "Lock released.", seatId });
});

/** Start server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ticket booking server running on http://localhost:${PORT}`);
});
