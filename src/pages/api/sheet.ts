import { TickerData } from '../../types/data'
import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  let sheets

  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly']
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
      target
    )

    sheets = google.sheets({ version: 'v4', auth: jwt })
  } catch (error) {
    res.status(500).json(error)
  }

  switch (method) {
    case 'GET':
      try {
        if (!sheets) {
          res.status(500).json({ error: 'Google Sheets API is undefined' })
          return
        }

        const response = await sheets.spreadsheets.values.batchGet({
          spreadsheetId: process.env.SPREADSHEET_ID,
          ranges: ['Dividendos!A2:D', 'FIIs!A2:D']
        })

        if (!response.data.valueRanges) {
          res.status(500).json({ error: 'ValueRanges are undefined' })
        } else {
          const rows1 = response.data.valueRanges[0].values as [string, string, string, string][]
          const rows2 = response.data.valueRanges[1].values as [string, string, string, string][]

          const result1: TickerData[] = []
          const result2: TickerData[] = []

          rows1.forEach((row, index) => {
            result1.push({
              name: row[0],
              alocation: parseFloat(row[1].slice(0, -1)),
              price: parseFloat(row[2]),
              priceCap: parseFloat(row[3].substring(2)),
              rank: index + 1
            } as TickerData)
          })

          rows2.forEach((row, index) => {
            result2.push({
              name: row[0],
              alocation: parseFloat(row[1].slice(0, -1)),
              price: parseFloat(row[2]),
              priceCap: parseFloat(row[3].substring(2)),
              rank: index + 1
            } as TickerData)
          })

          const result = [result1, result2]

          res.status(200).json(result)
        }
      } catch (error) {
        res.status(500).json(error)
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
