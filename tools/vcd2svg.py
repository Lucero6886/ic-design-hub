#!/usr/bin/env python3
"""
vcd2svg.py — vẽ giản đồ thời gian (timing diagram) SVG từ file VCD của mô phỏng THẬT.

Dùng cho hình minh họa của hub: mọi waveform trong bài viết đều sinh từ dữ liệu
mô phỏng thực tế (iverilog/vvp), không vẽ tay ước lượng.

Cách dùng:  python3 tools/vcd2svg.py wave.vcd out.svg "clk,rst_n,enable,count" 0 120 \
                --ann "12:rst_n:reset thả" --ann "105:count:wrap 9→0" [--dec]

Quy ước màu (đã validate trên nền sáng #fcfcfb):
  nét tín hiệu = mực đậm #17222e (định danh nằm ở NHÃN HÀNG, không ở màu)
  giá trị bus  = hộp viền xanh #2a78d6, chữ mực đậm
  vùng X       = gạch chéo đỏ #d03b3b + chữ "X" (không bao giờ chỉ dùng màu)
  chú thích    = xanh #2a78d6 · lưới thời gian = xám nhạt lùi về sau
"""
import re, sys, html

INK, ACC, DANGER, GRID, SURF, MUT = "#17222e", "#2a78d6", "#d03b3b", "#e3e7eb", "#fcfcfb", "#5a6d7f"
ACC_T = "#e7f0fb"  # nền hộp bus (tint của ACC)

def parse_vcd(path):
    ids, sigs, t = {}, {}, 0
    for line in open(path, encoding="utf8"):
        line = line.strip()
        if line.startswith("$var"):
            m = re.match(r"\$var\s+\S+\s+(\d+)\s+(\S+)\s+(\S+?)(\s+\[\d+:\d+\])?\s+\$end", line)
            if m:
                w, vid, name = int(m.group(1)), m.group(2), m.group(3)
                ids[vid] = name
                sigs[name] = {"w": w, "chg": []}
        elif line.startswith("#"):
            t = int(line[1:])
        elif line and line[0] in "01xzXZ" and len(line) >= 2 and line[1:] in ids:
            sigs[ids[line[1:]]]["chg"].append((t, line[0].lower()))
        elif line and line[0] in "bB":
            m = re.match(r"[bB]([01xzXZ]+)\s+(\S+)", line)
            if m and m.group(2) in ids:
                sigs[ids[m.group(2)]]["chg"].append((t, m.group(1).lower()))
    return sigs

def value_at(chg, t):
    v = "x"
    for tt, vv in chg:
        if tt <= t: v = vv
        else: break
    return v

def segments(chg, t0, t1):
    """[(tstart, tend, value)] trong cửa sổ [t0,t1]"""
    out, cur, start = [], value_at(chg, t0), t0
    for tt, vv in chg:
        if tt <= t0 or tt > t1: continue
        if vv != cur:
            out.append((start, tt, cur)); cur, start = vv, tt
    out.append((start, t1, cur))
    return out

def fmt(v, dec):
    if "x" in v or "z" in v: return "X"
    return str(int(v, 2)) if dec else (v if len(v) == 1 else hex(int(v, 2))[2:].upper())

def render(sigs, names, t0, t1, anns, dec=False, title=""):
    LAB, RH, GAP, PXNS, PADT = 92, 34, 14, None, 46
    W = 760; plot_w = W - LAB - 24; PXNS = plot_w / (t1 - t0)
    H = PADT + len(names) * (RH + GAP) + 34 + (18 if anns else 0)
    X = lambda t: LAB + (t - t0) * PXNS
    s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" font-family="ui-monospace,Consolas,Menlo,monospace" font-size="12">']
    s.append(f'<rect width="{W}" height="{H}" rx="10" fill="{SURF}" stroke="{GRID}"/>')
    s.append(f'<defs><pattern id="hx" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="7" stroke="{DANGER}" stroke-width="1.6" opacity="0.55"/></pattern></defs>')
    if title:
        s.append(f'<text x="{LAB}" y="24" fill="{INK}" font-size="13.5" font-weight="700" font-family="system-ui,sans-serif">{html.escape(title)}</text>')
    step = 10 if (t1 - t0) <= 130 else 20
    for tt in range(t0, t1 + 1, step):  # lưới + trục thời gian (lùi về sau)
        s.append(f'<line x1="{X(tt):.1f}" y1="{PADT-8}" x2="{X(tt):.1f}" y2="{H-30}" stroke="{GRID}" stroke-width="1"/>')
        if X(tt) < W - 42:  # tránh chồng lên nhãn đơn vị "ns"
            s.append(f'<text x="{X(tt):.1f}" y="{H-14}" fill="{MUT}" text-anchor="middle" font-size="10.5">{tt}</text>')
    s.append(f'<text x="{W-14}" y="{H-14}" fill="{MUT}" text-anchor="end" font-size="10.5">ns</text>')
    for i, name in enumerate(names):
        y0 = PADT + i * (RH + GAP); yl, yh = y0 + RH - 4, y0 + 4
        sig = sigs[name]
        s.append(f'<text x="{LAB-8}" y="{y0+RH/2+4}" fill="{INK}" text-anchor="end" font-weight="600">{html.escape(name)}</text>')
        segs = segments(sig["chg"], t0, t1)
        if sig["w"] == 1:
            pts, prev = [], None
            for (a, b, v) in segs:
                if "x" in v:
                    s.append(f'<rect x="{X(a):.1f}" y="{yh}" width="{(b-a)*PXNS:.1f}" height="{yl-yh}" fill="url(#hx)" stroke="{DANGER}" stroke-width="1"/>')
                    s.append(f'<text x="{(X(a)+X(b))/2:.1f}" y="{y0+RH/2+4}" fill="{DANGER}" text-anchor="middle" font-weight="700">X</text>')
                    prev = None; continue
                y = yh if v == "1" else yl
                if prev is not None and prev != y:
                    pts.append(f"{X(a):.1f},{prev}")
                pts.append(f"{X(a):.1f},{y}"); pts.append(f"{X(b):.1f},{y}")
                prev = y
                if pts and (b == t1 or True): pass
            if pts:
                s.append(f'<polyline points="{" ".join(pts)}" fill="none" stroke="{INK}" stroke-width="2" stroke-linejoin="miter"/>')
        else:
            for (a, b, v) in segs:
                xa, xb, k = X(a), X(b), min(5, (b - a) * PXNS / 2)
                if "x" in v:
                    s.append(f'<polygon points="{xa+k:.1f},{yh} {xb-k:.1f},{yh} {xb:.1f},{y0+RH/2} {xb-k:.1f},{yl} {xa+k:.1f},{yl} {xa:.1f},{y0+RH/2}" fill="url(#hx)" stroke="{DANGER}" stroke-width="1.4"/>')
                    s.append(f'<text x="{(xa+xb)/2:.1f}" y="{y0+RH/2+4}" fill="{DANGER}" text-anchor="middle" font-weight="700">X</text>')
                else:
                    s.append(f'<polygon points="{xa+k:.1f},{yh} {xb-k:.1f},{yh} {xb:.1f},{y0+RH/2} {xb-k:.1f},{yl} {xa+k:.1f},{yl} {xa:.1f},{y0+RH/2}" fill="{ACC_T}" stroke="{ACC}" stroke-width="1.4"/>')
                    s.append(f'<text x="{(xa+xb)/2:.1f}" y="{y0+RH/2+4}" fill="{INK}" text-anchor="middle" font-weight="600">{fmt(v, dec)}</text>')
    for (ta, row, txt) in anns:  # chú thích sự kiện
        i = names.index(row); y0 = PADT + i * (RH + GAP)
        s.append(f'<line x1="{X(ta):.1f}" y1="{y0-4}" x2="{X(ta):.1f}" y2="{y0+RH+2}" stroke="{ACC}" stroke-width="1.6" stroke-dasharray="4 3"/>')
        anchor = "start" if X(ta) < W - 190 else "end"; dx = 5 if anchor == "start" else -5
        s.append(f'<text x="{X(ta)+dx:.1f}" y="{y0-8}" fill="{ACC}" font-size="11" font-weight="600" text-anchor="{anchor}" font-family="system-ui,sans-serif">{html.escape(txt)}</text>')
    s.append("</svg>")
    return "\n".join(s)

if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    vcd, out, names, t0, t1 = args[0], args[1], args[2].split(","), int(args[3]), int(args[4])
    dec = "--dec" in sys.argv
    title = next((a.split("=", 1)[1] for a in sys.argv if a.startswith("--title=")), "")
    anns = []
    for i, a in enumerate(sys.argv):
        if a == "--ann":
            t, row, txt = sys.argv[i + 1].split(":", 2); anns.append((int(t), row, txt))
    open(out, "w", encoding="utf8").write(render(parse_vcd(vcd), names, t0, t1, anns, dec, title))
    print("wrote", out)
