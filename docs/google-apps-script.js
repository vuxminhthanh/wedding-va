/**
 * Google Apps Script mẫu cho RSVP.
 *
 * Cách dùng:
 * 1. Tạo Google Sheet mới và mở Extensions > Apps Script.
 * 2. Dán toàn bộ file này vào Apps Script.
 * 3. Chạy hàm setupSheetHeaders một lần để tạo header.
 * 4. Deploy > New deployment > Web app.
 * 5. Execute as: Me. Who has access: Anyone with the link.
 * 6. Copy Web App URL và đặt vào biến môi trường GOOGLE_SCRIPT_URL.
 */

function setupSheetHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.clear();
  sheet.appendRow([
    "Timestamp",
    "Name",
    "Phone",
    "Attending",
    "Guests",
    "Event",
    "Message"
  ]);
}

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var formattedDate = Utilities.formatDate(
      new Date(),
      "Asia/Ho_Chi_Minh",
      "dd/MM/yyyy"
    );

    sheet.appendRow([
      formattedDate,
      data.name || "",
      data.phone || "",
      data.attending || "",
      data.guests || 1,
      data.event || "",
      data.message || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: false,
        message: error && error.message ? error.message : "Unknown error"
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
