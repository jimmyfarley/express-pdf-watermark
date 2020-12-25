
const express = require('express')
const PDFDocument = require('pdfkit')
const cors = require('cors')

const app = express()
var port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('OK')
})

app.post('/pdf', (req, res) => {
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment;filename=Preview.pdf')

    // Create a document
    const doc = new PDFDocument

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(res)

    const keys = Object.keys(req.body)
    keys.forEach((key, index) => {
        // Embed a font, set the font size, and render some text
        doc.fontSize(24)
            .text(`${key} : ${req.body[key]}`, 50, 100 + 30 * index)
    })

    if (req.body.watermark) {
        // Watermark here
        doc
            .fontSize(36)
            .fillColor('#e9ecef')
            .fillOpacity(0.5)
            .text('Produced by Jimmy Farley', 50, 130)
    }

    // Finalize PDF file
    doc.end()
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})