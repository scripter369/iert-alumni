// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import uuid from "uuid";
// import PdfKit from "pdfkit";

// export const getPdfUrl = functions.https.onCall(async (data, context) => {
//   const doc = new PdfKit();

//   let memberId = uuid.v4();
//   const file = admin.storage().bucket().file(`members/member-${memberId}.pdf`);

//   await new Promise<void>((resolve, reject) => {
//     const writeStream = file.createWriteStream({
//       resumable: false,
//       contentType: "application/pdf",
//     });
//     writeStream.on("finish", () => resolve());
//     writeStream.on("error", (e) => reject(e));

//     doc.pipe(writeStream);

//     doc
//       .fontSize(24)
//       .text("Members Data")
//       .fontSize(16)
//       .moveDown(2)
//       .text("This is your table!");

//     doc.end();
//   });

//   const url = await file.getSignedUrl({
//     version: "v4",
//     action: "read",
//     expires: Date.now() + 24 * 60 * 60 * 1000,
//   });

//   return { url };
// });
