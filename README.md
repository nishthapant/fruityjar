# Fruity Jar

Hello! Welcome to FruityJar, a React + TypeScript application built as a take-home exercise to showcase key skills in frontend development, data fetching, and UI/UX design.

## Project Overview

This app displays a list of fruits fetched from an external API and allows users to group, view, and add fruits to a virtual jar. The jar tracks quantities and total calories and visualizes fruit calorie contributions via a pie chart.

## Features

Data Fetching

- Fetches fruit data from https://fruity-proxy.vercel.app/ with the API key "takehome".

Layout

- Left Section: Displays fruits either as a flat list or grouped by Family, Order, or Genus.
- Right Section: Shows the Jar containing selected fruits, their quantities, total calories, and a pie chart visualization.

Group By

- User-selectable grouping: None (flat list), Family, Order, or Genus.
- Groups display as collapsible headers with “Add all” functionality.

Views

- List view: Shows fruits as {name} ({calories}).
- Table view: Shows fruits with columns: name, family, order, genus, calories.
- Add buttons allow adding fruits individually or by group, supporting multiple quantities.

Jar Functionality

- Displays selected fruits and their quantities.
- Calculates total calories dynamically.
- Pie chart visualization of calorie breakdown.

## Tech Stack

- React with TypeScript
- Vite as the build tool and development server
- Chakra UI for styling and layout
- React Chart.js 2 for pie charts
- Vercel for deployment

## Usage

1. Clone the repo:

```
git clone https://github.com/nishtha-pant/fruityjar.git
cd fruityjar
npm install
npm run dev

```

2. Open your browser at `http://localhost:5173`.
3. Use the controls to group fruits, toggle views, and add fruits to your jar.

## Error Handling

- Loading spinner while fetching fruits.
- User-friendly error messages if the API call fails.
