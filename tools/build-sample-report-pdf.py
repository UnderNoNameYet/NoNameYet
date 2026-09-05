#!/usr/bin/env python3
from __future__ import annotations

import html
import json
from pathlib import Path

from reportlab import rl_config
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "assets" / "sample-report.json"
OUT = ROOT / "public" / "assets" / "tenantproof-fictional-report.pdf"

rl_config.invariant = 1

INK = colors.HexColor("#17191c")
PAPER = colors.HexColor("#f6f5f1")
SURFACE = colors.HexColor("#fffefa")
VIOLET = colors.HexColor("#5f55e7")
VIOLET_SOFT = colors.HexColor("#efefff")
MUTED = colors.HexColor("#646a70")
LINE = colors.HexColor("#dcdedb")
GREEN = colors.HexColor("#17825b")
GREEN_SOFT = colors.HexColor("#e4f3ec")
RED = colors.HexColor("#b8413a")
RED_SOFT = colors.HexColor("#fae7e4")
AMBER = colors.HexColor("#94620b")
AMBER_SOFT = colors.HexColor("#f8edd5")

font_regular = "Helvetica"
font_bold = "Helvetica-Bold"
font_mono = "Courier"
for regular, bold in [
    (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ),
    (
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf",
    ),
]:
    if Path(regular).exists() and Path(bold).exists():
        pdfmetrics.registerFont(TTFont("TenantProofSans", regular))
        pdfmetrics.registerFont(TTFont("TenantProofSans-Bold", bold))
        font_regular = "TenantProofSans"
        font_bold = "TenantProofSans-Bold"
        break

styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="TPKicker",
        fontName=font_bold,
        fontSize=8,
        leading=10,
        tracking=1.2,
        textColor=VIOLET,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="TPTitle",
        fontName=font_bold,
        fontSize=30,
        leading=34,
        textColor=INK,
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        name="TPSubtitle",
        fontName=font_regular,
        fontSize=12,
        leading=17,
        textColor=MUTED,
        spaceAfter=14,
    )
)
styles.add(
    ParagraphStyle(
        name="TPH1",
        fontName=font_bold,
        fontSize=21,
        leading=25,
        textColor=INK,
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        name="TPH2",
        fontName=font_bold,
        fontSize=12,
        leading=15,
        textColor=INK,
        spaceAfter=5,
        keepWithNext=True,
    )
)
styles.add(
    ParagraphStyle(
        name="TPBody",
        fontName=font_regular,
        fontSize=9.5,
        leading=13.5,
        textColor=INK,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="TPSmall",
        fontName=font_regular,
        fontSize=7.5,
        leading=10,
        textColor=MUTED,
    )
)
styles.add(
    ParagraphStyle(
        name="TPMono",
        fontName=font_mono,
        fontSize=7.5,
        leading=10,
        textColor=INK,
    )
)
styles.add(
    ParagraphStyle(
        name="TPMetric",
        fontName=font_bold,
        fontSize=24,
        leading=26,
        alignment=TA_CENTER,
        textColor=INK,
    )
)
styles.add(
    ParagraphStyle(
        name="TPMetricLabel",
        fontName=font_bold,
        fontSize=7,
        leading=9,
        alignment=TA_CENTER,
        textColor=MUTED,
    )
)
styles.add(
    ParagraphStyle(
        name="TPTable",
        fontName=font_regular,
        fontSize=7.2,
        leading=9.5,
        textColor=INK,
    )
)
styles.add(
    ParagraphStyle(
        name="TPTableHead",
        fontName=font_bold,
        fontSize=7,
        leading=9,
        textColor=colors.white,
    )
)
styles.add(
    ParagraphStyle(
        name="TPStatusPass",
        fontName=font_bold,
        fontSize=7,
        leading=9,
        alignment=TA_CENTER,
        textColor=GREEN,
        backColor=GREEN_SOFT,
        borderPadding=3,
    )
)
styles.add(
    ParagraphStyle(
        name="TPStatusFail",
        fontName=font_bold,
        fontSize=7,
        leading=9,
        alignment=TA_CENTER,
        textColor=RED,
        backColor=RED_SOFT,
        borderPadding=3,
    )
)
styles.add(
    ParagraphStyle(
        name="TPStatusOpen",
        fontName=font_bold,
        fontSize=7,
        leading=9,
        alignment=TA_CENTER,
        textColor=AMBER,
        backColor=AMBER_SOFT,
        borderPadding=3,
    )
)


def esc(value: object) -> str:
    return html.escape("" if value is None else str(value))


def status_label(value: str) -> str:
    return {
        "pass": "PASS",
        "fail": "FAIL",
        "untested": "UNTESTED",
        "out_of_scope": "OUT OF SCOPE",
    }[value]


def status_paragraph(value: str) -> Paragraph:
    style = (
        styles["TPStatusPass"]
        if value == "pass"
        else styles["TPStatusFail"]
        if value == "fail"
        else styles["TPStatusOpen"]
    )
    return Paragraph(status_label(value), style)


def section_header(kicker: str, title: str, body: str) -> list:
    return [
        Paragraph(esc(kicker.upper()), styles["TPKicker"]),
        Paragraph(esc(title), styles["TPH1"]),
        Paragraph(esc(body), styles["TPSubtitle"]),
    ]


def metric(value: int, label: str, color: colors.Color = INK) -> Table:
    number_style = styles["TPMetric"].clone(f"TPMetric-{label}")
    number_style.textColor = color
    table = Table(
        [
            [Paragraph(str(value), number_style)],
            [Paragraph(esc(label.upper()), styles["TPMetricLabel"])],
        ],
        colWidths=[34 * mm],
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("TOPPADDING", (0, 0), (-1, 0), 8),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 1),
                ("TOPPADDING", (0, 1), (-1, 1), 0),
                ("BOTTOMPADDING", (0, 1), (-1, 1), 7),
            ]
        )
    )
    return table


def fact(label: str, value: object) -> Table:
    table = Table(
        [
            [Paragraph(esc(label.upper()), styles["TPSmall"])],
            [Paragraph(f"<b>{esc(value)}</b>", styles["TPBody"])],
        ],
        colWidths=[42 * mm],
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, 0), 7),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 1),
                ("TOPPADDING", (0, 1), (-1, 1), 1),
                ("BOTTOMPADDING", (0, 1), (-1, 1), 7),
            ]
        )
    )
    return table


def finding_card(check: dict) -> Table:
    before = check["before"]
    after = check["after"]
    body = [
        Paragraph(
            f'<font name="{font_mono}">{esc(check["id"])}</font> · '
            f'{esc(check["resource"])} · {esc(check["operation"])}',
            styles["TPSmall"],
        ),
        Paragraph(esc(check["expectation"]), styles["TPH2"]),
        Paragraph(f'<font color="#646a70">Observed before:</font> {esc(before["observed"])}', styles["TPBody"]),
        Paragraph(f'<font color="#646a70">Repair:</font> {esc(before["remediation"])}', styles["TPBody"]),
        Paragraph(f'<font color="#646a70">Retest:</font> {esc(after["observed"])}', styles["TPBody"]),
    ]
    table = Table([[body]], colWidths=[82.5 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                ("BOX", (0, 0), (-1, -1), 0.7, LINE),
                ("LINEABOVE", (0, 0), (-1, 0), 3, RED),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def page_decor(canvas, doc) -> None:
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, width, height, stroke=0, fill=1)
    canvas.setStrokeColor(LINE)
    canvas.line(16 * mm, 15 * mm, width - 16 * mm, 15 * mm)
    canvas.setFont(font_regular, 7.2)
    canvas.setFillColor(MUTED)
    canvas.drawString(16 * mm, 9 * mm, "TenantProof · fictional demonstration · not customer evidence")
    canvas.drawRightString(width - 16 * mm, 9 * mm, str(canvas.getPageNumber()))
    canvas.restoreState()


report = json.loads(SOURCE.read_text(encoding="utf-8"))
checks = report["checks"]
before_counts = {key: sum(item["before"]["status"] == key for item in checks) for key in ("pass", "fail", "untested", "out_of_scope")}
after_counts = {key: sum(item["after"]["status"] == key for item in checks) for key in ("pass", "fail", "untested", "out_of_scope")}
findings = [item for item in checks if item["before"]["status"] == "fail"]
residual = [item for item in checks if item["after"]["status"] != "pass"]

OUT.parent.mkdir(parents=True, exist_ok=True)
doc = SimpleDocTemplate(
    str(OUT),
    pagesize=A4,
    leftMargin=16 * mm,
    rightMargin=16 * mm,
    topMargin=16 * mm,
    bottomMargin=20 * mm,
    title="TenantProof Fictional Tenant-Boundary Verification Report",
    author="TenantProof",
    subject="Fictional sample report showing scoped before-and-after tenant-isolation evidence",
)

story = []

# Page 1 — decision summary
story.extend(
    [
        Paragraph("FICTIONAL TENANT-BOUNDARY EVIDENCE", styles["TPKicker"]),
        Paragraph("Verification report", styles["TPTitle"]),
        Paragraph(
            "Northstar CRM · a demonstration of the artifact a scoped TenantProof review produces.",
            styles["TPSubtitle"],
        ),
    ]
)
banner = Table(
    [
        [
            Paragraph("<b>FICTIONAL DEMONSTRATION</b>", styles["TPBody"]),
            Paragraph("No customer, authorization, production system, or real finding is represented.", styles["TPBody"]),
        ]
    ],
    colWidths=[50 * mm, 122 * mm],
)
banner.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, -1), AMBER_SOFT),
            ("TEXTCOLOR", (0, 0), (0, 0), AMBER),
            ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor("#e1c98f")),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 7),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ]
    )
)
story.extend([banner, Spacer(1, 11 * mm)])
story.append(
    Table(
        [
            [
                fact("Report ID", report["reportId"]),
                fact("Environment", report["project"]["environment"]),
                fact("Checks", len(checks)),
                fact("Schema", report["schemaVersion"]),
            ]
        ],
        colWidths=[43 * mm] * 4,
        hAlign="LEFT",
    )
)
story.extend([Spacer(1, 11 * mm), Paragraph("Before repair", styles["TPH2"])])
story.append(
    Table(
        [
            [
                metric(len(checks), "total"),
                metric(before_counts["pass"], "pass", GREEN),
                metric(before_counts["fail"], "fail", RED),
                metric(before_counts["untested"] + before_counts["out_of_scope"], "open", AMBER),
            ]
        ],
        colWidths=[43 * mm] * 4,
    )
)
story.extend([Spacer(1, 8 * mm), Paragraph("After repair and controlled retest", styles["TPH2"])])
story.append(
    Table(
        [
            [
                metric(len(checks), "total"),
                metric(after_counts["pass"], "pass", GREEN),
                metric(after_counts["fail"], "fail", RED),
                metric(after_counts["untested"] + after_counts["out_of_scope"], "open", AMBER),
            ]
        ],
        colWidths=[43 * mm] * 4,
    )
)
story.extend(
    [
        Spacer(1, 11 * mm),
        Paragraph(
            "<b>Decision summary.</b> Four scoped expectations contradicted the fictional before-run observations. "
            "The sample repairs those rules and reruns the same contracts. Fifteen checks then match their "
            "expectations; one support-console path remains explicitly outside the demonstration scope.",
            styles["TPBody"],
        ),
        Paragraph(
            "A pass is contextual. It applies only to the recorded actor, operation, environment, code state, "
            "fixture, and execution time.",
            styles["TPSubtitle"],
        ),
        PageBreak(),
    ]
)

# Page 2 — findings and repair
story.extend(
    section_header(
        "Before → repair → retest",
        "Four contradictions, each tied to the same contract.",
        "The report records the expected boundary, the observed behavior, the root-rule change, and the comparable retest.",
    )
)
card_rows = []
for index in range(0, len(findings), 2):
    row = [finding_card(findings[index])]
    row.append(finding_card(findings[index + 1]) if index + 1 < len(findings) else "")
    card_rows.append(row)
cards = Table(card_rows, colWidths=[86 * mm, 86 * mm], hAlign="LEFT")
cards.setStyle(
    TableStyle(
        [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 3),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ]
    )
)
story.extend(
    [
        cards,
        Spacer(1, 6 * mm),
        Paragraph("Residual scope", styles["TPH2"]),
        Paragraph(
            f'<font name="{font_mono}">{esc(residual[0]["id"])}</font> · '
            f'{esc(residual[0]["resource"])} remains <b>out of scope</b>. '
            f'{esc(residual[0]["after"]["observed"])}',
            styles["TPBody"],
        ),
        Paragraph(
            "Leaving an area open is deliberate: untested and out-of-scope never become green evidence.",
            styles["TPSubtitle"],
        ),
        PageBreak(),
    ]
)

# Page 3 — complete matrix
story.extend(
    section_header(
        "Executed matrix",
        "Every result stays attached to an expectation.",
        "The table summarizes all fictional checks. Detailed observations and redacted traces remain available in the interactive workbench.",
    )
)
matrix_rows = [
    [
        Paragraph("ID", styles["TPTableHead"]),
        Paragraph("Surface", styles["TPTableHead"]),
        Paragraph("Resource", styles["TPTableHead"]),
        Paragraph("Actor", styles["TPTableHead"]),
        Paragraph("Operation", styles["TPTableHead"]),
        Paragraph("Before", styles["TPTableHead"]),
        Paragraph("After", styles["TPTableHead"]),
    ]
]
for check in checks:
    matrix_rows.append(
        [
            Paragraph(esc(check["id"]), styles["TPMono"]),
            Paragraph(esc(check["area"]), styles["TPTable"]),
            Paragraph(f'<b>{esc(check["resource"])}</b>', styles["TPTable"]),
            Paragraph(esc(check["actor"]), styles["TPTable"]),
            Paragraph(esc(check["operation"]), styles["TPTable"]),
            status_paragraph(check["before"]["status"]),
            status_paragraph(check["after"]["status"]),
        ]
    )
matrix = Table(
    matrix_rows,
    colWidths=[17 * mm, 23 * mm, 39 * mm, 24 * mm, 23 * mm, 23 * mm, 23 * mm],
    repeatRows=1,
    hAlign="LEFT",
)
matrix.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, 0), INK),
            ("BOX", (0, 0), (-1, -1), 0.6, LINE),
            ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
            ("BACKGROUND", (0, 1), (-1, -1), SURFACE),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 5),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ]
    )
)
story.extend(
    [
        matrix,
        Spacer(1, 7 * mm),
        Paragraph(
            "Result vocabulary: <b>pass</b> matched the scoped expectation; <b>fail</b> contradicted it; "
            "<b>untested</b> was not executed; <b>out of scope</b> was explicitly excluded.",
            styles["TPBody"],
        ),
        PageBreak(),
    ]
)

# Page 4 — method and boundaries
story.extend(
    section_header(
        "Method and limits",
        "Evidence is useful because its boundary is explicit.",
        "TenantProof is a controlled professional review, not an arbitrary public scanner or a certification.",
    )
)
method_rows = [
    ("1", "Agree the contract", "Name actors, tenants, resources, operations, expected allow/deny behavior, and positive controls."),
    ("2", "Run controlled checks", "Use written authorization, staging or a dedicated project, synthetic identities, and stop conditions."),
    ("3", "Repair the root rule", "Prepare reviewable SQL or application changes without silently deploying to production."),
    ("4", "Rerun and hand off", "Repeat comparable checks, preserve uncertainty, redact evidence, revoke access, and record deletion."),
]
method_table = Table(
    [
        [
            Paragraph(f"<b>{number}</b>", styles["TPBody"]),
            Paragraph(f"<b>{esc(title)}</b>", styles["TPBody"]),
            Paragraph(esc(body), styles["TPBody"]),
        ]
        for number, title, body in method_rows
    ],
    colWidths=[12 * mm, 42 * mm, 118 * mm],
)
method_table.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
            ("BOX", (0, 0), (-1, -1), 0.6, LINE),
            ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
            ("TEXTCOLOR", (0, 0), (0, -1), VIOLET),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 7),
            ("RIGHTPADDING", (0, 0), (-1, -1), 7),
            ("TOPPADDING", (0, 0), (-1, -1), 7),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ]
    )
)
story.extend([method_table, Spacer(1, 9 * mm)])
limits = Table(
    [
        [
            [
                Paragraph("This report can support", styles["TPH2"]),
                Paragraph("A launch decision for the named boundary and recorded code state.", styles["TPBody"]),
                Paragraph("Review of before/after observations and remediation.", styles["TPBody"]),
                Paragraph("Regression planning for the same explicit contracts.", styles["TPBody"]),
            ],
            [
                Paragraph("This report cannot claim", styles["TPH2"]),
                Paragraph("That the whole application is secure or compliant.", styles["TPBody"]),
                Paragraph("That untested or out-of-scope paths are safe.", styles["TPBody"]),
                Paragraph("That future code, data, identities, or environments behave the same.", styles["TPBody"]),
            ],
        ]
    ],
    colWidths=[86 * mm, 86 * mm],
)
limits.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (0, 0), GREEN_SOFT),
            ("BACKGROUND", (1, 0), (1, 0), AMBER_SOFT),
            ("BOX", (0, 0), (-1, -1), 0.7, LINE),
            ("INNERGRID", (0, 0), (-1, -1), 0.7, LINE),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 9),
            ("RIGHTPADDING", (0, 0), (-1, -1), 9),
            ("TOPPADDING", (0, 0), (-1, -1), 9),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ]
    )
)
story.extend(
    [
        limits,
        Spacer(1, 10 * mm),
        KeepTogether(
            [
                Paragraph("Published starting scope", styles["TPH2"]),
                Paragraph(
                    "<b>Boundary Verification — $349</b> · up to 12 tables, three roles, evidence report, guidance, and one retest.",
                    styles["TPBody"],
                ),
                Paragraph(
                    "<b>Verification + Repair — $649</b> · up to 25 tables, three roles, selected functions, one storage bucket, "
                    "reviewable repair, regression checks, and one retest.",
                    styles["TPBody"],
                ),
                Paragraph(
                    "Qualification, signed scope, written authorization, and secure access exchange come before any real execution.",
                    styles["TPSubtitle"],
                ),
            ]
        ),
    ]
)

doc.build(story, onFirstPage=page_decor, onLaterPages=page_decor)
print(json.dumps({"output": str(OUT), "bytes": OUT.stat().st_size, "pages": 4}))