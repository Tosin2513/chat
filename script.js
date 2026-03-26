const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const plan = [
  {
    title: "Creative alternatives and delay termination",
    psalm: 100,
    weeks: 10,
    fastWeekday: "Saturday",
    fastUntil: "noon",
    godname: "Adonai Malek",
    prayer:
      "Amen Father, Your choice is my choice and I identify the creative alternatives that terminate the delays in my present experience. I opt for the creative alternatives that terminate the delays.",
  },
  {
    title: "Victory of fair choice making",
    psalm: 45,
    weeks: 11,
    fastWeekday: "Monday",
    fastUntil: "noon",
    godname: "Shaddai El Shai",
    prayer: "Amen Father, Your choice is my choice and I have the victory of fair choice making.",
  },
  {
    title: "Career / educational fortune",
    psalm: 53,
    weeks: 8,
    godname: "Elohim Sabaoth",
    prayer: "Career and educational fortune.",
  },
  {
    title: "Spiritual strength and victory like David",
    psalm: 124,
    weeks: 7,
    fastWeekday: "Friday",
    fastUntil: "noon",
    godname: "Jehovah Sabaoth",
    prayer: "Spiritual strength and the victory of David over the Goliath of personal challenges. New beginning.",
  },
  {
    title: "Divine healing and self fulfillment",
    psalm: 123,
    weeks: 6,
    fastWeekday: "Sunday",
    fastUntil: "noon",
    godname: "Jesus Christ",
    prayer: "Divine healing, gratitude for the gift of life, and self fulfillment.",
  },
  {
    title: "Victory over weakness and healing",
    psalm: 122,
    weeks: 5,
    fastWeekday: "Tuesday",
    fastUntil: "noon",
    godname: "Elohim Gebor",
    prayer: "Victory over the devil, victory over personal weaknesses, and divine healing.",
  },
  {
    title: "Unhindered favor",
    psalm: 139,
    weeks: 4,
    godname: "Al or El",
    prayer: "I let go. I let my star of destiny shine and I have unhindered access to uncommon favor.",
  },
  {
    title: "Karmic victory and accomplishment",
    psalm: 12,
    weeks: 3,
    godname: "Jehovah Elohim",
    prayer: "Karmic victory over the past and accomplishment of set goals.",
  },
  {
    title: "Positive transformation and new beginning",
    psalm: 128,
    weeks: 2,
    godname: "Jehovah",
    prayer: "Divine healing, positive transformation, old ending, and new beginning.",
  },
];

const startDateInput = document.getElementById("startDate");
const saveStartDateButton = document.getElementById("saveStartDate");
const setupStatus = document.getElementById("setupStatus");
const todayMeta = document.getElementById("todayMeta");
const todayTitle = document.getElementById("todayTitle");
const todayDetails = document.getElementById("todayDetails");
const todayPrayer = document.getElementById("todayPrayer");
const speakToday = document.getElementById("speakToday");
const stopSpeech = document.getElementById("stopSpeech");
const timeline = document.getElementById("timeline");

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function toDateOnly(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(date) {
  return date.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function getSavedStartDate() {
  const raw = localStorage.getItem("prayerStartDate");
  return raw ? new Date(raw) : null;
}

function saveStartDate(date) {
  localStorage.setItem("prayerStartDate", toDateOnly(date).toISOString());
}

function flattenPlan() {
  const days = [];
  plan.forEach((item, segmentIndex) => {
    const segmentDays = item.weeks * 7;
    for (let i = 0; i < segmentDays; i += 1) {
      days.push({
        ...item,
        segmentIndex,
        dayInSegment: i + 1,
        totalSegmentDays: segmentDays,
      });
    }
  });
  return days;
}

const allDays = flattenPlan();

function getScheduleForDate(date, startDate) {
  const dayNumber = Math.floor((toDateOnly(date) - toDateOnly(startDate)) / (1000 * 60 * 60 * 24));
  if (dayNumber < 0) {
    return { state: "before-start", dayNumber };
  }
  if (dayNumber >= allDays.length) {
    return { state: "completed", dayNumber };
  }
  return {
    state: "active",
    dayNumber,
    item: allDays[dayNumber],
  };
}

function renderToday() {
  const saved = getSavedStartDate();
  if (!saved) {
    todayMeta.textContent = "Please choose a start date first.";
    todayTitle.textContent = "";
    todayDetails.innerHTML = "";
    todayPrayer.textContent = "";
    timeline.innerHTML = "";
    return;
  }

  startDateInput.value = toDateOnly(saved).toISOString().slice(0, 10);

  const today = new Date();
  const schedule = getScheduleForDate(today, saved);

  if (schedule.state === "before-start") {
    todayMeta.textContent = `Your plan starts on ${formatDate(saved)}.`;
    todayTitle.textContent = "Not started yet";
    todayDetails.innerHTML = "";
    todayPrayer.textContent = "";
  } else if (schedule.state === "completed") {
    todayMeta.textContent = "Congratulations! Your full plan is complete.";
    todayTitle.textContent = "Journey completed";
    todayDetails.innerHTML = "";
    todayPrayer.textContent = "You can now begin your natal day prayer and fasting regime.";
  } else {
    const d = schedule.item;
    const todayWeekday = WEEKDAYS[today.getDay()];
    const isFastDay = d.fastWeekday && d.fastWeekday === todayWeekday;

    todayMeta.textContent = `Day ${schedule.dayNumber + 1} of ${allDays.length} (${formatDate(today)})`;
    todayTitle.textContent = d.title;
    todayPrayer.textContent = d.prayer;

    todayDetails.innerHTML = "";
    [
      `Psalm: ${d.psalm}`,
      `Godname: ${d.godname}`,
      `Segment day ${d.dayInSegment} of ${d.totalSegmentDays}`,
      isFastDay ? `Fast today (${d.fastWeekday}) till ${d.fastUntil}` : d.fastWeekday ? `Fast on ${d.fastWeekday}s till ${d.fastUntil}` : "No fasting rule in this segment",
      "Water affirmation: Pronounce your prayer affirmations and Godname into drinking water in the morning/evening.",
    ].forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      todayDetails.appendChild(li);
    });
  }

  renderTimeline(saved);
}

function renderTimeline(startDate) {
  timeline.innerHTML = "";
  const today = new Date();

  for (let offset = 0; offset < 14; offset += 1) {
    const date = addDays(today, offset);
    const entry = getScheduleForDate(date, startDate);
    const li = document.createElement("li");

    if (entry.state === "active") {
      const item = entry.item;
      const weekday = WEEKDAYS[date.getDay()];
      const fastTag = item.fastWeekday === weekday ? " • Fast till noon" : "";
      li.textContent = `${formatDate(date)}: Psalm ${item.psalm}, ${item.godname}${fastTag}`;
    } else if (entry.state === "before-start") {
      li.textContent = `${formatDate(date)}: journey has not started`;
    } else {
      li.textContent = `${formatDate(date)}: completed journey`;
    }

    timeline.appendChild(li);
  }
}

function speakWithPause(text, afterPauseText) {
  window.speechSynthesis.cancel();

  const first = new SpeechSynthesisUtterance(text);
  first.rate = 0.95;

  const second = new SpeechSynthesisUtterance(afterPauseText);
  second.rate = 0.95;

  first.onend = () => {
    setTimeout(() => window.speechSynthesis.speak(second), 3000);
  };

  window.speechSynthesis.speak(first);
}

saveStartDateButton.addEventListener("click", () => {
  if (!startDateInput.value) {
    setupStatus.textContent = "Select a valid start date.";
    return;
  }
  const date = new Date(startDateInput.value);
  saveStartDate(date);
  setupStatus.textContent = `Saved. Journey starts on ${formatDate(date)}.`;
  renderToday();
});

speakToday.addEventListener("click", () => {
  const saved = getSavedStartDate();
  if (!saved) {
    setupStatus.textContent = "Set a start date first.";
    return;
  }

  const schedule = getScheduleForDate(new Date(), saved);
  if (schedule.state !== "active") {
    setupStatus.textContent = "No active prayer for today.";
    return;
  }

  const item = schedule.item;
  const firstPart = `Godname ${item.godname}. Prayer point: ${item.prayer}`;
  const secondPart = `Now read Psalm ${item.psalm}.`;
  speakWithPause(firstPart, secondPart);
});

stopSpeech.addEventListener("click", () => {
  window.speechSynthesis.cancel();
});

(function init() {
  const saved = getSavedStartDate();
  if (saved) {
    startDateInput.value = toDateOnly(saved).toISOString().slice(0, 10);
  }
  renderToday();
})();
