import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    BorderStyle,
    AlignmentType,
    HeadingLevel,
    ImageRun,
} from "docx";
import { resumeData } from "@/data/resume";

export const generateDocx = async (profileImageBuffer?: ArrayBuffer) => {
    // Define colors
    const SIDEBAR_BG = "0f172a"; // slate-900
    const TEXT_WHITE = "ffffff";
    const TEXT_SLATE_300 = "cbd5e1";
    const TEXT_SLATE_500 = "64748b";
    const TEXT_SLATE_900 = "0f172a";
    const ACCENT_BLUE = "2563eb"; // blue-600

    // Helper for contact items
    const createContactItem = (label: string, value: string, link?: string) => {
        return [
            new Paragraph({
                children: [
                    new TextRun({
                        text: label.toUpperCase(),
                        color: TEXT_SLATE_500,
                        bold: true,
                        size: 16, // 8pt
                    }),
                ],
                spacing: { before: 200 },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: value,
                        color: TEXT_WHITE,
                        size: 20, // 10pt
                    }),
                ],
            }),
        ];
    };

    // Sidebar Content
    const sidebarCell = new TableCell({
        width: {
            size: 32,
            type: WidthType.PERCENTAGE,
        },
        shading: {
            fill: SIDEBAR_BG,
        },
        margins: {
            top: 400,
            bottom: 400,
            left: 200,
            right: 200,
        },
        children: [
            // Profile Image
            ...(profileImageBuffer
                ? [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new ImageRun({
                                data: profileImageBuffer,
                                transformation: {
                                    width: 120,
                                    height: 120,
                                },
                                type: "jpg", // Assuming jpg/png
                            }),
                        ],
                        spacing: { after: 400 },
                    }),
                ]
                : []),

            // CONTACT Header
            new Paragraph({
                children: [
                    new TextRun({
                        text: "CONTACT",
                        color: TEXT_WHITE,
                        bold: true,
                        size: 24,
                    })
                ],
                border: {
                    bottom: { style: BorderStyle.SINGLE, size: 2, color: "334155" }
                },
                spacing: { after: 200 },
            }),

            ...createContactItem("Email", resumeData.personalInfo.email),
            ...createContactItem("Phone", resumeData.personalInfo.mobile),
            ...createContactItem("Location", resumeData.personalInfo.address),
            ...createContactItem("Portfolio", resumeData.personalInfo.portfolio),

            // SKILLS Header
            new Paragraph({
                children: [
                    new TextRun({
                        text: "SKILLS",
                        color: TEXT_WHITE,
                        bold: true,
                        size: 24,
                    })
                ],
                border: {
                    bottom: { style: BorderStyle.SINGLE, size: 2, color: "334155" }
                },
                spacing: { before: 600, after: 200 },
            }),

            // Skills List
            ...Object.entries(resumeData.skills).flatMap(([cat, skills]) => [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: cat.charAt(0).toUpperCase() + cat.slice(1),
                            color: ACCENT_BLUE,
                            bold: true,
                            size: 18,
                        })
                    ],
                    spacing: { before: 200 },
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: skills.join(", "),
                            color: TEXT_SLATE_300,
                            size: 18,
                        })
                    ]
                })
            ]),

            // REFERENCES Header
            new Paragraph({
                children: [
                    new TextRun({
                        text: "REFERENCES",
                        color: TEXT_WHITE,
                        bold: true,
                        size: 24,
                    })
                ],
                border: {
                    bottom: { style: BorderStyle.SINGLE, size: 2, color: "334155" }
                },
                spacing: { before: 600, after: 200 },
            }),

            ...resumeData.references.flatMap(ref => [
                new Paragraph({
                    children: [new TextRun({ text: ref.name, color: TEXT_WHITE, bold: true, size: 20 })],
                    spacing: { before: 200 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: ref.company, color: TEXT_SLATE_300, size: 18 })],
                }),
                new Paragraph({
                    children: [new TextRun({ text: ref.contact, color: TEXT_SLATE_300, size: 16 })],
                }),
                new Paragraph({
                    children: [new TextRun({ text: ref.email, color: TEXT_SLATE_300, size: 16 })],
                })
            ])
        ],
    });

    // Main Content
    // Main Content
    const mainCell = new TableCell({
        width: {
            size: 68,
            type: WidthType.PERCENTAGE,
        },
        margins: {
            top: 400,
            bottom: 400,
            left: 400,
            right: 200,
        },
        children: [
            // Name
            new Paragraph({
                children: [
                    new TextRun({
                        text: resumeData.personalInfo.name.toUpperCase(),
                        bold: true,
                        size: 48, // 24pt
                        color: TEXT_SLATE_900,
                        font: "Arial Black"
                    })
                ]
            }),
            // Title
            new Paragraph({
                children: [
                    new TextRun({
                        text: resumeData.personalInfo.title.toUpperCase(),
                        bold: true,
                        size: 24, // 12pt
                        color: ACCENT_BLUE,
                    })
                ],
                spacing: { after: 200 },
                border: {
                    bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT_BLUE, space: 10 }
                }
            }),

            // Summary Header
            new Paragraph({
                children: [new TextRun({ text: "PROFESSIONAL SUMMARY", bold: true, size: 22, color: TEXT_SLATE_900 })],
                spacing: { before: 400, after: 100 },
                border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: ACCENT_BLUE, space: 5 } }
            }),
            // Summary Body
            new Paragraph({
                children: [new TextRun({ text: resumeData.summary, size: 20, color: TEXT_SLATE_500 })],
                alignment: AlignmentType.JUSTIFIED,
                spacing: { after: 200 }
            }),

            // Experience Header
            new Paragraph({
                children: [new TextRun({ text: "PROFESSIONAL EXPERIENCE", bold: true, size: 22, color: TEXT_SLATE_900 })],
                spacing: { before: 400, after: 300 },
                border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: ACCENT_BLUE, space: 5 } }
            }),

            // Experience List
            ...resumeData.experience.flatMap(exp => [
                new Paragraph({
                    children: [
                        new TextRun({ text: exp.role, bold: true, size: 24, color: TEXT_SLATE_900 }),
                    ],
                    spacing: { before: 200 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: exp.company, color: TEXT_SLATE_500, bold: true, size: 18 }),
                        new TextRun({ text: "  |  ", color: ACCENT_BLUE }),
                        new TextRun({ text: exp.period, color: ACCENT_BLUE, size: 18 }),
                    ],
                    spacing: { after: 100 }
                }),
                ...(exp.description ? [new Paragraph({
                    children: [new TextRun({ text: exp.description, size: 19, color: TEXT_SLATE_500 })],
                    spacing: { after: 100 },
                    alignment: AlignmentType.JUSTIFIED,
                })] : []),
                ...(exp.achievements ? exp.achievements.map(ach =>
                    new Paragraph({
                        text: "• " + ach,
                        bullet: { level: 0 },
                        spacing: { after: 50 }
                    })
                ) : []),
                ...(exp.projects ? [
                    new Paragraph({ children: [], spacing: { before: 100 } }),
                    ...exp.projects.flatMap(proj => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: proj.name, bold: true, size: 18 }),
                                new TextRun({ text: " – " + proj.desc, size: 18, color: TEXT_SLATE_500 })
                            ],
                            indent: { left: 200 },
                            spacing: { after: 50 }
                        })
                    ])] : []),
                ...(exp.stack ? [new Paragraph({
                    children: [
                        new TextRun({ text: "Stack: ", bold: true, size: 16, color: TEXT_SLATE_500 }),
                        new TextRun({ text: exp.stack, italics: true, size: 16, color: TEXT_SLATE_500 })
                    ],
                    indent: { left: 200 },
                    spacing: { before: 50, after: 200 }
                })] : [])
            ])

        ],
    });

    const table = new Table({
        rows: [
            new TableRow({
                children: [sidebarCell, mainCell],
            }),
        ],
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
        borders: {
            top: { style: BorderStyle.NONE, size: 0 },
            bottom: { style: BorderStyle.NONE, size: 0 },
            left: { style: BorderStyle.NONE, size: 0 },
            right: { style: BorderStyle.NONE, size: 0 },
            insideVertical: { style: BorderStyle.NONE, size: 0 },
            insideHorizontal: { style: BorderStyle.NONE, size: 0 },
        }
    });

    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                        }
                    }
                },
                children: [table],
            },
        ],
    });

    return await Packer.toBlob(doc);
};
