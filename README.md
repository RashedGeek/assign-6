FitLog — Workout Library

This is my submission for the FitLog assignment. It's a dark-themed workout library built with Next.js — you browse a set of workouts, add the ones you want to do today to "Today's Plan" (capped at 5), save others for later, and track everything from a dedicated My Plan page.

I built this to actually get comfortable with the App Router and with sharing state across pages properly, instead of just wiring up isolated components. That ended up being the trickiest part of the whole project (more on that below).

Tech Stack
Next.js 16 (App Router) for routing and pages
React for the UI and interactivity
TypeScript so I'd catch dumb mistakes before runtime
Tailwind CSS + daisyUI for styling — daisyUI's button/badge/tab components saved me a ton of time
React Context to hold the plan/saved workout state so the navbar, home page, and My Plan page all stay in sync
localStorage so your plan doesn't disappear if you refresh the page
Features
Workout library on the home page, pulled live from the FitLog API and rendered as a responsive grid
Sort dropdown on the library (Duration / Calories / Rating)
Each workout has its own detail page with instructions, stats, and equipment
"Add to today's plan" and "Save for later" buttons that actually update everywhere at once — navbar badges included
A 5-lift cap on today's plan, with the button disabling itself once you hit it
My Plan page with Today's Plan / Saved tabs, a live Exercises/Minutes/Calories summary, and Mark as Done / Remove per workout
Toast notifications for every add/remove/save/done action
Custom 404 page for bad routes
Fully responsive — navbar, hero, grid, and My Plan layout all adapt down to mobile