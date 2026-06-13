import os
from PIL import Image, ImageOps

SRC = "img"
OUT = "docs/assets/img"

# (source filename in img/, output filename, category, caption)
MAP = [
    ("foto-crianca.jpg", "infancia-1.jpg", "infancia", "Vocês dois, ainda crianças 🧒👧"),
    ("foto-crianca (2).jpg", "infancia-2.jpg", "infancia", "Antes de tudo isso, já eram inseparáveis"),
    ("foto-crianca (3).jpg", "infancia-3.jpg", "infancia", "A amizade que começou na infância"),

    ("a-volta.jpg", "reencontro-1.jpg", "reencontro", "O reencontro, anos depois 🥹"),
    ("a-volta (2).jpg", "reencontro-2.jpg", "reencontro", "Que bom te ver de novo"),

    ("primeiro-pedido-de-namoro.jpg", "pedido-1.jpg", "pedido", "O dia do pedido de namoro 💍"),
    ("primeiro-pedido-de-namoro (2).jpg", "pedido-2.jpg", "pedido", "...e ela disse sim!"),
    ("primeiro-pedido-de-namoro (3).jpg", "pedido-3.jpg", "pedido", "Selfie do dia mais especial"),
    ("primeiro-pedido-de-namoro (4).jpg", "pedido-4.jpg", "pedido", "Pedido de namoro: capítulo 1"),

    ("1reuniaodepioneiros.jpg", "reuniao-pioneiros.jpg", "congregacao", "A reunião especial de pioneiros"),
    ("campanha-pregacao-juntos.jpg", "campanha-pregacao.jpg", "congregacao", "Servindo juntos na pregação"),

    ("foto-com-familia-juntos.jpg", "com-familia.jpg", "familia", "Com a família 🥰"),
    ("foto-com-galera.jpg", "com-galera.jpg", "amigos", "Com a galera"),

    ("foto-juntos.jpg", "casal-1.jpg", "casal", "Só vocês dois ❤️"),
    ("foto-juntos (2).jpg", "casal-2.jpg", "casal", "Mais um momento juntos"),
    ("foto-juntos (3).jpg", "casal-3.jpg", "casal", "Aquele dia"),
    ("foto-juntos (4).jpg", "casal-4.jpg", "casal", "Cara de quem tá feliz"),
    ("foto-juntos (5).jpg", "casal-5.jpg", "casal", "Mais uma do arquivo"),
    ("foto-juntos (6).jpg", "casal-6.jpg", "casal", "Momento qualquer, mas especial"),
    ("foto-juntos (7).jpg", "casal-7.jpg", "casal", "Risadas garantidas"),
    ("foto-juntos (8).jpg", "casal-8.jpg", "casal", "Dia comum, casal incomum"),
    ("foto-juntos (9).jpg", "casal-9.jpg", "casal", "Vibes boas"),
    ("foto-juntos (10).jpg", "casal-10.jpg", "casal", "Mais uma pra coleção"),
    ("foto-juntos (11).jpg", "casal-11.jpg", "casal", "Prova de que são fofos"),
    ("foto-juntos (12).jpg", "casal-12.jpg", "casal", "E mais essa"),
    ("foto-juntos(13).jpg", "casal-13.jpg", "casal", "Vocês dois, sempre"),

    ("foto-karen-so.jpg", "karen-1.jpg", "karen", "Só ela, Karen 💖"),
    ("foto-karen-so (2).jpg", "karen-2.jpg", "karen", "Linda, simplesmente"),
    ("foto-linda-karen-so.jpg", "karen-3.jpg", "karen", "A mais linda"),

    ("foto-lucas-so.jpg", "lucas-1.jpg", "lucas", "Só ele, Lucas 💙"),

    ("foto-look.jpg", "look.jpg", "look", "Aquele look"),

    ("foto-zuada.jpg", "zuada-1.jpg", "zuada", "Modo zoeira ativado 😂"),
    ("foto-zuada (2).jpg", "zuada-2.jpg", "zuada", "Risadas sem motivo"),
    ("foto-zuada (3).jpg", "zuada-3.jpg", "zuada", "Vergonha zero"),
]

MAX_DIM = 1100

os.makedirs(OUT, exist_ok=True)

entries = []
for src_name, out_name, category, caption in MAP:
    src_path = os.path.join(SRC, src_name)
    img = Image.open(src_path)
    img = ImageOps.exif_transpose(img)
    if img.mode != "RGB":
        img = img.convert("RGB")

    w, h = img.size
    if max(w, h) > MAX_DIM:
        if w >= h:
            new_w = MAX_DIM
            new_h = round(h * MAX_DIM / w)
        else:
            new_h = MAX_DIM
            new_w = round(w * MAX_DIM / h)
        img = img.resize((new_w, new_h), Image.LANCZOS)

    out_path = os.path.join(OUT, out_name)
    img.save(out_path, "JPEG", quality=78)

    entries.append({"file": out_name, "category": category, "caption": caption})

import json
with open("docs/data/story-photos.json", "w", encoding="utf-8") as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print(f"Processed {len(entries)} photos")
