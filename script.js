const contentData = {
  AMV: {
    hashtags: ["#AMV", "#animeedit", "#amvedit", "#animemusicvideo", "#animeedits", "#editamv", "#anime"],
    captions: [
      "This {topic} edit hit different.",
      "Been sitting on this {topic} edit for a while — finally posting it.",
      "{topic} deserved this treatment.",
      "POV: you just found your new favorite {topic} edit."
    ]
  },
  Vlog: {
    hashtags: ["#vlog", "#dailyvlog", "#dayinmylife", "#vlogger", "#lifestylevlog", "#realtalk"],
    captions: [
      "A little look into my {topic}.",
      "Spent the day on {topic} — here's how it went.",
      "Documenting {topic} before I forget it.",
      "Not everything went to plan with {topic}, but here it is."
    ]
  },
  Tutorial: {
    hashtags: ["#tutorial", "#howto", "#editingtutorial", "#learnontiktok", "#tips", "#stepbystep"],
    captions: [
      "Here's exactly how I did {topic}, step by step.",
      "Quick tutorial on {topic} — save this for later.",
      "Everything you need to know about {topic} in one video.",
      "The method I use for {topic}, explained simply."
    ]
  },
  Short: {
    hashtags: ["#shorts", "#shortsvideo", "#shortsfeed", "#quickclip", "#shortsyoutube"],
    captions: [
      "{topic} in under a minute.",
      "Quick one on {topic}.",
      "{topic} — no fluff, straight to it.",
      "Short and straight to the point: {topic}."
    ]
  },
  Gaming: {
    hashtags: ["#gaming", "#gamingclips", "#gamer", "#gameplay", "#twitchclips", "#gamingcommunity"],
    captions: [
      "This {topic} run got a little chaotic.",
      "Clipped this {topic} moment before I forgot.",
      "{topic} — not my cleanest run but it's something.",
      "Had to share this {topic} clip."
    ]
  },
  Promo: {
    hashtags: ["#smallbusiness", "#promo", "#newdrop", "#businessowner", "#supportsmallbusiness", "#launch"],
    captions: [
      "Introducing {topic} — out now.",
      "{topic} is finally here. Link in bio.",
      "We've been working on {topic} for a while — time to share it.",
      "{topic} just dropped. Check it out."
    ]
  },
  Lifestyle: {
    hashtags: ["#lifestyle", "#dailylife", "#slowliving", "#lifestylecontent", "#aesthetic"],
    captions: [
      "A snapshot of {topic} lately.",
      "{topic} has been taking up most of my time — worth it though.",
      "Small moments from {topic}.",
      "This is what {topic} has looked like recently."
    ]
  },
  Comedy: {
    hashtags: ["#comedy", "#funny", "#meme", "#relatable", "#comedyskit", "#funnyvideos"],
    captions: [
      "{topic} but it went completely wrong.",
      "Nobody asked for this {topic} skit but here it is.",
      "{topic}, as told by someone who clearly overthinks everything.",
      "POV: {topic} and nothing went as planned."
    ]
  }
};

const toneModifiers = {
  Hype: { prefix: "🔥 ", suffix: " Let's go!" },
  Chill: { prefix: "", suffix: " Just vibes." },
  Funny: { prefix: "", suffix: " 😂 no I'm not okay." },
  Emotional: { prefix: "", suffix: " This one means a lot to me." },
  Professional: { prefix: "", suffix: "" }
};

const communityTags = [
  "#fyp", "#foryou", "#viral", "#trending", "#explore", "#reels", "#contentcreator"
];

const appTags = {
  "CapCut": ["#CapCut", "#capcutedit"],
  "Alight Motion": ["#AlightMotion", "#alightmotionedit"],
  "Motion Ninja": ["#MotionNinja", "#motionninjaedit"],
  "Other": []
};

const contentTypeEl = document.getElementById("contentType");
const toneEl = document.getElementById("tone");
const topicNameEl = document.getElementById("topicName");
const appUsedEl = document.getElementById("appUsed");
const tagCountEl = document.getElementById("tagCount");
const forgeBtn = document.getElementById("forgeBtn");

const captionSection = document.getElementById("captionSection");
const captionOutput = document.getElementById("captionOutput");
const copyCaptionBtn = document.getElementById("copyCaptionBtn");

const resultSection = document.getElementById("resultSection");
const tagOutput = document.getElementById("tagOutput");
const copyBtn = document.getElementById("copyBtn");

function topicToTagFragment(name) {
  if (!name.trim()) return [];
  const clean = name.trim().replace(/\s+/g, "");
  return [`#${clean}`];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function forgeCaption(type, tone, topic) {
  const data = contentData[type];
  const template = data.captions[Math.floor(Math.random() * data.captions.length)];
  const filledTopic = topic.trim() || "this one";
  const base = template.replace("{topic}", filledTopic);
  const mod = toneModifiers[tone];
  return `${mod.prefix}${base}${mod.suffix}`.trim();
}

function forgeHashtags(type, topic, app, count) {
  const data = contentData[type];
  const pool = [
    ...data.hashtags,
    ...topicToTagFragment(topic),
    ...appTags[app],
    ...communityTags
  ];

  const seen = new Set();
  const unique = pool.filter(tag => {
    const key = tag.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const priorityLen = data.hashtags.length + topicToTagFragment(topic).length + appTags[app].length;
  const priority = unique.slice(0, priorityLen);
  const rest = shuffle(unique.slice(priorityLen));

  return [...priority, ...rest].slice(0, count);
}

function forgeAll() {
  const type = contentTypeEl.value;
  const tone = toneEl.value;
  const topic = topicNameEl.value;
  const app = appUsedEl.value;
  const count = parseInt(tagCountEl.value, 10);

  captionOutput.textContent = forgeCaption(type, tone, topic);
  captionSection.hidden = false;
  copyCaptionBtn.textContent = "Copy";
  copyCaptionBtn.classList.remove("copied");

  tagOutput.textContent = forgeHashtags(type, topic, app, count).join(" ");
  resultSection.hidden = false;
  copyBtn.textContent = "Copy";
  copyBtn.classList.remove("copied");
}

copyCaptionBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(captionOutput.textContent).then(() => {
    copyCaptionBtn.textContent = "Copied ✓";
    copyCaptionBtn.classList.add("copied");
  });
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(tagOutput.textContent).then(() => {
    copyBtn.textContent = "Copied ✓";
    copyBtn.classList.add("copied");
  });
});

forgeBtn.addEventListener("click", forgeAll);
