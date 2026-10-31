/**
 * Google Calendar Service for scheduling 10-minute diagnostic calls
 */

export interface DiagnosticBookingRequest {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  track: string;
  fearTrigger: string;
  startIsoString: string; // ISO 8601
}

export interface BookingResponse {
  eventId: string;
  htmlLink: string;
  hangoutLink?: string;
  startTime: string;
}

/**
 * Creates a 10-minute "POLOMO • 1-on-1 Confidence Diagnostic" calendar event
 * with an automatic Google Meet video call link.
 */
export const scheduleDiagnosticSession = async (
  accessToken: string,
  booking: DiagnosticBookingRequest
): Promise<BookingResponse> => {
  const startDate = new Date(booking.startIsoString);
  const endDate = new Date(startDate.getTime() + 10 * 60 * 1000); // 10 minutes later

  const eventPayload = {
    summary: `POLOMO 1-on-1 Diagnostic: ${booking.candidateName} (${booking.track})`,
    description: `10-Minute Public Speaking & Confidence Diagnostic\n\nCandidate: ${booking.candidateName}\nTrack: ${booking.track}\nWhatsApp / Phone: ${booking.candidatePhone}\nStated Friction Trigger: ${booking.fearTrigger}\n\nGoals: Diagnose anxiety triggers, deliver one instant physiological tool, and introduce the POLOMO WhatsApp Circle or Founding Pod.`,
    start: {
      dateTime: startDate.toISOString(),
    },
    end: {
      dateTime: endDate.toISOString(),
    },
    attendees: [
      { email: booking.candidateEmail, displayName: booking.candidateName },
    ],
    conferenceData: {
      createRequest: {
        requestId: `polomo-diag-${Date.now()}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`Failed to create calendar event: ${err.error?.message || response.statusText}`);
  }

  const result = await response.json();
  return {
    eventId: result.id,
    htmlLink: result.htmlLink,
    hangoutLink: result.hangoutLink || result.conferenceData?.entryPoints?.[0]?.uri,
    startTime: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
};
