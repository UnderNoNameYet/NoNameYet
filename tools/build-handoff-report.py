#!/usr/bin/env python3
from __future__ import annotations

import html
import re
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Image, Table, TableStyle,
    KeepTogether, Preformatted, ListFlowable, ListItem
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "handoff" / "HANDOFF_REPORT.pdf"
SOURCE = ROOT / "handoff" / "HANDOFF_REPORT.md"
ASSETS = ROOT / "handoff" / "assets"

INK = colors.HexColor("#11231e")
DARK = colors.HexColor("#0c1815")
GREEN = colors.HexColor("#187552")
MINT = colors.HexColor("#8ce1bb")
PAPER = colors.HexColor("#f5f2e9")
SURFACE = colors.HexColor("#fffdf7")
RED = colors.HexColor("#b8483f")
AMBER = colors.HexColor("#a86d12")
MUTED = colors.HexColor("#5f716b")
LINE = colors.HexColor("#d8ddd5")

font_regular = "Helvetica"
font_bold = "Helvetica-Bold"
font_mono = "Courier"
font_candidates = [
    ("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
    ("/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf", "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"),
]
for regular, bold in font_candidates:
    if Path(regular).exists() and Path(bold).exists():
        pdfmetrics.registerFont(TTFont("TenantProofSans", regular))
        pdfmetrics.registerFont(TTFont("TenantProofSans-Bold", bold))
        font_regular = "TenantProofSans"
        font_bold = "TenantProofSans-Bold"
        break

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="TPTitle", fontName=font_bold, fontSize=35, leading=39, textColor=INK,
    alignment=TA_LEFT, spaceAfter=8
))
styles.add(ParagraphStyle(
    name="TPSubtitle", fontName=font_regular, fontSize=14, leading=20, textColor=MUTED,
    spaceAfter=16
))
styles.add(ParagraphStyle(
    name="TPH1", fontName=font_bold, fontSize=25, leading=30, textColor=INK,
    spaceBefore=8, spaceAfter=12
))
styles.add(ParagraphStyle(
    name="TPH2", fontName=font_bold, fontSize=17, leading=21, textColor=GREEN,
    spaceBefore=15, spaceAfter=8, keepWithNext=True
))
styles.add(ParagraphStyle(
    name="TPH3", fontName=font_bold, fontSize=12.5, leading=16, textColor=INK,
    spaceBefore=10, spaceAfter=5, keepWithNext=True
))
styles.add(ParagraphStyle(
    name="TPBody", fontName=font_regular, fontSize=9.6, leading=14.2, textColor=INK,
    spaceAfter=7
))
styles.add(ParagraphStyle(
    name="TPSmall", fontName=font_regular, fontSize=8, leading=11.5, textColor=MUTED
))
styles.add(ParagraphStyle(
    name="TPQuote", fontName=font_bold, fontSize=13, leading=19, textColor=GREEN,
    leftIndent=10, borderColor=MINT, borderWidth=0, borderPadding=8,
    backColor=colors.HexColor("#e8f4ee"), spaceBefore=8, spaceAfter=10
))
styles.add(ParagraphStyle(
    name="TPCode", fontName=font_mono, fontSize=7.6, leading=10.5, textColor=INK,
    backColor=colors.HexColor("#edf1ed"), borderPadding=7, spaceAfter=8
))
styles.add(ParagraphStyle(
    name="TPCoverEyebrow", fontName=font_bold, fontSize=9, leading=12, textColor=MINT,
    spaceAfter=10
))
styles.add(ParagraphStyle(
    name="TPCoverTitle", fontName=font_bold, fontSize=42, leading=46, textColor=colors.white,
    spaceAfter=12
))
styles.add(ParagraphStyle(
    name="TPCoverSub", fontName=font_regular, fontSize=15, leading=22, textColor=colors.HexColor("#c4d4ce")
))
styles.add(ParagraphStyle(
    name="TPCaption", fontName=font_regular, fontSize=7.8, leading=10.5, textColor=MUTED,
    alignment=TA_CENTER, spaceBefore=5, spaceAfter=12
))


def inline_markup(text: str) -> str:
    value = html.escape(text.strip())
    value = re.sub(r"`([^`]+)`", rf'<font name="{font_mono}">\1</font>', value)
    value = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", value)
    value = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<link href="\2" color="#187552">\1</link>', value)
    value = value.replace("  ", "<br/>")
    return value


def markdown_flowables(markdown: str):
    lines = markdown.splitlines()
    flow = []
    index = 0
    paragraph = []

    def flush_paragraph():
        nonlocal paragraph
        if paragraph:
            flow.append(Paragraph(inline_markup(" ".join(part.strip() for part in paragraph)), styles["TPBody"]))
            paragraph = []

    while index < len(lines):
        raw = lines[index]
        stripped = raw.strip()
        if not stripped:
            flush_paragraph()
            index += 1
            continue
        if stripped.startswith("```"):
            flush_paragraph()
            code = []
            index += 1
            while index < len(lines) and not lines[index].strip().startswith("```"):
                code.append(lines[index])
                index += 1
            index += 1
            flow.append(Preformatted("\n".join(code), styles["TPCode"]))
            continue
        if stripped.startswith("# "):
            flush_paragraph()
            if flow:
                flow.append(PageBreak())
            flow.append(Paragraph(inline_markup(stripped[2:]), styles["TPH1"]))
            index += 1
            continue
        if stripped.startswith("## "):
            flush_paragraph()
            flow.append(Paragraph(inline_markup(stripped[3:]), styles["TPH2"]))
            index += 1
            continue
        if stripped.startswith("### "):
            flush_paragraph()
            flow.append(Paragraph(inline_markup(stripped[4:]), styles["TPH3"]))
            index += 1
            continue
        if stripped.startswith("> "):
            flush_paragraph()
            flow.append(Paragraph(inline_markup(stripped[2:]), styles["TPQuote"]))
            index += 1
            continue
        if stripped.startswith("|") and index + 1 < len(lines) and re.match(r"^\s*\|?\s*:?-+", lines[index + 1]):
            flush_paragraph()
            rows = []
            while index < len(lines) and lines[index].strip().startswith("|"):
                cells = [inline_markup(cell) for cell in lines[index].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-+:?", re.sub(r"<[^>]+>", "", cell).strip()) for cell in cells):
                    rows.append([Paragraph(cell, styles["TPSmall"]) for cell in cells])
                index += 1
            if rows:
                table = Table(rows, repeatRows=1, hAlign="LEFT")
                table.setStyle(TableStyle([
                    ("BACKGROUND", (0, 0), (-1, 0), INK),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("FONTNAME", (0, 0), (-1, 0), font_bold),
                    ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                    ("BACKGROUND", (0, 1), (-1, -1), SURFACE),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 6),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                    ("TOPPADDING", (0, 0), (-1, -1), 5),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ]))
                flow.extend([table, Spacer(1, 8)])
            continue
        if re.match(r"^[-*] ", stripped) or re.match(r"^\d+\. ", stripped):
            flush_paragraph()
            ordered = bool(re.match(r"^\d+\. ", stripped))
            items = []
            while index < len(lines):
                current = lines[index].strip()
                matcher = re.match(r"^(?:[-*]|\d+\.)\s+(.*)", current)
                if not matcher:
                    break
                items.append(ListItem(Paragraph(inline_markup(matcher.group(1)), styles["TPBody"]), leftIndent=10))
                index += 1
            flow.append(ListFlowable(items, bulletType="1" if ordered else "bullet", leftIndent=18, bulletFontName=font_regular, bulletFontSize=7, spaceAfter=6))
            continue
        paragraph.append(stripped)
        index += 1
    flush_paragraph()
    return flow


def page_decor(canvas, doc):
    canvas.saveState()
    page = canvas.getPageNumber()
    if page > 1:
        canvas.setStrokeColor(LINE)
        canvas.line(18 * mm, 14 * mm, 192 * mm, 14 * mm)
        canvas.setFont(font_regular, 7.5)
        canvas.setFillColor(MUTED)
        canvas.drawString(18 * mm, 9 * mm, "TenantProof • canonical handoff • v0.3.0")
        canvas.drawRightString(192 * mm, 9 * mm, str(page))
    canvas.restoreState()


OUT.parent.mkdir(parents=True, exist_ok=True)
doc = SimpleDocTemplate(
    str(OUT), pagesize=A4, rightMargin=18 * mm, leftMargin=18 * mm,
    topMargin=18 * mm, bottomMargin=19 * mm,
    title="TenantProof Canonical Handoff Report",
    author="TenantProof project"
)
story = []

# Cover
cover_content = [
    Paragraph("CANONICAL PRODUCT + ENGINEERING HANDOFF", styles["TPCoverEyebrow"]),
    Paragraph("TenantProof", styles["TPCoverTitle"]),
]
cover = Table([[cover_content]], colWidths=[174 * mm], hAlign="LEFT")
cover.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), DARK),
    ("BOX", (0, 0), (-1, -1), 0, DARK),
    ("LEFTPADDING", (0, 0), (-1, -1), 12),
    ("RIGHTPADDING", (0, 0), (-1, -1), 12),
    ("TOPPADDING", (0, 0), (-1, -1), 15),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 15),
]))
story.extend([
    cover,
    Spacer(1, 4 * mm),
    Paragraph("Executed tenant-boundary evidence for Supabase SaaS", styles["TPSubtitle"]),
    Spacer(1, 14 * mm),
    Paragraph("Prove that Customer A cannot read or modify Customer B’s data.", styles["TPTitle"]),
    Paragraph("Product strategy, page specifications, UX system, technical architecture, safety boundaries, commercial model, roadmap, release state, and AI continuation protocol.", styles["TPSubtitle"]),
])
status_data = [
    [Paragraph("SNAPSHOT", styles["TPSmall"]), Paragraph("2026-08-30", styles["TPBody"])],
    [Paragraph("STAGE", styles["TPSmall"]), Paragraph("Request-only soft launch; premium static deployment pending GitHub administrator reapproval", styles["TPBody"])],
    [Paragraph("QUALITY", styles["TPSmall"]), Paragraph("Full source, browser, privacy, documentation, media, and release quality gates passed", styles["TPBody"])],
    [Paragraph("COMMERCIAL", styles["TPSmall"]), Paragraph("$349 verification / $649 verification + repair; payments closed; no customers or revenue yet", styles["TPBody"])],
]
status = Table(status_data, colWidths=[32 * mm, 137 * mm], hAlign="LEFT")
status.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, -1), INK),
    ("TEXTCOLOR", (0, 0), (0, -1), MINT),
    ("BACKGROUND", (1, 0), (1, -1), SURFACE),
    ("GRID", (0, 0), (-1, -1), 0.5, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("TOPPADDING", (0, 0), (-1, -1), 7),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
]))
story.extend([status, Spacer(1, 18 * mm), Paragraph("This report contains no customer data, credentials, real findings, testimonials, or revenue claims. Northstar CRM is fictional.", styles["TPSmall"]), PageBreak()])

# Canonical report content
source_text = SOURCE.read_text(encoding="utf-8")
source_lines = source_text.splitlines()
if source_lines and source_lines[0].startswith("# "):
    source_text = "\n".join(source_lines[1:])
story.extend(markdown_flowables(source_text))

# Visual appendix
story.extend([PageBreak(), Paragraph("Visual product reference", styles["TPH1"]), Paragraph("These images define the intended production quality. They are generated from the local fictional product and contain no customer evidence.", styles["TPBody"])])
visuals = [
    ("01-home-desktop.png", "Desktop first viewport — category, evidence preview, and primary actions"),
    ("02-report-desktop.png", "Desktop report viewer — local import, matrix controls, and evidence shell"),
    ("03-request-mobile.png", "Mobile scope worksheet — package, application surface, and non-sensitive brief"),
    ("05-social-preview.png", "1200×630 social-preview asset"),
]
for name, caption in visuals:
    file = ASSETS / name
    if not file.exists():
        continue
    image = Image(str(file))
    max_w, max_h = 174 * mm, 215 * mm
    scale = min(max_w / image.imageWidth, max_h / image.imageHeight)
    image.drawWidth = image.imageWidth * scale
    image.drawHeight = image.imageHeight * scale
    story.extend([Spacer(1, 8), image, Paragraph(caption, styles["TPCaption"])])

# Source index
story.extend([PageBreak(), Paragraph("Canonical source index", styles["TPH1"]), Paragraph("The PDF is a reviewable snapshot. The Markdown/JSON files below remain the editable source of truth.", styles["TPBody"])])
for name in [
    "AGENTS.md", "handoff/HANDOFF_REPORT.md", "handoff/CURRENT_STATE.json",
    "handoff/PRODUCT_SPEC.md", "handoff/PAGE_AND_SECTION_SPECS.md",
    "handoff/UX_DESIGN_SYSTEM.md", "handoff/TECHNICAL_ARCHITECTURE.md",
    "handoff/FEATURE_AND_FUNCTION_INVENTORY.md", "handoff/REPORT_ENGINE_SPEC.md",
    "handoff/SECURITY_PRIVACY_AND_SAFETY.md", "handoff/OPERATIONS_AND_INTAKE.md",
    "handoff/COMMERCIAL_AND_PAYMENTS.md", "handoff/GTM_AND_VALIDATION.md",
    "handoff/ROADMAP_V1_V2_V3.md", "handoff/DECISION_LOG.md",
    "handoff/REJECTED_IDEAS_AND_LEARNINGS.md", "handoff/QUALITY_GATES.md",
    "handoff/RELEASE_AND_REPOSITORY.md", "handoff/ASSET_MANIFEST.md",
    "handoff/AI_CONTINUATION.md"
]:
    story.append(Paragraph(f"• <font name=\"{font_mono}\">{html.escape(name)}</font>", styles["TPBody"]))

story.extend([Spacer(1, 8), Paragraph("Continuation rule", styles["TPH2"]), Paragraph("A future agent reads AGENTS.md first, validates CURRENT_STATE.json against the repository, runs the quality gate, and updates the handoff whenever behavior or decisions change.", styles["TPQuote"])])

doc.build(story, onFirstPage=page_decor, onLaterPages=page_decor)
print({"output": str(OUT), "bytes": OUT.stat().st_size})
