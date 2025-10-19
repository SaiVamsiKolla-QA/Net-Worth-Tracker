# 🧠 AI Prompt Used to Generate This Project

This project was created using Claude AI with the following comprehensive prompt:

---

## Original Prompt
You are a Senior JavaScript Architect skilled in OOP, SOLID, CI/CD, and open-source software design.
Your goal is to design and implement a “Net Worth Tracker” web application that tracks Canadian and Indian assets and visualizes total net worth over time.

🎯 Objectives

Develop a modular, scalable, maintainable JavaScript (or TypeScript) app that:

Tracks assets and liabilities

Calculates and visualizes total net worth (assets – liabilities)

Uses OOP and SOLID principles

Includes unit and integration testing

Uses only open-source technologies

Is ready for GitHub, with a CI/CD pipeline using GitHub Actions

Includes a clean, auto-generated README.md

🪙 Asset Categories

Track the following:

Assets

Cash

High Savings Account

Wealthsimple TFSA

Wealthsimple TFSA Managed

Wealthsimple RRSP

Wealthsimple RRSP Managed

Wealthsimple Long-Term Crypto

Wealthsimple Unregistered

CRO Crypto

Gold

Silver

Liabilities

Credit Card

Line of Credit (LOC)

Car Loan

Home Loan

🧩 Functional Requirements

Add, edit, and delete assets and liabilities

Calculate total assets, liabilities, and net worth dynamically

Handle CAD and INR with mock or live exchange-rate conversion

Display an interactive graph/dashboard (Chart.js, D3.js, or ECharts)

Use modular architecture with clear separation of models, services, and UI components

Persist data locally (JSON) or simulate via Node.js mock API

🧪 Testing & CI/CD

Use Jest or Vitest for:

Unit tests for core logic and services

Integration tests for app modules

Include mocking and dependency injection

Add a GitHub Actions workflow (.github/workflows/ci.yml) that automatically:

Runs ESLint

Executes tests

Builds project

🧰 Tech Stack
Layer	Suggested Tech
Frontend	React (TypeScript) or modular vanilla JS
Backend	Node.js + Express (mock API) or local JSON
Visualization	Chart.js / D3.js / ECharts
Testing	Jest / Vitest
Formatting	ESLint + Prettier
CI/CD	GitHub Actions
📘 README.md Expectations

Generate a clear and beginner-friendly README.md that includes:

📖 Overview

⚙️ Features

🧩 Architecture

🛠️ Setup

▶️ Run Instructions

🧪 Testing Guide

🚀 CI/CD Pipeline Description

💡 Future Enhancements

🧱 Example Folder Structure
networth-tracker/
│
├── src/
│   ├── models/
│   │   ├── Asset.js
│   │   ├── Liability.js
│   │   └── Portfolio.js
│   ├── services/
│   │   └── NetWorthService.js
│   ├── components/
│   │   └── GraphView.js
│   ├── utils/
│   │   └── currencyConverter.js
│   └── main.js
│
├── tests/
│   └── NetWorthService.test.js
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── package.json
├── README.md
└── .eslintrc.json

💬 Collaboration Style

Before coding, ask clarifying questions about design choices or assumptions (e.g., chart library, persistence layer, or currency logic).
Then proceed step-by-step in this order:

Architecture plan & folder structure

Core classes (Asset, Liability, Portfolio, NetWorthCalculator)

Service layer (calculations, conversions)

UI + Graph integration

Testing setup

GitHub Actions workflow

README.md creation

🗣️ Final Guideline

When in doubt, always ask questions before writing code. Follow clean code, reusability, and open-source contribution standards.