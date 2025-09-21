#!/usr/bin/env node
import 'dotenv/config'
import fs from 'fs'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { GoogleGenerativeAI } from '@google/generative-ai'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const key = process.env.GOOGLE_API_KEY || ''
const genAI = new GoogleGenerativeAI(key)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

async function askGemini(task, input='') {
  const prompt = `You are a helpful assistant. Task: ${task}. Input: ${input}`
  const res = await model.generateContent(prompt)
  return (await res.response).text()
}

function parseArgs() {
  const a = process.argv.slice(2)
  const opts = { server: false }
  for (let i=0; i<a.length; i++) {
    if (a[i] === '--server') opts.server = true
    else if (a[i] === '--task') opts.task = a[++i]
    else if (a[i] === '--text') opts.text = a[++i]
    else if (a[i] === '--file') opts.file = a[++i]
  }
  return opts
}

async function runCli(opts) {
  if (!opts.task) {
    console.log('Usage: node index.mjs --task "what to do" [--text "input"] [--file path]')
    process.exit(1)
  }
  let input = opts.text || ''
  if (opts.file) input = fs.readFileSync(opts.file, 'utf8')
  const out = await askGemini(opts.task, input.slice(0, 5000))
  console.log('\n=== Output ===\n' + out)
}

async function runServer() {
  const app = express()
  app.use(express.json({ limit: '1mb' }))
  app.post('/api/ai', async (req, res) => {
    try {
      const { task, input } = req.body || {}
      if (!task) return res.status(400).json({ error: 'Missing task' })
      const out = await askGemini(task, input || '')
      res.json({ output: out })
    } catch (e) {
      res.status(500).json({ error: 'AI error', detail: String(e) })
    }
  })
  app.use('/', express.static(path.join(__dirname, 'public')))
  const PORT = 5173
  app.listen(PORT, () => console.log('Open http://localhost:' + PORT))
}

const opts = parseArgs()
if (opts.server) runServer()
else runCli(opts)
