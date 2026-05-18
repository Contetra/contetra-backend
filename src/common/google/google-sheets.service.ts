import { Injectable } from '@nestjs/common';

import { google } from 'googleapis';

import * as path from 'path';
import { sheets_v4 } from 'googleapis';

@Injectable()
export class GoogleSheetsService {
  private sheets: sheets_v4.Sheets;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(
        process.cwd(),
        'src/common/google/google-service-account.json',
      ),

      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({
      version: 'v4',
      auth,
    });
  }

  async appendRow(values: string[]) {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID missing');
    }

    await this.sheets.spreadsheets.values.append({
      spreadsheetId,

      range: 'Sheet1!A:Z',

      valueInputOption: 'USER_ENTERED',

      requestBody: {
        values: [values],
      },
    });
  }
}
