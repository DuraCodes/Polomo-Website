/**
 * Google Sheets Service for POLOMO Applicant & Cohort Management
 */

export interface ApplicantData {
  name: string;
  email: string;
  whatsapp: string;
  track: 'Student & Graduate' | 'Professional & Seeker' | 'Founder & Creator';
  fearTrigger: string;
  sessionTime?: string;
  status: 'Diagnostic Booked' | 'Waitlisted' | 'Approved' | 'Pod Assigned';
}

export interface CohortSettings {
  cohortStatus: 'OPEN' | 'WAITLIST' | 'DIAGNOSTIC';
  cohortName: string;
  startDate: string;
  studentCapacity: number;
  professionalCapacity: number;
  founderCapacity: number;
  podSize: number;
}

const STORAGE_KEY_SHEET_ID = 'polomo_google_sheet_id';

export const getStoredSheetId = (): string | null => {
  return localStorage.getItem(STORAGE_KEY_SHEET_ID);
};

export const setStoredSheetId = (id: string) => {
  localStorage.setItem(STORAGE_KEY_SHEET_ID, id);
};

/**
 * Initializes or verifies the POLOMO Google Sheet.
 * If no sheet ID is provided, creates a new one with two tabs:
 * 1) "Applicants"
 * 2) "Cohort Settings"
 */
export const initOrCreateSheet = async (accessToken: string, existingSheetId?: string): Promise<string> => {
  if (existingSheetId) {
    setStoredSheetId(existingSheetId);
    return existingSheetId;
  }

  const stored = getStoredSheetId();
  if (stored) return stored;

  // Create new spreadsheet
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'POLOMO • Cohort Admissions & Pod Switchboard',
      },
      sheets: [
        {
          properties: {
            title: 'Applicants',
            gridProperties: { rowCount: 1000, columnCount: 10 },
          },
        },
        {
          properties: {
            title: 'Cohort Settings',
            gridProperties: { rowCount: 20, columnCount: 6 },
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`Failed to create Google Sheet: ${err.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;
  setStoredSheetId(spreadsheetId);

  // Initialize Headers
  await setupSheetHeaders(accessToken, spreadsheetId);
  return spreadsheetId;
};

/**
 * Sets initial headers and defaults in the new Google Sheet
 */
const setupSheetHeaders = async (accessToken: string, spreadsheetId: string) => {
  // Setup Applicants Headers
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Applicants!A1:G1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          [
            'Timestamp',
            'Full Name',
            'Email',
            'WhatsApp / Phone',
            'Track',
            'Speech Anxiety Trigger',
            'Status',
          ],
        ],
      }),
    }
  );

  // Setup Cohort Settings Headers & Initial Values
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Cohort Settings'!A1:B6?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          ['Setting Key', 'Setting Value'],
          ['Cohort Status', 'DIAGNOSTIC'],
          ['Current Cohort Title', 'Founding Cohort (Pod Alpha)'],
          ['Student Track Capacity', '24'],
          ['Professional Track Capacity', '36'],
          ['Founder Track Capacity', '12'],
        ],
      }),
    }
  );
};

/**
 * Appends a new applicant to the Google Sheet
 */
export const appendApplicantToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  applicant: ApplicantData
): Promise<boolean> => {
  const timestamp = new Date().toLocaleString();
  const values = [
    [
      timestamp,
      applicant.name,
      applicant.email,
      applicant.whatsapp,
      applicant.track,
      applicant.fearTrigger,
      applicant.status,
    ],
  ];

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Applicants!A1:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
    }
  );

  return response.ok;
};
