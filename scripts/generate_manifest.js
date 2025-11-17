const fs = require("fs");
const path = require("path");

const IMAGES_DIR = path.resolve(__dirname, "..", "swipe_game_pictures");
const OUTPUT_PATH = path.join(IMAGES_DIR, "manifest.json");
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function buildManifest() {
  if (!fs.existsSync(IMAGES_DIR)) {
    throw new Error(`画像フォルダが見つかりません: ${IMAGES_DIR}`);
  }

  const files = fs
    .readdirSync(IMAGES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => ALLOWED_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "ja"));

  const payload = JSON.stringify({ images: files }, null, 2);
  fs.writeFileSync(OUTPUT_PATH, payload);
  console.log(`画像数: ${files.length}`);
  console.log(`manifest を更新しました: ${OUTPUT_PATH}`);
}

buildManifest();
