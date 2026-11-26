import numpy as np
from PIL import Image, ImageDraw
from pathlib import Path

out = Path(__file__).parent / "pwa"
out.mkdir(exist_ok=True)

def render(size):
    S = size * 4  # supersampling
    img = Image.new("RGB", (S, S), (0, 136, 255))
    # delikatny gradient pionowy
    arr = np.array(img, dtype=np.float32)
    g = np.linspace(0, 1, S)[:, None]
    arr[..., 0] += g * (-0)  # R
    arr[..., 1] += g * (-30)  # G
    arr[..., 2] += g * (-25)  # B
    img = Image.fromarray(np.clip(arr, 0, 255).astype("uint8"))
    ov = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    w = int(S * 0.055)
    x = np.linspace(S * 0.17, S * 0.83, 600)
    amp = S * 0.17
    cy = S * 0.5
    def wave(shift, alpha):
        ys = cy + amp * np.sin((x - S * 0.17) / (S * 0.66) * 2 * np.pi * 1.0 - shift)
        pts = list(zip(x.tolist(), ys.tolist()))
        d.line(pts, fill=(255, 255, 255, alpha), width=w, joint="curve")
        for px, py in (pts[0], pts[-1]):
            d.ellipse([px - w / 2, py - w / 2, px + w / 2, py + w / 2], fill=(255, 255, 255, alpha))
    wave(0.0, 110)
    wave(0.95, 255)
    img = Image.alpha_composite(img.convert("RGBA"), ov).convert("RGB")
    return img.resize((size, size), Image.LANCZOS)

render(180).save(out / "apple-touch-icon.png")
render(192).save(out / "icon-192.png")
render(512).save(out / "icon-512.png")
print("icons ok")
