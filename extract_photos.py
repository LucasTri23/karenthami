import re, zipfile, io, sys
from collections import defaultdict
from PIL import Image

ZIP = "Conversa do WhatsApp com Amor ♥️ (3).zip"
OUT = "site/assets/img"

pat = re.compile(r'^IMG-(\d{4})(\d{2})(\d{2})-WA(\d+)\.(jpg|jpeg|png)$', re.IGNORECASE)

zf = zipfile.ZipFile(ZIP)
by_month = defaultdict(list)
for info in zf.infolist():
    name = info.filename
    m = pat.match(name)
    if m:
        year, month, day, seq, ext = m.groups()
        by_month[(year, month)].append((day, seq, name, info.file_size))

print(f"Months found: {len(by_month)}", file=sys.stderr)

selected = []
for key in sorted(by_month.keys()):
    items = sorted(by_month[key], key=lambda x: (x[0], x[1]))
    # filter out tiny files (likely icons/thumbnails) - keep ones > 30KB
    items = [it for it in items if it[3] > 30000]
    if not items:
        continue
    # pick up to 3 spread across the month
    n = len(items)
    if n <= 3:
        picks = items
    else:
        picks = [items[0], items[n//2], items[-1]]
    for it in picks:
        selected.append((key, it))

print(f"Selected {len(selected)} photos", file=sys.stderr)

manifest = []
for (year, month), (day, seq, name, size) in selected:
    data = zf.read(name)
    img = Image.open(io.BytesIO(data))
    img = img.convert('RGB')
    # resize keeping aspect ratio, max dimension 1280
    max_dim = 1280
    w, h = img.size
    if max(w, h) > max_dim:
        if w >= h:
            new_w = max_dim
            new_h = int(h * max_dim / w)
        else:
            new_h = max_dim
            new_w = int(w * max_dim / h)
        img = img.resize((new_w, new_h), Image.LANCZOS)
    out_name = f"{year}-{month}-{day}-{seq}.jpg"
    out_path = f"{OUT}/{out_name}"
    img.save(out_path, 'JPEG', quality=78, optimize=True)
    manifest.append({"file": out_name, "date": f"{year}-{month}-{day}"})

import json
with open('site/data/photos.json', 'w', encoding='utf-8') as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

print(f"Done. {len(manifest)} photos written.", file=sys.stderr)
