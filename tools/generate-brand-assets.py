#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import subprocess

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets"
OUT.mkdir(parents=True, exist_ok=True)

def font_path(family: str) -> str:
    return subprocess.check_output(["fc-match", "-f", "%{file}", family], text=True).strip()

REG = font_path("Arial")
BOLD = font_path("Arial:style=Bold")

def font(size: int, bold=False):
    return ImageFont.truetype(BOLD if bold else REG, size)

def logo(size: int):
    im = Image.new("RGBA", (size, size), (17, 35, 30, 255))
    d = ImageDraw.Draw(im)
    r = int(size * .22)
    d.rounded_rectangle((0, 0, size - 1, size - 1), radius=r, fill=(17,35,30,255))
    pad = int(size * .25)
    line = max(3, int(size * .055))
    mint = (140, 225, 187, 255)
    d.rectangle((pad, pad, size-pad, size-pad), outline=mint, width=line)
    d.line((size//2, pad, size//2, size-pad), fill=mint, width=line)
    d.line((pad, size//2, size-pad, size//2), fill=mint, width=line)
    dot = max(3, int(size * .055))
    d.ellipse((int(size*.36)-dot, int(size*.36)-dot, int(size*.36)+dot, int(size*.36)+dot), fill=(255,253,247,255))
    d.ellipse((int(size*.64)-dot, int(size*.64)-dot, int(size*.64)+dot, int(size*.64)+dot), fill=(255,253,247,255))
    return im

for size in (192, 512):
    logo(size).save(OUT / f"icon-{size}.png", optimize=True)

W, H = 1200, 630
im = Image.new("RGB", (W, H), (12, 24, 21))
d = ImageDraw.Draw(im)
# restrained radial glow
for radius in range(480, 40, -8):
    alpha = (480-radius) / 440
    c = tuple(int(a*(1-alpha)+b*alpha) for a,b in zip((20,62,49),(12,24,21)))
    box = (820-radius, 315-radius, 820+radius, 315+radius)
    d.ellipse(box, fill=c)
# overlay to restore left clarity
d.rectangle((0,0,610,H), fill=(12,24,21))
mark = logo(64)
im.paste(mark, (70, 58), mark)
d.text((152, 73), "TenantProof", font=font(30, True), fill=(238,248,243))
d.text((70, 184), "A green RLS badge", font=font(70, True), fill=(238,248,243))
d.text((70, 265), "is not proof.", font=font(70, True), fill=(140,225,187))
d.text((72, 382), "Executed tenant-boundary evidence", font=font(28), fill=(184,201,194))
d.text((72, 420), "for Supabase SaaS.", font=font(28), fill=(184,201,194))
# report card
x1,y1,x2,y2 = 765,145,1128,500
d.rounded_rectangle((x1,y1,x2,y2), radius=24, fill=(18,39,33), outline=(57,82,72), width=2)
d.text((795,175), "BOUNDARY MATRIX", font=font(17, True), fill=(126,215,177))
metrics = [("16","CHECKS"),("4","FAILED"),("11","BLOCKED")]
for i,(value,label) in enumerate(metrics):
    x = 795+i*105
    d.text((x,220), value, font=font(32, True), fill=(255,174,162) if label=="FAILED" else (238,248,243))
    d.text((x,259), label, font=font(12, True), fill=(128,151,141))
rows = [("customer_notes","FAIL"),("projects","PASS"),("archive_project()","FAIL"),("customer-files","PASS")]
for i,(name,status) in enumerate(rows):
    y=315+i*39
    d.line((795,y-8,1098,y-8), fill=(44,67,58), width=1)
    d.text((795,y), name, font=font(15), fill=(190,209,201))
    pill=(1008,y-3,1098,y+23)
    color=(83,30,29) if status=="FAIL" else (21,68,49)
    text=(255,184,174) if status=="FAIL" else (158,229,194)
    d.rounded_rectangle(pill, radius=13, fill=color)
    d.text((1028,y+2), status, font=font(12,True), fill=text)
im.save(OUT / "tenantproof-og.png", optimize=True)
print({"generated": ["icon-192.png", "icon-512.png", "tenantproof-og.png"], "font_regular": REG, "font_bold": BOLD})
