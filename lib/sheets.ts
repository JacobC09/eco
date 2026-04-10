"use server";

import { google } from "googleapis";

export interface SheetEntry {
    id: string;
    name: string;
    city: string;
    message: string;
    date: string;
}

async function getSheets() {
    const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(process.env.GOOGLE_SERVICE_KEY!),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return google.sheets({ version: "v4", auth });
}

export async function fetchEntries(): Promise<SheetEntry[]> {
    const sheets = await getSheets();

    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet1!A2:D100",
        });

        const rows = res.data.values || [];
        
        return rows
            .filter(row => row.length >= 4)
            .map((row: string[], index: number) => ({
                id: `gs-${index}`,
                name: row[0],
                city: row[1],
                message: row[2],
                date: row[3]
            }));

    } catch (e) {
        console.error("Error fetching from Google Sheets:", e);
    }

    return [];
}

export async function addEntry(entry: { name: string; city: string; message: string }): Promise<boolean> {
    const sheets = await getSheets();

    try {
        const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
        
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet1!A:D",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[entry.name, entry.city, entry.message, date]],
            },
        });

        return true;
    } catch (e) {
        console.error("Error appending to Google Sheets:", e);
        return false;
    }
}
